import React, { useState } from "react";
import { Card, Col, Row, Form, Button, Table } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";

function AddSaleOrder() {
  // GET PRODUCT LIST
  const GET_ALL_PRODUCT = gql`
    query Query {
      getAllProducts {
        id
        productName
        discount
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_PRODUCT);

  // GET VENDOR LIST
  const GET_ALL_PAYMENT_METHOD = gql`
    query GetAllPaymentMethod {
      getAllPaymentMethod {
        id
        paymentMethodName
      }
    }
  `;

  const { data: paymentData } = useQuery(GET_ALL_PAYMENT_METHOD);

  const CREATE_SALE_ORDER = gql`mutation CreateSaleOrder($products: [SaleProductInput], $customerName: String, $customerNo: String, $paymentMethod: String, $totalPrice: Float, $date: String) {
    createSaleOrder(products: $products, customerName: $customerName, customerNo: $customerNo, paymentMethod: $paymentMethod, totalPrice: $totalPrice, date: $date) {
      id
    }
  }`;

  const [CreateSaleOrder] = useMutation(CREATE_SALE_ORDER, {
    onCompleted: () => {
      toast.success("Created successfully !");
    },
  });

  const [productsId, setProductsId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); //cal of total prc
  const [products, setProducts] = useState([]);

  const initialproductForm = {
    salePrice: "",
    qty: "",
  
  };

  const [productForm, setproductForm] = useState(initialproductForm);

  const handleproductFormChange = (e) => {
    const { name, value } = e.target;
    setproductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const initialFormData = {
    customerName: "",
    customerNo: "",
    paymentMethod: "",
    date: "",
  };

  const [formdata, setformdata] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformdata((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingProduct = products.find(
      (product) => product.productId === productsId
    );

    if (existingProduct) {
      existingProduct.qty = existingProduct.qty + parseInt(productForm.qty, 10);
      existingProduct.salePrice = parseFloat(productForm.salePrice);

      const productPrice = existingProduct.qty * existingProduct.salePrice;
      setTotalPrice(totalPrice + productPrice);
    } else {
      const selectedProduct = data?.getAllProducts?.find(
        (product) => product.id === productsId
      );

      if (selectedProduct) {
        const newProduct = {
          discount: selectedProduct.discount,
          productId: productsId,
          productName: selectedProduct.productName,
          qty: parseInt(productForm.qty, 10),
          salePrice: parseFloat(productForm.salePrice),
        };

        //total price calculation start
        const productPrice = newProduct.qty * newProduct.salePrice;
        setTotalPrice(totalPrice + productPrice);

        //total price calculation start

        setProducts([...products, newProduct]);
      }
    }
    console.log("Product Form Data:", productForm);
  };

  async function handleSubmitForm(e) {
    e.preventDefault();

    const productData = products.map(({ productName, ...rest }) => rest);
    try {
      await CreateSaleOrder({
        variables: {
          ...formdata,
          products: productData,
          totalPrice: parseFloat(totalPrice),
        },
      });

      console.log("productData", productData);

    } catch (error) {
      console.error("Error CreateSaleOrder:", error);
    }
  }

  return (
    <div>
      <h2>Add Sale Order</h2>
      <Row>
        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h3 className="pt-1">Products :</h3>

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
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    value={productForm.qty}
                    name="qty"
                    onChange={handleproductFormChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>sale Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="salePrice"
                    value={productForm.salePrice}
                    onChange={handleproductFormChange}
                  />
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
              <Form onSubmit={handleSubmitForm}>
                <h3 className="pt-1">DETAILS :</h3>
                <Form.Group>
                  
                  <Form.Label>payment Method</Form.Label>
                  <Form.Select
                    as="select"
                    name="paymentMethod"
                    value={formdata.paymentMethod}
                    onChange={handleChange}
                  >
                    <option hidden>Select payment Method</option>
                    {paymentData &&
                      paymentData.getAllPaymentMethod.map((paymentmethod) => (
                        <option key={paymentmethod.id} value={paymentmethod.id}>
                          {paymentmethod.paymentMethodName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formdata.customerName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Customer No</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerNo"
                    value={formdata.customerNo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={totalPrice}
                    // onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formdata.date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button className="mt-3" type="submit">
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
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>{item.qty}</td>
              <td>{item.qty * item.salePrice}</td>
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

export default AddSaleOrder;
