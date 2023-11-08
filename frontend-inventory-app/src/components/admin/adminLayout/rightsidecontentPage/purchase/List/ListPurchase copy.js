// import { gql, useQuery } from '@apollo/client';
// import React, { useEffect } from 'react';
// import moment from 'moment';

// import { Card, Col, Row } from "react-bootstrap";

// function ListPurchase() {
//   const GET_ALL_PURCHASE = gql`
//   query GetAllPurchaseOrder {
//     getAllPurchaseOrder {
//       id
//       products {
//         id
//         qty
//         puchasePrice
//         productId {
//           id
//         }
//       }
//       vandor {
//         vandorName
//         id
//       }
//       totalPrice
//       date
//     }
//   }
//   `;

//   const { data, refetch } = useQuery(GET_ALL_PURCHASE);

//   console.log(data);


//   useEffect(() => {
//     refetch();
//   }, [refetch]);


//   return (<>
//     <Row>
//       <Col className="mx-auto my-5">
//         <Card>
//           <Card.Body>
//             <h2>Table of Purchase List</h2>
//             <table className="table mt-2 border">
//               <thead className="table-head">
//                 <tr className="border">
//                   <th className="border">Sr No</th>
//                   <th className="border">Vendor</th>
//                   <th className="border">Total</th>
//                   <th className="border">Products</th>
//                   <th className="border">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="table-body">
//                 {data && data?.getAllPurchaseOrder?.map((item, index) => (
//                   <tr key={item.id}>
//                     <td className="border"> {index + 1} </td>
//                     <td className="border"> {item?.vandor?.vandorName} </td>
//                     <td className="border"> {item?.totalPrice} </td>
//                     <td className="border">
//                       {item?.products.map((product) => (
//                         <div key={product?.id}>
//                           Product ID:
//                           <ul>
//                             <li>Product:{product.productId.id}</li>
//                             <li>Qty: {product.qty}</li>
//                             <li>Purchase Price: {product.puchasePrice}</li>
//                           </ul>
//                         </div>
//                       ))}
//                     </td>
//                     <td className="border"> {moment(parseInt(item.date, 10)).format('LL')} </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   </>);
// }

// export default ListPurchase;
