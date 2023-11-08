// import React, { useState } from 'react';
// import { Card, Col, Row, Form, Button, Table } from 'react-bootstrap';
// import { gql, useMutation, useQuery } from "@apollo/client";
// import toast from 'react-hot-toast';

// function AddPurchase() {


//   // GET PRODUCT LIST
//   const GET_ALL_PRODUCT = gql`
//     query Query {
//       getAllProducts {
//         id
//         productName
//       }
//     }
//   `;

//   const { data, refetch } = useQuery(GET_ALL_PRODUCT);

//   // GET VENDOR LIST
//   const GET_ALL_VANDOR = gql`
//   query GetAllVandor {
//     getAllVandor {
//       id
//       vandorName
//       companyName
//       balance
//     }
//   }
// `;

//   const { data: vendorData } = useQuery(GET_ALL_VANDOR);

//   const CREATE_PURCHASE_ORDER = gql`
//   mutation CreatePurchaseOrder($products: [PurchaseProductInput], $vandor: ID, $totalPrice: Float, $date: String) {
//     createPurchaseOrder(products: $products, vandor: $vandor, totalPrice: $totalPrice, date: $date) {
//       id
//     }
//   } `;

//   const [createPurchaseOrder, { data: showData }] = useMutation(CREATE_PURCHASE_ORDER, {
//     onCompleted: () => {
//       toast.success("Created Successfully");
//     }
//   });


//   if (showData) {
//     console.log("showData", showData);
//   }

//   const [quantity, setQuantity] = useState('');
//   const [purchasePrice, setPurchasePrice] = useState('');
//   const [productsId, setProductsId] = useState('');
//   const [vendor, setVendor] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0); //cal of total prc
//   const [date, setDate] = useState('');


//   const [products, setProducts] = useState([]);




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const selectedProduct = data.getAllProducts.find((product) => product.id === productsId);

//     if (selectedProduct) {
//       const newProduct = {
//         qty: parseInt(quantity, 10),
//         puchasePrice: parseFloat(purchasePrice),
//         prodcutId: productsId,
//         productName: selectedProduct.productName,
//       };

//       //total price calculation start
//       const productPrice = newProduct.qty * newProduct.puchasePrice;

//       setTotalPrice(totalPrice + productPrice)

//       //total price calculation start

//       setProducts([...products, newProduct]);
//     }
//   };




//   async function handleSubmitForm() {


//     try {

//       const productData = products.map((product) => ({
//         productId: product.prodcutId,
//         qty: product.qty,
//         puchasePrice: product.puchasePrice,
//       }));


//       const { data } = await createPurchaseOrder({
//         variables: {
//           products: productData,
//           vandor: vendor,
//           totalPrice: parseFloat(totalPrice),
//           date: date
//         },
//       });

//       // console.log("date",date);



//       setVendor("");
//       setTotalPrice(0);
//       setDate("");
//       setQuantity("");
//       setPurchasePrice("");
//       setProductsId("");
//       setProducts([]);

//       console.log('FORM DATA:', data);

//     } catch (error) {
//       console.error('Error creating purchase order:', error);
//     }
//   }

//   return (
//     <div>
//       <h2>ADD Purchase</h2>
//       <Row>
//         <Col xs={12} sm={6}>
//           <Card>
//             <Card.Body>

//               <Form onSubmit={handleSubmit}>
//                 <h3 className="pt-1">Products :</h3>

//                 <Form.Group>
//                   <Form.Label>Quantity</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Purchase Price</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={purchasePrice}
//                     onChange={(e) => setPurchasePrice(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Product Name</Form.Label>
//                   <Form.Select
//                     as="select"
//                     value={productsId}
//                     onChange={(e) => setProductsId(e.target.value)}
//                   >
//                     <option hidden>Select Product Name</option>
//                     {data && data.getAllProducts.map((product) => (
//                       <option key={product.id} value={product.id}>
//                         {product.productName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Button variant="success" type="submit" className="mt-3">
//                   Add
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col xs={12} sm={6}>
//           <Card>
//             <Card.Body>
//               <Form>
//                 <h3 className="pt-1">DETAILS :</h3>
//                 <Form.Group>
//                   <Form.Label>Vendor</Form.Label>
//                   <Form.Select as="select" value={vendor} onChange={(e) => setVendor(e.target.value)}>
//                     <option hidden>Select Vendor Name</option>
//                     {vendorData && vendorData.getAllVandor.map((vendor) => (
//                       <option key={vendor.id} value={vendor.id}>
//                         {vendor.vandorName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Total Price</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={totalPrice}

//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </Form.Group>

//                 <Button className="mt-3" onClick={() => handleSubmitForm()}>Submit Form</Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Table to display products */}
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>SR NO</th>
//             <th>Product ID</th>
//             <th>Quantity</th>
//             <th>Purchase Price</th>
//             <th>Total Price</th>

//           </tr>
//         </thead>
//         <tbody>
//           {products.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.productName}</td>
//               <td>{item.qty}</td>
//               <td>{item.puchasePrice}</td>
//               <td>{item.qty * item.puchasePrice}</td>

//             </tr>
//           ))}
//         </tbody>

//         <tfoot>
//           <tr>
//             <td colSpan="4">Total</td>
//             <td >{totalPrice}</td>

//           </tr>
//         </tfoot>
//       </Table>

//     </div>
//   );


// }

// export default AddPurchase;
