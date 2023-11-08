import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

function Cart() {

  const [quantity, setQuantity] = useState(1); 


  // function for increment

   function increment(){
    setQuantity(quantity + 1);
   };

   // function for decrement

   function decrement(){
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
   };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <h1>Shopping Cart</h1>
                  <h4 className="mt-2"> {quantity} item</h4>
                </div>
                <hr />
                <Table>
                  <thead>
                    <tr>
                      <th>Product Detail</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      <img src="/assets/1.jpg" alt="Product" className="img-fluid" width="100" height="100" />
                      </td>
                      <td>
                        <Button variant="outline-secondary" onClick={decrement}>-</Button>
                        {" "} {quantity} {" "}
                        <Button variant="outline-secondary" onClick={increment}>+</Button>
                      </td>
                      <td>$100</td>
                      <td>${(100 * quantity)}</td>
                    </tr>
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Cart;
