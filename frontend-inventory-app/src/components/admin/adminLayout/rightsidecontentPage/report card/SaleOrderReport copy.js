import { gql, useQuery } from "@apollo/client";
import moment from "moment/moment";
import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";

function SaleOrderReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [confirmDate, setConfirmDate] = useState([]);

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

  function handleReportSubmit(e) {
    e.preventDefault();

    const checkStart = moment(startDate);
    const checkEnd = moment(startDate);

    const filterDate = data?.getAllSaleOrder?.filter(
      (check) => check.date >= checkStart && check.date <= checkEnd
    );

    if (filterDate) {
      console.log("filterDate", filterDate);

      setConfirmDate(filterDate);
    }
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
              {confirmDate &&
                confirmDate?.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{moment(order.date).format("YYYY-MM-DD")}</td>
                    <td>{order.totalPrice}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>

        
      </Row>
    </div>
  );
}

export default SaleOrderReport;
