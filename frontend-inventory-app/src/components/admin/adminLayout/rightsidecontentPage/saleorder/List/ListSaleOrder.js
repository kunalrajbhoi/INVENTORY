import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useEffect } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';


function ListSaleOrder() {

  const GET_ALL_SALE_ORDER = gql`query GetAllSaleOrder {
    getAllSaleOrder {
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

  const { data, refetch } = useQuery(GET_ALL_SALE_ORDER);

  useEffect(() => {
    refetch();
  }, [refetch]);



  return (
    <div>
      <Row>
        <Col className="mx-auto my-5">           
              <h2>List of Sale Order</h2>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>SR NO</th>
                    <th>Customer Name</th>
                    <th>Customer Number</th>
                    <th>Total Price</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Products</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {data && data?.getAllSaleOrder.map((item, index) => (
                    <tr key={item.id}>

                      <td> {index + 1} </td>
                      <Link to={`/admin/saleorder/detail_saleorder/${item?.id}`}> <td className="pt-3"> {item.customerName} </td> </Link>
                      <td> {item.customerNo} </td>
                      <td> {item.totalPrice} </td>
                      <td> {item.paymentMethod} </td>

                      <td> {moment(parseInt(item.date, 10)).format('LL')} </td>

                      <td>
                        {item.products.map((product) => (
                          <div key={product.id}>
                            <ul>
                              <li> <b>Product : </b> {product?.productId?.productName} </li>
                              <li><b>purchasePrice : </b> {product?.productId?.purchasePrice} </li>
                              <li><b>Qty : </b> {product?.qty} </li>
                              <li><b>salePrice : </b> {product?.salePrice} </li>
                              <li><b>discount : </b>{product?.discount} </li>
                            </ul>
                          </div>
                        ))}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>
            
         
        </Col>
      </Row>
    </div>
  )
}

export default ListSaleOrder;
