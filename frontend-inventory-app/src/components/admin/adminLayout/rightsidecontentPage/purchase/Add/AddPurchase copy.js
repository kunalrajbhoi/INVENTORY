import React, { useState } from "react";
import { Card, Col, Row, Form, Button, Table } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

function AddPurchase() {
  // GET PRODUCT LIST
  const GET_ALL_PRODUCT = gql`
    query GetAllProducts {
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
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_PRODUCT);

  if (data) {
    console.log("data", data.getAllProducts);
  }
  // GET VENDOR LIST
  const GET_ALL_VANDOR = gql`
    query GetAllVandor {
      getAllVandor {
        id
        vandorName
        companyName
        balance
      }
    }
  `;

  const { data: vendorData } = useQuery(GET_ALL_VANDOR);

  const CREATE_PURCHASE_ORDER = gql`
    mutation CreatePurchaseOrder(
      $products: [PurchaseProductInput]
      $vandor: ID
      $totalPrice: Float
      $date: String
    ) {
      createPurchaseOrder(
        products: $products
        vandor: $vandor
        totalPrice: $totalPrice
        date: $date
      ) {
        id
      }
    }
  `;

  const [createPurchaseOrder, { data: showData }] = useMutation(
    CREATE_PURCHASE_ORDER,
    {
      onCompleted: () => {
        toast.success("Created Successfully");
      },
    }
  );

  if (showData) {
    console.log("showData", showData);
  }

  const [vendor, setVendor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); //cal of total prc
  const [date, setDate] = useState("");

  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [productsId, setProductsId] = useState("");
  const [gender, setGender] = useState("");
  const [allcolor, setAllcolor] = useState("");
  const [size, setSize] = useState("");

  const [products, setProducts] = useState([]);

  //checkbox for color

  // function handleColorBox(e) {
  //   if (e.target.checked) {
  //     setAllcolor([...allcolor, e.target.value]);
  //   }
  //   else {
  //     setAllcolor(allcolor.filter((item) => item !== e.target.value));
  //   }
  // }

  const GET_ALL_COLOUR = gql`
    query GetAllColor {
      getAllColor {
        id
        colorName
      }
    }
  `;

  const { data: color } = useQuery(GET_ALL_COLOUR);

  //checkbox for GENDER

  // function handleGenderChange(e) {
  //   if (e.target.checked) {
  //     setGender([...gender, e.target.value]);
  //   }
  //   else {
  //     setGender(gender.filter((item) => item !== e.target.value));
  //   }
  // }

  //checkbox for size

  // function handleSizeChange(e) {
  //   if (e.target.checked) {
  //     setSize([...size, e.target.value]);
  //   }
  //   else {
  //     setSize(size.filter((item) => item !== e.target.value));
  //   }
  // }

  const GET_ALL_SIZE = gql`
    query GetAllSize {
      getAllSize {
        id
        sizeName
      }
    }
  `;

  const { data: Size } = useQuery(GET_ALL_SIZE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProduct = data.getAllProducts.find(
      (product) => product.id === productsId
    );

    if (selectedProduct) {
      const newProduct = {
        quantity: parseInt(quantity, 10),
        puchasePrice: parseFloat(purchasePrice),
        productId: productsId,
        productName: selectedProduct.productName,
        size: size,
        gender: gender,
        color: allcolor,
      };

      // "products": [
      //   {
      //     "quantity": 1,
      //     "size": "M",
      //     "puchasePrice": 55,
      //     "productId": "652a9420a2579fd600d95ca7",
      //     "gender": "Men",
      //     "color": "red"
      //   }
      // ],
      // "vandor": "65251bd2bdc21a9e59ab78cf",
      // "totalPrice": 500,
      // "date": "5"

      //total price calculation start
      const productPrice = newProduct.quantity * newProduct.puchasePrice;

      setTotalPrice(totalPrice + productPrice);

      //total price calculation start

      setProducts([...products, newProduct]);
    }
  };

  async function handleSubmitForm() {
    try {
      const productData = products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        puchasePrice: product.puchasePrice,
        size: product.size,
        gender: product.gender,
        color: product.color,
      }));

      const { data } = await createPurchaseOrder({
        variables: {
          products: productData,
          vandor: vendor,
          totalPrice: parseFloat(totalPrice),
          date: date,
        },
      });

      // console.log("date",date);

      setVendor("");
      setTotalPrice(0);
      setDate("");
      setQuantity("");
      setPurchasePrice("");
      setProductsId("");
      setProducts([]);

      console.log("FORM DATA:", data);
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  }

  return (
    <div>
      <h2>ADD Purchase</h2>
      <Row>
        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h3 className="pt-1">Products :</h3>

                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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

                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Select
                    as="select"
                    value={productsId}
                    onChange={(e) => setProductsId(e.target.value)}
                  >
                    <option hidden>Select Product Name</option>
                    {data &&
                      data.getAllProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>GENDER :</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option hidden>Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>SIZE :</Form.Label>
                  <Form.Select
                    as="select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option hidden>Select size</option>

                    {Size?.getAllSize &&
                      Size?.getAllSize?.map((item) => (
                        <option key={item.id}>{item.sizeName}</option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>COLOR :</Form.Label>
                  <Form.Select
                    as="select"
                    value={allcolor}
                    onChange={(e) => setAllcolor(e.target.value)}
                  >
                    <option hidden>Select color</option>

                    {color?.getAllColor &&
                      color?.getAllColor?.map((item) => (
                        <option key={item.id}>{item.colorName}</option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit" className="mt-3">
                  Add
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Form>
                <h3 className="pt-1">DETAILS :</h3>
                <Form.Group>
                  <Form.Label>Vendor</Form.Label>
                  <Form.Select
                    as="select"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  >
                    <option hidden>Select Vendor Name</option>
                    {vendorData &&
                      vendorData.getAllVandor.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.vandorName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control type="text" value={totalPrice} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>

                <Button className="mt-3" onClick={() => handleSubmitForm()}>
                  Submit Form
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table to display products */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>SR NO</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.puchasePrice}</td>
              <td>{item.quantity * item.puchasePrice}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{totalPrice}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default AddPurchase;
