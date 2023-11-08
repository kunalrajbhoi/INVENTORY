import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Card, Col, Row, Table, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';

function DetailProduct() {

    const { productDetail } = useParams();

    const [modal, showModal] = useState(false);
    const [productId, setProductId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [color, setColor] = useState("");
    const [gender, setGender] = useState("");


    const [genderCheck, setGenderCheck] = useState("");

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
        <div className=" my-5">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h3>Product Detail :</h3>
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
                                            <th>Discount</th>
                                            <td>{product.discount}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{product.description}</td>
                                        </tr>



                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h3>IMAGE :</h3>
                            <div>
                                {product?.images?.map((item, index) => (
                                    <div key={index}>
                                        <img src={item?.imagePath[0]} width={"180"} />
                                    </div>
                                ))}
                            </div>

                            <Table bordered hover responsive className="mt-2">
                                
                                <tbody>
                                    <tr>
                                        <td>Size</td>
                                        <td>{product?.size.join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td>{product?.color.join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{product?.gender.join(", ")}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}  className="pt-2">
                    <Card>
                        <Card.Body>

                            <h3>Stock :</h3>

                            <Table bordered hover responsive className="mt-2">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Quantity</th>
                                        <th>Gender</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.stock?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>



                            {/* <td>{product.stock.map((item, index) => (
                                    <div key={item.id}>

                                        <p style={{ color: "blueviolet" }}> <b> sr no </b> {index + 1}  </p>
                                        <p> <b> quantity :</b> {item.quantity}  </p>
                                        <p> <b> gender : </b> {item.gender} </p>
                                        <p> <b> color : </b> {item.color}  </p>
                                        <p> <b> size :</b> {item.size}  </p>

                                    </div>
                                ))}</td> */}

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={12} className="pt-2">
                    <Card> 
                        
                        <Card.Body>
                        <h3> storeAllocation :</h3>
                        <Table bordered hover responsive className="mt-2">

                            <thead>
                                <tr>
                                    <th>Shop</th>
                                    <th>storeId</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {product?.storeAllocation?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td> {index + 1} </td>
                                        <td> {item.storeId} </td>
                                        <td>
                                            {item.qty?.map((qt, subIndex) => (
                                                <div key={subIndex}>
                                                    <p style={{ color: "red" }}> qty {subIndex + 1} : </p>
                                                    <ul>
                                                        <li> <b>Quantity:</b> {qt.quantity} </li>
                                                        <li> <b>Gender:</b> {qt.gender} </li>
                                                        <li> <b>Color:</b> {qt.color} </li>
                                                        <li> <b>Size:</b> {qt.size} </li>
                                                    </ul>
                                                </div>
                                            ))}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    </Card.Body> </Card>


                </Col>



                {/* modal for edit Image */}

                {/* <Modal
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
                </Modal> */}

            </Row>

            {/* new row for storeallocation detail */}

            <Row className="mx-auto my-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <h2>TABLE for Store Allocation</h2>


                            <Tabs>
                                {/* item.qty.find(tempG => tempG.gender === g ) && */}


                                {product?.gender?.map((g) => (
                                    <Tab eventKey={g} title={g} key={g} onClick={() => setGenderCheck(g)}>

                                        {product?.storeAllocation?.map((item, index) => item.qty.find(tempG => tempG.gender === g ) && (
                                            <div key={item.id} className="mb-4">

                                                <p className="text-primary mb-2"> <b>Shop {index + 1}:</b> </p>

                                                <p> <b>storeId:</b> {item.storeId} </p>

                                                <p>  <b style={{ backgroundColor: "orangered" }}>Qty-Details:</b> </p>



                                                <Table bordered hover responsive className="mt-2">
                                                    <thead>
                                                        <tr>
                                                            <th></th>

                                                            {product.color?.map((qt, subIndex) => (
                                                                <th style={{ backgroundColor: "lightgrey" }} key={subIndex}>
                                                                    {qt}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>

                                                    <tbody className="table-bordered">
                                                        {product.size?.map((szee, subIndex) => (
                                                            <tr key={subIndex}>
                                                                <td style={{ backgroundColor: "lightblue" }}>
                                                                    {szee}
                                                                </td>

                                                                {product.color?.map((clr, subIndex) => (
                                                                    <td style={{ backgroundColor: "lightskyblue" }} key={subIndex}>

                                                                        {/* {item.qty.find((op) => op.color === clr && qt === op.size )?.quantity } */}

                                                                        {item.qty.find((op) => op.color === clr && szee === op.size && op.gender === g)?.quantity > 0 ?
                                                                            item.qty.find((op) => op.color === clr && szee === op.size && op.gender === g )?.quantity :
                                                                            0}


                                                                    </td>
                                                                ))}

                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </Table>



                                            </div>
                                        ))}

                                    </Tab>))}


                            </Tabs>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </div>);
}




export default DetailProduct;
