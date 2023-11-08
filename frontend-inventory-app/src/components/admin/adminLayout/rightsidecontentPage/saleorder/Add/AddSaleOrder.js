import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Card, Col, Row, Form, Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";

function AddSaleOrder() {
  const GET_ALL_PRODUCT = gql`query GetAllProducts {
    getAllProducts {
      id
      productName
      color
      gender
      size
      sellingPrice
      discount
      stock {
        color
        gender
        quantity
        size
      }
    }
  }`;

  const { data, refetch } = useQuery(GET_ALL_PRODUCT);

  const GET_ALL_PAYMENT_METHOD = gql`
    query GetAllPaymentMethod {
      getAllPaymentMethod {
        id
        paymentMethodName
      }
    }
  `;

  const { data: paymentData } = useQuery(GET_ALL_PAYMENT_METHOD);

  const CREATE_SALE_ORDER = gql`
    mutation CreateSaleOrder(
      $products: [SaleProductInput]
      $customerName: String
      $customerNo: String
      $paymentMethod: String
      $totalPrice: Float
      $date: String
    ) {
      createSaleOrder(
        products: $products
        customerName: $customerName
        customerNo: $customerNo
        paymentMethod: $paymentMethod
        totalPrice: $totalPrice
        date: $date
      ) {
        id
        products {
          id
          productId {
            productName
            id
          }
          color
          discount
          gender
          qty
          salePrice
          size
        }
        customerName
        customerNo
        totalPrice
        paymentMethod
        date
      }
    }
  `;

  const [CreateSaleOrder] = useMutation(CREATE_SALE_ORDER, {
    onCompleted: () => {
      toast.success("Created successfully !");
    },
  });

  const [productData, setProductData] = useState([]);

  const [qty, setQuantity] = useState("");

  const [allcolor, setAllcolor] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState("");

  const [productsId, setProductsId] = useState("");
  const [productdetail, setProductdetail] = useState(null);
  const [discount, setdiscount] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const handleProduct = (e) => {
    const { name, value } = e.target;

    setProductsId(value);

    const product1 = data.getAllProducts.find((prod) => prod.id === value);

    setProductdetail(product1);
    setdiscount(product1.discount);
    setSalePrice(product1.sellingPrice);

    console.log("pppppp", product1);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const existingProduct = productData.find((product) => 
    product.productId === productsId &&
    product.color === allcolor &&
    product.gender === gender &&
    product.size === size
    );

    if (existingProduct) {
      existingProduct.qty = existingProduct.qty + parseInt(qty, 10);
      const preQuant = parseInt(qty, 10);

      existingProduct.salePrice = parseFloat(salePrice);
      existingProduct.discount = parseFloat(discount);

      const proDis = existingProduct.salePrice * (existingProduct.discount / 100);
      
      // console.log("kkkkkkkkkkkkk",proDis);

      const productPrice = preQuant * (existingProduct.salePrice - proDis);

      console.log("productPrice", productPrice);
      console.log("totalPrice", totalPrice);

      setTotalPrice(totalPrice + productPrice);
    } else {
      const selectedProduct = data?.getAllProducts?.find(
        (product) => product.id === productsId
      );

      if (selectedProduct) {

        const stockItem = selectedProduct.stock.find((stck) => 
        stck.color === allcolor && stck.size === size && stck.gender === gender)

        // if(stockItem){
        //   console.log("stockItem",stockItem);
        // }

        if(stockItem){
          const newProduct = {
            productId: productsId,
            productName: selectedProduct.productName,
            qty: parseInt(qty, 10),
            salePrice: parseFloat(salePrice),
            color: allcolor,
            gender: gender,
            size: size,
            discount: parseFloat(discount),
          };
  
          const prodis = newProduct.salePrice * (newProduct.discount / 100);

          console.log("oooooooooooooooo",prodis);
          
          //total price calculation start
          const productPrice = newProduct.qty * (newProduct.salePrice - prodis);
          setTotalPrice(totalPrice + productPrice);
  
          console.log("Added new product:", newProduct);
  
          setProductData([...productData, newProduct]);
          console.log("stockItem",stockItem);
        }
        else{
          toast.error("Error product not available");
        }
       
      }
    }
  };

  async function handleSubmitForm(e) {
    e.preventDefault();

    try {
      const productsData = productData.map((product) => ({
        productId: product.productId,
        qty: product.qty,
        size: product.size,
        gender: product.gender,
        color: product.color,
        salePrice: product.salePrice,
        discount: product.discount,
      }));

      const { data } = await CreateSaleOrder({
        variables: {
          products: productsData,
          customerName,
          customerNo,
          paymentMethod,
          totalPrice: parseFloat(totalPrice),
          date,
        },
      });

      console.log("productData", productData);
    } catch (err) {
      console.error("Error CreateSaleOrder:", err);
    }
  }

  return (
    <div>
      <h2>Add sale order</h2>
      <Row>
        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Form>
                <h5 className="pt-1">Products :</h5>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Select
                    as="select"
                    value={productsId}
                    onChange={handleProduct}
                  >
                    <option hidden>Select Product Name</option>
                    {data &&
                      data.getAllProducts?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.productName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    value={qty}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Sale Price</Form.Label>
                  <Form.Control type="text" value={salePrice} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Discount :</Form.Label>
                  <Form.Control value={discount} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>COLOR :</Form.Label>
                  <Form.Select
                    as="select"
                    value={allcolor}
                    onChange={(e) => setAllcolor(e.target.value)}
                  >
                    <option hidden>Select color</option>

                    {productdetail &&
                      productdetail.color?.map((color, index) => (
                        <option key={index}>{color}</option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>gender :</Form.Label>
                  <Form.Select
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option hidden>Select gender</option>

                    {productdetail &&
                      productdetail.gender?.map((gender, index) => (
                        <option key={index}>{gender}</option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>size :</Form.Label>
                  <Form.Select
                    as="select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option hidden>Select size</option>
                    {productdetail &&
                      productdetail.size?.map((size, index) => (
                        <option key={index}>{size}</option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="success"
                  type="button"
                  onClick={handleAddProduct}
                  className="mt-3"
                >
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
                  <Form.Label>payment Method</Form.Label>
                  <Form.Select
                    as="select"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Customer No</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerNo}
                    onChange={(e) => setCustomerNo(e.target.value)}
                  />
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

                <Button
                  variant="success"
                  type="submit"
                  onClick={handleSubmitForm}
                  className="mt-3"
                >
                  Submit
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
            <th>Product</th>
            <th>Quantity</th>
            <th>sale Price</th>
            <th>discount</th>
            <th>totalPrice</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.productName}</td>
              <td>{item.qty}</td>
              <td>{item.salePrice}</td>
              <td>{item.discount}</td>
              <td>{item.qty * (item.salePrice - (item.salePrice * (item.discount / 100)))}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="5">Total</td>
            <td>{totalPrice}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default AddSaleOrder;
