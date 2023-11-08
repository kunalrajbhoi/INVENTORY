import React, { useState } from "react";
import { Card, Col, Row, Button, Table, Modal, Form } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

function ListProduct() {
  const [modal, showModal] = useState(false);
  const [modal2, showModal2] = useState(false);

  const [productId, setProductId] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");

  // Edit
  const [updateProductId, setUpdateProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [previewName, setPreviewName] = useState("");

  const [discount, setDiscount] = useState("");

  const [sellingPrice, setSellingPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const [allcolor, setAllcolor] = useState([]);
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");

  const GET_ALL_PRODUCT = gql`query Query {
    getAllProducts {
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

  const { data, refetch } = useQuery(GET_ALL_PRODUCT);

  const ADD_IMAGE_TO_PRODUCT = gql`mutation Mutation($productId: ID, $productImages: [Upload], $color: String, $gender: String) {
    addImagetoProduct(productId: $productId, productImages: $productImages, color: $color, gender: $gender) {
      massage
    }
  }`;

  const [addImageToProduct] = useMutation(ADD_IMAGE_TO_PRODUCT);

  const handleImage = (id, img) => {
    showModal(true);
    setProductId(id);
    setSelectedImage(img);
  };

  const [productdetail, setProductdetail] = useState(null);
  const handleImage1 = (prod1) => {
    console.log(prod1);
    setProductdetail(prod1);
  };

  const handleSubmitImage = async () => {
    try {
      if (selectedImage) {
        await addImageToProduct({
          variables: {
            productId,
            color: color,
            productImages: selectedImage,
            gender: gender,
          },
        });

        //successfully updating the image, refetch the data

        await refetch();

        showModal(false);
      } else {
        console.error("No image selected.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const EDIT_PRODUCT = gql`
    mutation UpdateProduct(
      $updateProductId: ID!
      $productName: String
      $priveiwName: String
      $size: [String]
      $color: [String]
      $gender: [String]
      $sellingPrice: Float
      $purchasePrice: Float
      $discount: Float
      $description: String
    ) {
      updateProduct(
        id: $updateProductId
        productName: $productName
        priveiwName: $priveiwName
        size: $size
        color: $color
        gender: $gender
        sellingPrice: $sellingPrice
        purchasePrice: $purchasePrice
        discount: $discount
        description: $description
      ) {
        id
      }
    }
  `;

  const [editProduct, { data: dataEdit }] = useMutation(EDIT_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });

  const GET_ALL_COLOUR = gql`
    query GetAllColor {
      getAllColor {
        id
        colorName
      }
    }
  `;

  const { data: colorrr } = useQuery(GET_ALL_COLOUR);

  const GET_ALL_SIZE = gql`
    query GetAllSize {
      getAllSize {
        id
        sizeName
      }
    }
  `;

  const { data: sizeee } = useQuery(GET_ALL_SIZE);

  function handleColorBox(e) {
    if (e.target.checked) {
      setAllcolor([...allcolor, e.target.value]);
    } else {
      setAllcolor(allcolor.filter((item) => item !== e.target.value));
    }
  }

  function handleGenderChange(e) {
    if (e.target.checked) {
      setGender([...gender, e.target.value]);
    } else {
      setGender(gender.filter((item) => item !== e.target.value));
    }
  }

  function handleSizeChange(e) {
    if (e.target.checked) {
      setSize([...size, e.target.value]);
    } else {
      setSize(size.filter((item) => item !== e.target.value));
    }
  }

  const handleEdit = async (
    id,
    productName,
    priveiwName,
    sellingPrice,
    purchasePrice,
    size,
    color,
    discount,
    gender,
    description
  ) => {
    showModal2(true);
    setUpdateProductId(id);
    setAllcolor(color);
    setProductName(productName);
    setPreviewName(priveiwName);
    setDiscount(discount);
    setSellingPrice(sellingPrice);
    setPurchasePrice(purchasePrice);
    setGender(gender);
    setSize(size);
    setDescription(description);
  };

  const ConfirmUpdate = async () => {
    await editProduct({
      variables: {
        updateProductId,
        productName,
        priveiwName: previewName,
        discount: parseFloat(discount),
        sellingPrice: parseFloat(sellingPrice),
        purchasePrice: parseFloat(purchasePrice),
        gender,
        color: allcolor,
        size,
        description,
      },
    });

    showModal2(false);
  };

  //Delete

  const DELETE_PRODUCT = gql`
    mutation DeleteProduct($deleteProductId: ID!) {
      deleteProduct(id: $deleteProductId) {
        id
      }
    }
  `;

  const [DeleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      refetch();
    },
  });

  async function handleDelete(id, name) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${name}"`
    );
    if (shouldDelete) {
      await DeleteProduct({
        variables: {
          deleteProductId: id,
        },
      });
    }
  }

  return (
    <Row className="mx-auto my-5">
      <Col>


        <h2>Table of Product List</h2>
        <Table responsive bordered hover className="mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Product Preview </th>
              <th>Selling Price</th>
              <th>Purchase Price</th>
              <th>Image</th>
              <th>Size</th>
              <th>Color</th>
              <th>Gender</th>
              <th>Discount</th>
              <th>Description</th>
              {/* <th>Stock</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.getAllProducts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <Link to={`/admin/product/detail_product/${item.id}`}>  <td className="pt-3">{item.productName}</td> </Link>
                  <td>{item.priveiwName}</td>
                  <td>{item.sellingPrice}</td>
                  <td>{item.purchasePrice}</td>
                  <td>
                    {/* <img src={item.images[0]?.imagePath} width="30" height="30" /> */}

                    <Button
                      className="btn btn-sm"
                      onClick={() => {
                        handleImage(item.id, item.images[0]?.imagePath);
                        handleImage1(item);
                      }}>
                      <i className="bi bi-card-image"></i>
                    </Button>{" "}
                  </td>
                  <td>{item.size.join(", ")}</td>
                  <td>{item.color.join(", ")}</td>
                  <td>{item.gender.join(", ")}</td>
                  <td>{item.discount}</td>
                  <td>{item.description}</td>

                  {/* <td>
                        {item.stock?.map((stck, index) => (
                          <div key={index}>
                            <p style={{ color: "blueviolet" }}> sr no {index + 1} :</p>
                            <p>quantity: {stck.quantity} </p>
                            <p>gender: {stck.gender} </p>
                            <p>color :{stck.color} </p>
                            <p>size: {stck.size} </p>

                          </div>
                        ))}
                      </td> */}

                  <td>
                    <Button
                      className="btn btn-sm"
                      onClick={() =>
                        handleEdit(
                          item.id,
                          item.productName,
                          item.priveiwName,
                          item.sellingPrice,
                          item.purchasePrice,
                          item.size,
                          item.color,
                          item.discount,
                          item.gender,
                          item.description
                        )}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>

                    {" "}

                    <Button className="btn btn-sm" onClick={() => handleDelete(item.id, item.productName)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>



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
              <img src={selectedImage} alt="Product" width="100" height="100" />
              <Form.Label>IMAGE:</Form.Label>
              <Form.Control
                type="file" multiple
                onChange={(e) => setSelectedImage(e.target.files)}
              />
            </div>
            <div className="mb-3">
              {/* <Form.Label>Color:</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              /> */}
              <Form.Group>
                <Form.Label>Color : </Form.Label>
                <Form.Select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option hidden>Select Color Name</option>
                  {productdetail &&
                    productdetail.color.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="mb-3">
              {/* <Form.Label>GENDER:</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              /> */}
              <Form.Group>
                <Form.Label>GENDER : </Form.Label>
                <Form.Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
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
            <Button
              type="submit"
              className="my-2 btn btn-primary"
              onClick={handleSubmitImage}
            >
              Submit
            </Button>
          </Modal.Body>
        </Modal>

        {/* modal for edit product */}

        <Modal
          className="modal-right scroll-out-negative"
          show={modal2}
          onHide={() => showModal2(false)}
          scrollable
          dialogClassName="full"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Product Full Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Preview Name</Form.Label>
              <Form.Control
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="text"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="text"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3">
              <Form.Group>
                <Form.Label>gender : </Form.Label>
                <input
                  className="mx-1"
                  value="Men"
                  type="checkbox"
                  onChange={handleGenderChange}
                />
                <span>Men</span>

                <input
                  className="mx-1"
                  value="Women"
                  type="checkbox"
                  onChange={handleGenderChange}
                />
                <span>Women</span>
              </Form.Group>
            </div>

            <Form.Label>color : </Form.Label>

            {colorrr?.getAllColor &&
              colorrr?.getAllColor?.map((colors) => (
                <div key={colors.id} className="d-inline">
                  <input
                    className="mx-1"
                    value={colors?.colorName}
                    type="checkbox"
                    checked={allcolor.includes(colors?.colorName)}
                    onChange={handleColorBox}
                  />
                  <span>{colors?.colorName}</span>{" "}
                </div>
              ))}

            <Form.Group>
              <Form.Label>size : </Form.Label>
              {sizeee?.getAllSize &&
                sizeee?.getAllSize?.map((sizes) => (
                  <div key={sizes.id} className="d-inline">
                    <input
                      className="mx-1"
                      value={sizes?.sizeName}
                      type="checkbox"
                      checked={size.includes(sizes?.sizeName)}
                      onChange={handleSizeChange}
                    />
                    <span> {sizes?.sizeName} </span>
                  </div>
                ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="mt-2"
              onClick={() => ConfirmUpdate()}
            >
              ADD
            </Button>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}

export default ListProduct;
