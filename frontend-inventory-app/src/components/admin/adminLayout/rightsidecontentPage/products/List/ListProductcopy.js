// import React, { useEffect , useState} from "react";
// import { Card, Col, Row, Button, Table, Form, Modal } from "react-bootstrap";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import Select from 'react-select';

// function ListProduct() {
//   const GET_ALL_COLOUR = gql`
//     query GetAllColor {
//       getAllColor {
//         id
//         colorName
//       }
//     }
//   `;
  
//   const { data: color } = useQuery(GET_ALL_COLOUR);

//   const [modal, showModal] = useState(false);

//   const GET_ALL_PRODUCT = gql`
//     query Query {
//     getAllProducts {
//       id
//       productName
//       priveiwName
//       sellingPrice
//       purchasePrice
//       images
//       size
//       color
//       gender
//       discount
//       description
//       stock
//     }
//     }
//   `;

//   const { data, refetch } = useQuery(GET_ALL_PRODUCT);

//   useEffect(() => {
//     refetch();
//   }, []);


// // DELETE 
//     const DELETE_PRODUCT = gql`
//       mutation DeleteProduct($deleteProductId: ID!) {
//         deleteProduct(id: $deleteProductId) {
//           id
//         }
//       }
//     `;

//     const [deleteProduct, {data: deleteData}] = useMutation(DELETE_PRODUCT, {
//       onCompleted: () => {
//         refetch();
//       }
//     });

//     const handleDelete = async (id) => {
//       await deleteProduct({
//         variables: {
//           deleteProductId: id
//         }
//       })

//     }

//     // Edit
//   const [updateProductId, setUpdateProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [previewName, setPreviewName] = useState("");
//   const [images, setImages] = useState([]);
//   const [discount, setDiscount] = useState("");
//   const [stock, setStock] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [purchasePrice, setPurchasePrice] = useState("");
//   const [gender, setGender] = useState("");
//   const [allcolor, setAllcolor] = useState([]);
//   const [size, setSize] = useState("");
//   const [description, setDescription] = useState("");

//   const EDIT_PRODUCT = gql`
//   mutation UpdateProduct($updateProductId: ID!, $productName: String, $priveiwName: String, $size: [String], $color: [String], $gender: [String], $sellingPrice: Float, $purchasePrice: Float, $discount: Float, $description: String, $productImages: [Upload], $stock: Int) {
//     updateProduct(id: $updateProductId, productName: $productName, priveiwName: $priveiwName, size: $size, color: $color, gender: $gender, sellingPrice: $sellingPrice, purchasePrice: $purchasePrice, discount: $discount, description: $description, productImages: $productImages, stock: $stock) {
//       id
//       productName
//       priveiwName
//       sellingPrice
//       purchasePrice
//       images
//       size
//       color
//       gender
//       discount
//       description
//       stock
//     }
//   }
//   `;
  

//   function handleColorBox(e) {
//     if (e.target.checked) {
//       setAllcolor([...allcolor, e.target.value]);
//     }
//     else {
//       setAllcolor(allcolor.filter((item) => item !== e.target.value));
//     }
//   }


//   function handleGenderChange(e) {
//     if (e.target.checked) {
//       setGender([...gender, e.target.value]);
//     }
//     else {
//       setGender(gender.filter((item) => item !== e.target.value));
//     }
//   }

//   function handleSizeChange(e) {
//     if (e.target.checked) {
//       setSize([...size, e.target.value]);
//     }
//     else {
//       setSize(size.filter((item) => item !== e.target.value));
//     }
//   }


//   const [editProduct, {data: dateEdit}] = useMutation(EDIT_PRODUCT, {
//     onCompleted: () => {
//       refetch()
//     }
//   });


//     const handleEdit = async (id, productName, priveiwName, sellingPrice, purchasePrice, size, color, discount, gender, description, stock) => {
//       showModal(true);
//       setUpdateProductId(id);
//       setAllcolor(color);
//       setProductName(productName);
//       setPreviewName(priveiwName);
//       setDiscount(discount);
//       setStock(stock);
//       setSellingPrice(sellingPrice);
//       setPurchasePrice(purchasePrice);
//       setGender(gender);
//       setSize(size);
//       setDescription(description);

//     }

//     const ConfirmUpdate = async () => {
//       await editProduct({
//         variables : {
//           updateProductId,
//           productName,
//           priveiwName: previewName,
//           productImages: images,
//           discount: parseFloat(discount),
//           stock: parseInt(stock),
//           sellingPrice: parseFloat(sellingPrice),
//           purchasePrice: parseFloat(purchasePrice),
//           gender,
//           color: allcolor,
//           size,
//           description,
//         }
//       })
//     }

//     const [change, handleChange] = useState("");

//   return (<>
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
//                 {data && data.getAllProducts.map((item, index) => (
//                   <tr key={item.id}>
//                     <td> {index + 1} </td>
//                     <td> {item.productName} </td>
//                     <td> {item.priveiwName} </td>
//                     <td> {item.sellingPrice} </td>
//                     <td> {item.purchasePrice} </td>
//                     <td>
//                     <img src={item.images} width="30" height="30" /> 
//                     </td>
//                     <td> {item.size} </td>
//                     <td> {item.color.join(", ")} </td>
//                     <td> {item.gender} </td> 
//                     <td> {item.discount} </td>
//                     <td> {item.description} </td>
//                     <td> {item.stock} </td>
//                     <td>
//                       <Button className="btn btn-sm" onClick={() => handleEdit(item.id, item.productName, item.priveiwName,  item.sellingPrice, item.purchasePrice , item.size, item.color, item.discount, item.gender, item.description, item.stock )}>
//                         <i className="bi bi-pencil-square"></i>
//                       </Button>{" "}
//                       <Button className="btn btn-sm" onClick={() => handleDelete(item.id)}>
//                         <i className="bi bi-trash"></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}


//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row> 
//     <Modal className="modal-right scroll-out-negative" show={modal} onHide={() => showModal(false)}
//        scrollable dialogClassName="full" >
//       <Modal.Header closeButton>
//         <Modal.Title as="h5">Update Category</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form.Group>
//           <Form.Label>Product Full Name</Form.Label>
//                 <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
//               </Form.Group>
              
//               <Form.Group>
//                 <Form.Label>Product Preview Name</Form.Label>
//                 <Form.Control type="text" value={previewName} onChange={(e) => setPreviewName(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Product Images</Form.Label>
//                 <Form.Control type="file" multiple onChange={(e) => setImages(e.target.files[0])} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Discount</Form.Label>
//                 <Form.Control type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Stock</Form.Label>
//                 <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
//               </Form.Group>
              
//               <Form.Group>
//                 <Form.Label>Selling Price</Form.Label>
//                 <Form.Control type="text" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Purchase Price</Form.Label>
//                 <Form.Control type="text" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
//               </Form.Group>

//               <div className="mt-3">
//                 <Form.Group>
//                   <Form.Label>gender : </Form.Label>
//                   <input className="mx-1" value="Men" type="checkbox" onChange={handleGenderChange} />
//                   <span>Men</span>

//                   <input className="mx-1" value="Women" type="checkbox" onChange={handleGenderChange} />
//                   <span>Women</span>

//                 </Form.Group>

//               </div>

             
//                 <Form.Label>color : </Form.Label> 
//                 {/* <Select options={options} /> */}
//               {color?.getAllColor && color?.getAllColor?.map((colors) => 
//               <div key={colors.id}>
//                 <input className="mx-1" value={colors?.colorName} type="checkbox" 
//                 checked={allcolor.includes(colors?.colorName)}
//                 // checked={allcolor.find(item => item === colors?.colorName)}
//                onChange={handleColorBox} />
//                 <span>{colors?.colorName}</span> </div>
//                 )}

//               <Form.Group>
//                 <Form.Label>size : </Form.Label>
//                 <input className="mx-1" value="Small" type="checkbox" onChange={handleSizeChange} />
//                 <span>Small</span>
//                 <input className="mx-1" value="Medium" type="checkbox" onChange={handleSizeChange} />
//                 <span>Medium </span>
//                 <input className="mx-1" value="Large" type="checkbox" onChange={handleSizeChange} />
//                 <span>Large</span>
//                 <input className="mx-1" value="X-Large" type="checkbox" onChange={handleSizeChange} />
//                 <span>X-Large</span>
//               </Form.Group>


//               <Form.Group>
//                 <Form.Label>description</Form.Label>
//                 <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
//               </Form.Group>

//               <Button variant="success" type="submit" className="mt-2" onClick={() => ConfirmUpdate()}>
//                 ADD
//               </Button>

//             </Modal.Body>
//           </Modal>
//   </>);
// }

// export default ListProduct;
