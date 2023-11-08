import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Card, Col, Row, Button, Form, Table } from "react-bootstrap";

function AddSaleOrder() {
  const initialFormdata = {
    customerName: "",
    customerNo: "",
    paymentMethod: "",
    totalPrice: "",
    date: "",
  };

  const [formdata, setformdata] = useState(initialFormdata);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    console.log(formdata);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmitForm}>
              <h3 className="pt-1">Add Sale Order :</h3>
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={formdata.customerName}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>customer No</Form.Label>
                <Form.Control
                  type="text"
                  name="customerNo"
                  value={formdata.customerNo}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>payment Method</Form.Label>
                <Form.Control
                  type="text"
                  name="paymentMethod"
                  value={formdata.paymentMethod}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formdata.date}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Button className="mt-3" type="submit">
                Create Sale Order
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AddSaleOrder;
