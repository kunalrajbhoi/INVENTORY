import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function SaleOrderReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredOrders, setFilteredOrders] = useState([]);

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

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalpriceee = 0;

    filteredOrders.forEach((order) => {
      totalpriceee += order.totalPrice;
    });

    return totalpriceee;
  };

  function handleReportSubmit(e) {
    e.preventDefault();

    // Create an array for fetching date

    const newarray = data?.getAllSaleOrder.filter((obj) => {
      const newintdate = parseInt(obj.date);
      const newmatter = moment(newintdate).format("YYYY-MM-DD");

      const isBetween =
        moment(newmatter).isSameOrBefore(endDate) &&
        moment(newmatter).isSameOrAfter(startDate);

      return isBetween;
    });

    console.log("newarray", newarray);
    setFilteredOrders(newarray);
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

          {filteredOrders.length > 0 ? (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>sr no</th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders?.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <Link to={`/admin/saleorder/detail_saleorder/${order.id}`}> <td className="pt-3">{order.customerName}</td> </Link>
                    <td>{moment(parseInt(order.date)).format("DD-MM-YYYY")}</td>
                    <td>{order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>

              <tbody>
                <tr>
                  <td colSpan="4"><b>Total Price:</b></td>
                  <td><b>{calculateTotalPrice()}</b></td>
                </tr>
              </tbody>
            </Table>
          ) : null}

        </Col>
      </Row>
    </div>
  );
}

export default SaleOrderReport;
