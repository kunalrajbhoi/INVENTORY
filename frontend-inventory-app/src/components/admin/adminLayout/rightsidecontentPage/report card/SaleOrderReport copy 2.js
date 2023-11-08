import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";

function SaleOrderReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formatt, setFormatt] = useState("");

  const GET_ALL_SALE_ORDER = gql`
    query GetAllSaleOrder {
      getAllSaleOrder {
        id
        products {
          id
          discount
          productId {
            id
          }
          qty
          salePrice
        }
        customerName
        customerNo
        totalPrice
        paymentMethod
        date
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_SALE_ORDER);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log("data", data);
  const intdate = parseInt(data?.getAllSaleOrder[0].date);
  const matter = moment(intdate).format("YYYY-MM-DD");
  console.log("date", matter);

  const isbefore = moment(matter).isBefore("2023-10-31"); // true
  console.log("isbefore", isbefore);
  const isafter = moment(matter).isAfter("2023-11-01");
  console.log("isafter", isafter);

  const newarray = data?.getAllSaleOrder.filter((obj) => {
    const newintdate = parseInt(obj.date);
    const newmatter = moment(newintdate).format("YYYY-MM-DD");
    const isBetween = moment(newmatter).isSameOrBefore(endDate) && moment(newmatter).isSameOrAfter(startDate);
  
    return isBetween;
  });

  console.log("newarray",newarray);
  function handleReportSubmit(e) {
    e.preventDefault();

    // const filterDate = data?.getAllSaleOrder?.filter(
    //   (check) => check.date >= checkStart && checkEnd <= check.date
    // );

    const matter = moment(data?.getAllSaleOrder?.date).format("YYYY-MM-DD");
    console.log("matter", matter);

    setFormatt(matter);
    console.log("formatt", formatt);

    // const checkdatefilter = () =>  formatt.isSameOrAfter(startDate) && formatt.isSameOrBefore(endDate);

    // console.log(checkdatefilter);
  }

  return (
    <div>
      <h3>Select Date Range:</h3>
      <Row>
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleReportSubmit}>
                <Form.Group>
                  <Form.Label>from</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>to</Form.Label>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" className="mt-5">
                  Report
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.getAllSaleOrder
                  ?.filter(
                    (order) =>
                      order.date >= startDate &&
                      endDate <= order.date &&
                      formatt
                  )
                  .map((check) => (
                    <tr key={check.id}>
                      <td>{check.id}</td>
                      <td>{check.customerName}</td>
                      <td>{check.date}</td>
                      <td>{check.totalPrice}</td>
                    </tr>
                  ))}
            </tbody>

            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default SaleOrderReport;
