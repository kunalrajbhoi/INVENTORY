import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Card, Col, Row, Table, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function DetailProduct() {

    const { productDetail } = useParams();

    const [modal, showModal] = useState(false);
    const [productId, setProductId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [color, setColor] = useState("");
    const [gender, setGender] = useState("");

    const GET_PRODUCT_DETAIL = gql`
    query GetProduct($getProductId: ID) {
        getProduct(id: $getProductId) {
          id
          productName
          priveiwName
          sellingPrice
          purchasePrice
          images {
            imagePath
            color
            gender
          }
          size
          color
          gender
          discount
          description
          storeAllocation {
            id
            storeId
            qty {
              quantity
              gender
              color
              size
            }
          }
          stock {
            quantity
            gender
            color
            size
          }
        }
      }`;

    const { data, refetch } = useQuery(GET_PRODUCT_DETAIL, {
        variables: {
            getProductId: productDetail,
        },
    });

    console.log("Data", data);




    // function for edit image---

    const ADD_IMAGE = gql`
    mutation Mutation($productId: ID, $productImages: [Upload], $color: String, $gender: String) {
        addImagetoProduct(productId: $productId, productImages: $productImages, color: $color, gender: $gender) {
          massage
        }
      }`;

    const [ADDIMAGE] = useMutation(ADD_IMAGE);

    const handleImage = (id, img) => {
        showModal(true);
        setProductId(id);
        setSelectedImage(img)
        console.log(img);

    };

    const [productdetail, setProductdetail] = useState(null);

    const handleImage1 = (prod1) => {
        console.log(prod1);
        setProductdetail(prod1);
    }


    const handleSubmitImage = async () => {
        try {
            if (selectedImage) {
                await ADDIMAGE({
                    variables: {
                        productId,
                        productImages: [selectedImage],
                        color: color,
                        gender: gender,
                    },
                });

                await refetch();

                showModal(false);
            }

            else {
                console.error("no image selected");
            }
        }

        catch (err) {
            console.error(err);
        }
    }



    const product = data?.getProduct;

    console.log("product", product);


    return (
        <>
            <Row className="mx-auto my-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <h2>Product Detail</h2>
                            {product &&
                                <Table bordered hover responsive className="mt-2">
                                    <tbody>
                                        <tr>
                                            <th>Product Name</th>
                                            <td>{product.productName}</td>
                                        </tr>
                                        <tr>
                                            <th>Preview Name</th>
                                            <td>{product.priveiwName}</td>
                                        </tr>
                                        <tr>
                                            <th>Selling Price</th>
                                            <td>{product.sellingPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Purchase Price</th>
                                            <td>{product.purchasePrice}</td>
                                        </tr>
                                        <tr>
                                            <th>IMAGE</th>
                                            <td>
                                                {product?.images?.map((item, index) => (
                                                    <div key={index}>
                                                        <img src={item?.imagePath} width="30" height="30" />
                                                    </div>

                                                    // <div key={index}>

                                                    //     <p style={{ color: "blueviolet" }}> <b>Image</b> {index + 1}: </p>
                                                    //     <p> <b>Image Path:</b> <img src={item.imagePath} width="30" height="30" /> </p>
                                                    //     <p> <b>Color:</b> {item.color}  </p>
                                                    //     <p> <b>Gender:</b> {item.gender} </p>

                                                    //     <Button variant="primary" className='mb-5'
                                                    //         onClick={() => {
                                                    //             handleImage(product.id, product.images[0]?.imagePath);
                                                    //             handleImage1(product);
                                                    //         }}
                                                    //     >Edit Image</Button>

                                                    // </div>

                                                ))}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>size</th>
                                            <td>{product.size.join(", ")}</td>
                                        </tr>

                                        <tr>
                                            <th>color</th>
                                            <td>{product.color.join(", ")}</td>
                                        </tr>

                                        <tr>
                                            <th>gender</th>
                                            <td>{product.gender.join(", ")}</td>
                                        </tr>

                                        <tr>
                                            <th>Discount</th>
                                            <td>{product.discount}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{product.description}</td>
                                        </tr>

                                        <tr>
                                            <th>storeAllocation</th>
                                            <td>
                                                {product.storeAllocation.map((item, index) => (
                                                    <div key={item.id} className="mb-4">
                                                        <p className="text-primary mb-2">
                                                            <b>Shop {index + 1}:</b>
                                                        </p>
                                                        <p>
                                                            <b>storeId:</b> {item.storeId}
                                                        </p>
                                                        <p>
                                                            <b style={{ color: "red" }}>Qty-Details:</b>
                                                        </p>
                                                        <ul className="list-unstyled">
                                                            {item.qty?.map((qt, subIndex) => (
                                                                <li key={subIndex} className="mb-1">
                                                                    <b>No {subIndex + 1}:</b>
                                                                    <ul className="list-unstyled">
                                                                        <li>Quantity: {qt.quantity}</li>
                                                                        <li>Gender: {qt.gender}</li>
                                                                        <li>Color: {qt.color}</li>
                                                                        <li>Size: {qt.size}</li>
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>


                                        <tr>
                                            <th>stock</th>
                                            <td>{product.stock.map((item, index) => (
                                                <div key={item.id}>

                                                    <p style={{ color: "blueviolet" }}> <b> sr no </b> {index + 1}  </p>
                                                    <p> <b> quantity :</b> {item.quantity}  </p>
                                                    <p> <b> gender : </b> {item.gender} </p>
                                                    <p> <b> color : </b> {item.color}  </p>
                                                    <p> <b> size :</b> {item.size}  </p>

                                                </div>
                                            ))}</td>
                                        </tr>

                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                    </Card>
                </Col>


                {/* modal for edit Image */}

                <Modal
                    className="modal-right scroll-out-negative"
                    show={modal}
                    onHide={() => showModal(false)}
                    scrollable
                    dialogClassName="full"
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="h5">Update IMAGE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <img src={selectedImage} width="100" height="100" />
                            <Form.Label>IMAGE:</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setSelectedImage(e.target.files[0])}

                            />
                        </div>
                        <div className="mb-3">

                            <Form.Group>
                                <Form.Label>Color : </Form.Label>
                                <Form.Select value={color} onChange={(e) => setColor(e.target.value)}>
                                    <option hidden>Select Color Name</option>
                                    {productdetail &&
                                        productdetail.color.map((clr, index) => (
                                            <option key={index} value={clr}>
                                                {clr}
                                            </option>
                                        ))}

                                </Form.Select>

                            </Form.Group>
                        </div>
                        <div className="mb-3">

                            <Form.Group>
                                <Form.Label>GENDER : </Form.Label>
                                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option hidden>Select GENDER</option>
                                    {productdetail &&
                                        productdetail.gender.map((gender, index) => (
                                            <option key={index} value={gender}>
                                                {gender}
                                            </option>
                                        ))}
                                </Form.Select>

                            </Form.Group>
                        </div>
                        <Button type="submit" className="my-2 btn btn-primary" onClick={handleSubmitImage}>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>

            </Row>

            {/* new row for storeallocation detail */}

            <Row className="mx-auto my-5">
                <Col>
                    <Card>
                        <Card.Body>
                        <h2>TABLE for Store Allocation</h2>

<tr>
    <td>
        {product?.storeAllocation?.map((item, index) => (
            <div key={item.id} className="mb-4">
                <p className="text-primary mb-2">
                    <b>Shop {index + 1}:</b>
                </p>
                <p>
                    <b>storeId:</b> {item.storeId}
                </p>
                <p>
                    <b style={{ backgroundColor: "orangered" }}>Qty-Details:</b>
                </p>


                <Table bordered hover responsive className="mt-2">
                    <thead>
                        <tr>
                            <th></th>
                            {product.color?.map((qt, subIndex) =>  (
                                <th style={{ backgroundColor: "lightgrey" }} key={subIndex}>
                                    {qt}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-bordered">
                       
                            {product.size?.map((qt, subIndex) => (
                                <tr key={subIndex}> 
                                <td style={{ backgroundColor: "lightblue" }}>
                                    {qt}
                                </td>
                                
                                {item.qty?.map((qt, subIndex) => (
                                <td style={{ backgroundColor: "lightgreen" }} key={subIndex}>
                                    {qt.quantity}
                                </td>
                            ))}

                                </tr>
                            ))}

                    </tbody>
                </Table>



            </div>
        ))}
    </td>
</tr>
                           
                          
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            {/* {item.qty?.map((qt, subIndex) => (
                                <td style={{ backgroundColor: "lightgreen" }} key={subIndex}>
                                    {qt.quantity}
                                </td>
                            ))} */}

      


{/* <h2>storeAllocation</h2>

<tr>
    <td>
        {product?.storeAllocation?.map((item, index) => (
            <div key={item.id} className="mb-4">
                <p className="text-primary mb-2">
                    <b>Shop {index + 1}:</b>
                </p>
                <p>
                    <b>storeId:</b> {item.storeId}
                </p>
                <p>
                    <b style={{ color: "red" }}>Qty-Details:</b>
                </p>


                <Table bordered hover responsive className="mt-2">
                    <thead>
                        <tr>
                            <th></th>
                            {item.qty?.map((qt, subIndex) => (
                                <th style={{ backgroundColor: "lightgrey" }} key={subIndex}>
                                    {qt.color}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-bordered">


                        <tr>
                            
                            {item.qty?.map((qt, subIndex) => (
                                <td style={{ backgroundColor: "lightblue" }} key={subIndex}>
                                    {qt.size}
                                </td>
                            ))}

                            {item.qty?.map((qt, subIndex) => (
                                <td style={{ backgroundColor: "lightgreen" }} key={subIndex}>
                                    {qt.quantity}
                                </td>
                            ))}

                        </tr>


                    </tbody>
                </Table>



            </div>
        ))}
    </td>
</tr> */}

  </>);
}




export default DetailProduct;
