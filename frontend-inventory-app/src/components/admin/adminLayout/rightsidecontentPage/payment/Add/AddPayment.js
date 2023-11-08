import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Card, Col, Row, Button, Form, Table } from "react-bootstrap";
import toast from 'react-hot-toast';



function AddPayment() {


  const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePaymentMethod($paymentMethodName: String) {
    createPaymentMethod(paymentMethodName: $paymentMethodName) {
      id
      paymentMethodName
    }
  }
`;


  const [paymentMethod, setPaymentMethod] = useState("");

  const [createdPayment, setCreatedPayment] = useState("");

  const [createPayment] = useMutation(CREATE_PAYMENT_MUTATION, {
    onCompleted: (data) => {

      toast.success("Created successfully !");

      setCreatedPayment(data.createPaymentMethod);
    },
  });


  async function handleSubmitForm() {
    try {
      const { data } = await createPayment({
        variables: {
          paymentMethodName: paymentMethod,
        },
      });
      console.log(data.createPaymentMethod);

      setPaymentMethod("");
    }
    catch (err) {
      console.error("Error creating payment method:", err);
    } 
  }


  return (
    <div>
      <h2>ADD Payment Method</h2>
      <Row>
        <Col className="col-8 mx-auto my-5">
          <Card className="mb-5">
            <Card.Body>
          <h3 className="pt-1">Payment Method Details:</h3>
              <Form>
                <Form.Group>
                  <Form.Label>Payment Method Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </Form.Group>
      
                <Button variant="success" className="mt-3" onClick={() => handleSubmitForm()}>Create Payment Method</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

   
    </div>
  );
}

export default AddPayment;
