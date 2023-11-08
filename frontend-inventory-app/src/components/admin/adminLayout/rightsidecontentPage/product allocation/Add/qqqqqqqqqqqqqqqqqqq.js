// import { gql, useMutation, useQuery } from '@apollo/client';
// import React, { useState } from 'react';
// import { Card, Col, Row, Form, Button } from 'react-bootstrap';
// import toast from "react-hot-toast";

// function AddProductAllocation() {
//   const [product, setProduct] = useState('');
//   const [store, setStore] = useState('');
//   const [quantity, setQuantity] = useState(0);
//   const [gender, setGender] = useState('');
//   const [color, setColor] = useState('');
//   const [size, setSize] = useState('');

//   const CREATE_PRODUCT_ALLOCATION = gql`mutation ProductAllocatation($productId: ID, $storeId: ID, $quantity: Int, $gender: String, $color: String, $size: String) {
//     productAllocatation(productId: $productId, storeId: $storeId, quantity: $quantity, gender: $gender, color: $color, size: $size) {
//       id
//     }
//   }`;

//   const [ProductAllocation] = useMutation(CREATE_PRODUCT_ALLOCATION, {
//     onCompleted: () => {
//       toast.success("Success!");
//     },
//     onError: (error) => {
//       console.error("Error", error);
//       toast.error(error.message);
//     },
//   });

//   const GET_ALL_STORE = gql`
//     query GetAllStore {
//       getAllStore {
//         id
//         storeName
//       }
//     }
//   `;

//   const { data: storeData } = useQuery(GET_ALL_STORE);

//   const GET_ALL_PRODUCT = gql`query GetAllProducts {
//     getAllProducts {
//       id
//       productName
//       gender
//       color
//       size
//     }
//   }
//   `;

//   const { data: productData } = useQuery(GET_ALL_PRODUCT);

//   if (productData) {
//     console.log("pppppppppppp", productData);
//   }

//   //product--clr,gndr,size

//   const handleProductChange = (selectedProductId) => {
//     const selectedProduct = productData?.getAllProducts.find((item) => item.id === selectedProductId);

//     console.log("selectedProduct", selectedProduct);

//     if (selectedProduct) {
//       setProduct(selectedProductId);
//       // setGender(selectedProduct.gender);
//       // setColor(selectedProduct.color);
//       // setSize(selectedProduct.size);
//     }

//     setProduct1(selectedProduct);

//   };

//   const [product1, setProduct1] = useState();





//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await ProductAllocation({
//         variables: {
//           productId: product,
//           storeId: store,
//           quantity,
//           gender,
//           color,
//           size,
//         },
//       });

//       console.log("Store ID:", store);
//       console.log("Product ID:", product);
//       console.log("Gender:", gender);
//       console.log("Color:", color);
//       console.log("Size:", size);
//     } catch (err) {
//       console.error(err);
//     }
//   };




//   return (
//     <div>
//       <h2>Product Allocation</h2>
//       <Row>
//         <Col xs={12} sm={6}>
//           <Card>
//             <Card.Body>
//               <Form onSubmit={handleSubmit}>
//                 {storeData && (
//                   <Form.Group>
//                     <Form.Label>Select Store</Form.Label>
//                     <Form.Select
//                       value={store}
//                       onChange={(e) => setStore(e.target.value)}
//                     >
//                       <option hidden>Select Store</option>
//                       {storeData.getAllStore.map((store) => (
//                         <option key={store.id} value={store.id}>
//                           {store.storeName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 )}
//                 {productData && (
//                   <Form.Group>
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Select
//                       value={product}
//                       onChange={(e) => handleProductChange(e.target.value)}
//                     >
//                       <option hidden>Select Product Name</option>
//                       {productData.getAllProducts.map((product) => (
//                         <option key={product.id} value={product.id}>
//                           {product.productName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 )}


//                 <Form.Group>
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                   >
//                     <option hidden>Select gender</option>
//                     {product1 && product1.gender?.map((gender, index) => (
//                       <option key={index} value={gender}>
//                         {gender}
//                       </option>
//                     ))}
                    
//                   </Form.Select>
//                 </Form.Group>




//                 <Form.Group>
//                   <Form.Label>Color</Form.Label>
//                   <Form.Select
//                     value={color}
//                     onChange={(e) => setColor(e.target.value)}

//                   >
//                     <option hidden>Select color</option>
//                     {product1 && product1.color?.map((color, index) => (
//                       <option key={index} value={color}>
//                         {color}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Label>Size</Form.Label>
//                   <Form.Select
//                     value={size}
//                     onChange={(e) => setSize(e.target.value)}
//                   >
//                     <option hidden>Select size</option>
//                     {product1 && product1.size?.map((size, index) => (
//                       <option key={index} value={size}>
//                         {size}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>


//                 <Form.Group>
//                   <Form.Label>Quantity</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => setQuantity(Number(e.target.value))}
//                   />
//                 </Form.Group>


//                 <Button variant="success" type="submit" className="mt-3">
//                   Add
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default AddProductAllocation;
