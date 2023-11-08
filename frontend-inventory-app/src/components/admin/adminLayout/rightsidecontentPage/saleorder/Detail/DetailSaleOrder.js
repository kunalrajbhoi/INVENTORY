import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DetailSaleOrder() {
  const { saleOrderDetail } = useParams();

  const GET_SALEORDER_DETAIL = gql`query GetsaleOrder($getsaleOrderId: ID) {
    getsaleOrder(id: $getsaleOrderId) {
      id
      products {
        id
        discount
        productId {
          id
          productName
          purchasePrice
        }
        color
        size
        gender
        qty
        salePrice
      }
      customerName
      customerNo
      totalPrice
      paymentMethod
      date
    }
  }`;

  const { data, refetch } = useQuery(GET_SALEORDER_DETAIL, {
    variables: {
        getsaleOrderId: saleOrderDetail,
    },
  });

  // Function to calculate profit for a product
  const calculateProfit = (pro, totalPrice) => {
  const purchasePrice = pro.productId?.purchasePrice;
  const salePrice = pro.salePrice;
  const quantity = pro.qty;

  // Calculate profit using the formula
  const netproo =  purchasePrice * quantity;

  console.log("profit",netproo);

  const profit = totalPrice - netproo;

  console.log("profit",profit);

  return profit;
}

  const saleorder = data?.getsaleOrder;


  return (
    <div>
      <Row>

        <Col md={6}>
          <Card>
            <Card.Body>
              <h3>Sale Order Detail :</h3>
              {saleorder && (
                <Table bordered hover responsive className="mt-2">
                  <tbody>
                    <tr>
                      <th>Customer Name</th>
                      <td>{saleorder.customerName}</td>
                    </tr>
                    <tr>
                      <th>Customer Number</th>
                      <td>{saleorder.customerNo}</td>
                    </tr>
                    <tr>
                      <th>Total Price</th>
                      <td>{saleorder.totalPrice}</td>
                    </tr>
                    <tr>
                      <th>Payment Method</th>
                      <td>{saleorder.paymentMethod}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{moment(parseInt(saleorder.date)).format('DD-MM-YYYY')}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        
        <Col md={12} className="mt-3">
                    <Card>
                        <Card.Body>

                            <h3>Products :</h3>

                            <Table bordered hover responsive className="mt-2">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Product</th>
                                        <th>purchase Price</th>
                                        <th>Qty</th>
                                        <th>salePrice</th>
                                        <th>discount</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {saleorder?.products?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.productId?.productName}</td>
                                            <td>{item.productId?.purchasePrice}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.salePrice}</td>
                                            <td>{item.discount}</td>
                                            <td>{calculateProfit(item, saleorder?.totalPrice)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
      </Row>
    </div>
  );
}

export default DetailSaleOrder;
