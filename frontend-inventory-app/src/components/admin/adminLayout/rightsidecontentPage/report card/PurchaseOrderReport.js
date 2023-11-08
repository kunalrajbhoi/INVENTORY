import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Table } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { Link } from "react-router-dom";

function PurchaseOrderReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredOrders, setFilteredOrders] = useState([]);

  const GET_ALL_PURCHASE = gql`
    query GetAllPurchaseOrder {
      getAllPurchaseOrder {
        id
        products {
          id
          productId {
            id
            productName
            storeAllocation {
              id
              qty {
                quantity
                gender
                color
                size
              }
              storeId
            }
            color
            description
            discount
            gender
            images {
              color
              gender
              imagePath
            }
            priveiwName
            purchasePrice
            sellingPrice
            size
            stock {
              size
              color
              gender
              quantity
            }
          }
          quantity
          color
          size
          gender
          puchasePrice
        }
        vandor {
          id
          vandorName
        }
        totalPrice
        date
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_PURCHASE);

  function calculateTotalPrice() {
    let totalpriceee = 0;

    filteredOrders.forEach((order) => {
      totalpriceee += order.totalPrice;
    });
    return totalpriceee;
  }

  function handleReportSubmit(e) {
    e.preventDefault();

    const newarray = data?.getAllPurchaseOrder.filter((obj) => {
      const newintdate = parseInt(obj.date);
      const newmatter = moment(newintdate).format("YYYY-MM-DD");

      const isBetween =
        moment(newmatter).isSameOrAfter(startDate) &&
        moment(newmatter).isSameOrBefore(endDate);

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

        <Col sm={12}>
          {filteredOrders.length > 0 ? (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Vendor</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders?.map((order, index) => (
                  <tr key={order.id}>
                    <td> {index + 1} </td>
                    <Link to={`/admin/purchase/detail_purchase/${order.id}`}> <td className="pt-3"> {order.vandor?.vandorName} </td> </Link>
                    <td>
                      {order.products?.map((prod) => (
                        <div key={prod?.id}>{prod.productId?.productName}</div>
                      ))}
                    </td>

                    <td>{moment(parseInt(order.date)).format("DD-MM-YYYY")}</td>
                    <td> {order.totalPrice} </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
              <tr>
                  <td colSpan="4"><b>Total Price:</b></td>
                  <td><b>{calculateTotalPrice()}</b></td>
                </tr>
              </tfoot>
            </Table>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default PurchaseOrderReport;
