import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import moment from 'moment';

import { Card, Col, Row, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

function ListPurchase() {
  
  const GET_ALL_PURCHASE = gql`query GetAllPurchaseOrder {
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
  }`;

  const { data, refetch } = useQuery(GET_ALL_PURCHASE);

  console.log(data);


  useEffect(() => {
    refetch();
  }, [refetch]);


  return (<>
    <Row>
      <Col className="mx-auto my-5">
        <Card>
          <Card.Body>
            <h2>Table of c List</h2>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Vendor</th>
                  <th>Total</th>
                  <th>Products</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data && data?.getAllPurchaseOrder?.map((item, index) => (
                  <tr key={item.id}>
                    <td> {index + 1} </td>
                  <Link to={`/admin/purchase/detail_purchase/${item.id}`}> <td className='pt-3'> {item?.vandor?.vandorName} </td> </Link>
                    <td className="border"> {item?.totalPrice} </td>


                    <td>
                      {item?.products.map((product) => (
                        <div key={product?.id}>
                          Product ID:
                          <ul>
                            <li>Product : {product.productId?.productName}</li>
                            <li>quantity : {product.quantity}</li>
                            <li>Purchase Price : {product.puchasePrice}</li>
                            <li>size : {product.size}</li>
                            <li>gender : {product.gender}</li>
                            <li>color : {product.color}</li>

                          </ul>
                        </div>
                      ))}
                    </td>


                    <td> {moment(parseInt(item.date)).format('DD-MM-YYYY')} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>);
}

export default ListPurchase;
