import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Table } from "react-bootstrap";
import moment from "moment";


function DetailPurchase() {

    const { purchaseDetail } = useParams();

    const GET_PURCHASE_ORDER_DETAIL = gql`query GetpurchaseOrder($getpurchaseOrderId: ID) {
        getpurchaseOrder(id: $getpurchaseOrderId) {
          id
          products {
            id
            productId {
              id
              productName
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
            companyName
            balance
          }
          totalPrice
          date
        }
      }`;

      const { data, refetch } = useQuery(GET_PURCHASE_ORDER_DETAIL, {
        variables: {
            getpurchaseOrderId: purchaseDetail,
        },
      });

      const purchaseOrder = data?.getpurchaseOrder


  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3>purchaseOrder Order Detail :</h3>
              {purchaseOrder && (
                <Table bordered hover responsive className="mt-2">
                  <tbody>
                    <tr>
                      <th>Vendor Name</th>
                      <td>{purchaseOrder?.vandor?.vandorName}</td>
                    </tr>
                    <tr>
                      <th>Total Price</th>
                      <td>{purchaseOrder.totalPrice}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{moment(parseInt(purchaseOrder.date)).format('DD-MM-YYYY')}</td>
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
                                        <th>quantity</th>
                                        <th>Purchase Price</th>
                                        <th>size</th>
                                        <th>gender</th>
                                        <th>color</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseOrder?.products?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.productId?.productName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.puchasePrice}</td>
                                            <td>{item.size}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.color}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </Card.Body>
                    </Card>
                </Col>
      </Row>
    </div>
  )
}

export default DetailPurchase;
