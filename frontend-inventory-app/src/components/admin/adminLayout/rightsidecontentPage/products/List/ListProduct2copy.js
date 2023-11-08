// import React, { useState } from "react";
// import { Card, Col, Row, Button, Table, Modal, Form } from "react-bootstrap";
// import { gql, useQuery, useMutation } from "@apollo/client";

// function ListProduct() {
//   const [modal, showModal] = useState(false);
//   const [productId, setProductId] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [color, setColor] = useState("");
//   const [gender, setGender] = useState("");

//   const GET_ALL_PRODUCT = gql`query GetAllProducts {
//     getAllProducts {
//       id
//       productName
//       priveiwName
//       sellingPrice
//       purchasePrice
//       images {
//         imagePath
//         color
//         gender
//       }
//       size
//       color
//       gender
//       discount
//       description
//       stock {
//         quantity
//         gender
//         color
//         size
//       }
//       storeAllocation {
//         id
//         storeId
//         qty
//       }
//     }
//   }
//   `;

//   const { data, refetch } = useQuery(GET_ALL_PRODUCT);

//   const ADD_IMAGE_TO_PRODUCT = gql`mutation AddImagetoProduct($productId: ID, $color: String, $productImages: [Upload], $gender: String) {
//     addImagetoProduct(productId: $productId, color: $color, productImages: $productImages, gender: $gender) {
//       massage
//     }
//   }
//   `;

//   const [addImageToProduct] = useMutation(ADD_IMAGE_TO_PRODUCT);

//   const handleImage = (id, img) => {
//     showModal(true);
//     setProductId(id);
//     setSelectedImage(img);
//   };

//   const handleSubmitImage = async () => {
//     try {
//       if (selectedImage) {
//         await addImageToProduct({
//           variables: {
//             productId,
//             color: color,
//             productImages: [selectedImage],
//             gender: gender,
//           },
//         });

//         //successfully updating the image, refetch the data

//         await refetch();

//         showModal(false);

//       } else {
//         console.error("No image selected.");
//       }
//     } catch (error) {
//       console.error(error);
      
//     }
//   };

//   return (
//     <Row className="mx-auto my-5">
//       <Col>
//         <Card>
//           <Card.Body>
//             <h2>Table of Product List</h2>
//             <Table bordered hover responsive className="mt-2">
//               <thead>
//                 <tr>
//                   <th>Sr No</th>
//                   <th>Product Full Name</th>
//                   <th>Product Preview Name</th>
//                   <th>Selling Price</th>
//                   <th>Purchase Price</th>
//                   <th>Image</th>
//                   <th>Size</th>
//                   <th>Color</th>
//                   <th>Gender</th>
//                   <th>Discount</th>
//                   <th>Description</th>
//                   <th>Stock</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data &&
//                   data.getAllProducts.map((item, index) => (
//                     <tr key={item.id}>
//                       <td>{index + 1}</td>
//                       <td>{item.productName}</td>
//                       <td>{item.priveiwName}</td>
//                       <td>{item.sellingPrice}</td>
//                       <td>{item.purchasePrice}</td>
//                       <td>
//                         <img
//                           src={item.images[0]?.imagePath}
//                           alt="Product"
//                           width="30"
//                           height="30"
//                         />
//                         <Button
//                           className="btn btn-sm"
//                           onClick={() => handleImage(item.id, item.images[0]?.imagePath)}
//                         >
//                           <i className="bi bi-card-image"></i>
//                         </Button>{" "}
//                       </td>
//                       <td>{item.size}</td>
//                       <td>{item.color}</td>
//                       <td>{item.gender}</td>
//                       <td>{item.discount}</td>
//                       <td>{item.description}</td>
//                       <td>{item.stock[0]?.quantity}</td>
//                       <td>
//                         <Button className="btn btn-sm">
//                           <i className="bi bi-pencil-square"></i>
//                         </Button>{" "}
//                         <Button className="btn btn-sm">
//                           <i className="bi bi-trash"></i>
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>

//         <Modal
//           className="modal-right scroll-out-negative"
//           show={modal}
//           onHide={() => showModal(false)}
//           scrollable
//           dialogClassName="full"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title as="h5">Update IMAGE</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="mb-3">
//               <img src={selectedImage} alt="Product" width="100" height="100" />
//               <Form.Label>IMAGE:</Form.Label>
//               <Form.Control type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
//             </div>
//             <div className="mb-3">
//               <Form.Label>Color:</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <Form.Label>GENDER:</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//               />
//             </div>
//             <Button type="submit" className="my-2 btn btn-primary" onClick={handleSubmitImage}>
//               Submit
//             </Button>
//           </Modal.Body>
//         </Modal>
//       </Col>
//     </Row>
//   );
// }

// export default ListProduct;
