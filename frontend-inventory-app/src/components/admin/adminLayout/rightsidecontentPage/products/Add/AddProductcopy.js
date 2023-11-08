// import React, { useState } from "react";
// import { Card, Col, Row, Button, Form } from "react-bootstrap";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import toast from "react-hot-toast";

// function AddProduct() {
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


//   const CREATE_PRODUCT_MUTATION = gql`
//     mutation CreateProduct($productName: String, $priveiwName: String, $size: [String], $color: [String], $gender: [String], $sellingPrice: Float, $purchasePrice: Float, $discount: Float, $description: String, $productImages: [Upload], $stock: Int) {
//       createProduct(productName: $productName, priveiwName: $priveiwName, size: $size, color: $color, gender: $gender, sellingPrice: $sellingPrice, purchasePrice: $purchasePrice, discount: $discount, description: $description, productImages: $productImages, stock: $stock) {
//         id
//         productName
//         priveiwName
//         sellingPrice
//         purchasePrice
//         images
//         size
//         color
//         gender
//         discount
//         description
//         stock
//       }
//     }
//   `;


//   const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
//     onCompleted: () => {
//       console.log("Data sent Successfully");
//       toast.success("Product Created Successfully");
      
//       setProductName("");
//       setPreviewName("");
//       setImages([]);
//       setDiscount("");
//       setStock("");
//       setSellingPrice("");
//       setPurchasePrice("");
//       setGender([]);
//       setAllcolor([]);
//       setSize([]);
//       setDescription("");

//     }
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await createProduct({
//         variables: {
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
//         },
//       });



//     } catch (err) {
//       console.error(err);
//     }
//   };


//   const GET_ALL_COLOUR = gql`
//   query GetAllColor {
//     getAllColor {
//       id
//       colorName
//     }
//   }
// `;

//   const GET_ALL_SIZE = gql`query GetAllSize {
//   getAllSize {
//     id
//     sizeName
//   }
// }`;

//   const { data: color } = useQuery(GET_ALL_COLOUR);

//   const { data: Size } = useQuery(GET_ALL_SIZE);


//   return (
//     <Row className="mx-auto my-5">
//       <Col>
//         <Card>
//           <Card.Body>
//             <h2>Add Product</h2>
//             <Form onSubmit={handleSubmit}>

//               <Form.Group>
//                 <Form.Label>Product Full Name</Form.Label>
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




//               <Form.Group>
//                 <Form.Label>color : </Form.Label>
//                 {color?.getAllColor && color?.getAllColor?.map((colors) =>
//                   <div key={colors.id}  className="mx-1 d-inline">

//                     <input className="mx-1" style={{ display: 'inline' }} value={colors?.colorName} type="checkbox"
//                       onChange={handleColorBox} />
//                     <span style={{ display: 'inline' }} >{colors?.colorName}</span>

//                   </div>
//                 )}
//               </Form.Group>



//               <Form.Group>
//                 <Form.Label>size : </Form.Label>


//                 {Size && Size?.getAllSize.map((e) => <div  className="mx-1 d-inline">

//                   <input  className="mx-1"  value={e.sizeName} type="checkbox" onChange={handleSizeChange} />
//                   <span  >{e.sizeName}</span>

//                 </div>)}



//               </Form.Group>


//               <Form.Group>
//                 <Form.Label>description</Form.Label>
//                 <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
//               </Form.Group>

//               <Button variant="success" type="submit" className="mt-2">
//                 ADD
//               </Button>

//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   );
// }

// export default AddProduct;
