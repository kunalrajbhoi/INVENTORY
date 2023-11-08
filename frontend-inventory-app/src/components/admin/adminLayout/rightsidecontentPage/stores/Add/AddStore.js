import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";

function AddStore() {


  const CREATE_ADDSTORE_MUTATION = gql`mutation RegisterStore($storeName: String!, $storeKeeper: String!, $email: String!, $password: String!, $mobileNo: String) {
    registerStore(storeName: $storeName, storeKeeper: $storeKeeper, email: $email, password: $password, mobileNo: $mobileNo) {
      token
      store {
        id
        storeName
        storeKeeper
        email
        mobileNo
        role
      }
    }
  }`;



  const [storename, setStorename] = useState("");
  const [storeKeeper, setStoreKeeper] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileno, setMobileno] = useState("");



  const [createStore] = useMutation(CREATE_ADDSTORE_MUTATION, {
    onCompleted: () => {
      toast.success("Created Successfully");
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createStore({
        variables: {
          storeName: storename,
          storeKeeper: storeKeeper,
          email: email,
          password: password,
          mobileNo: mobileno,
        },
      });

      console.log(data);
      
      setStorename("");
      setStoreKeeper("");
      setEmail("");
      setPassword("");
      setMobileno("");



    }

    catch (err) {
      console.log(err);
    }
  };




  return (
    <>
      <Row>
        <Col className="col-8 mx-auto my-5">
          <Card className="mb-5">
            <Card.Body>
              <h1>create store</h1>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label>store Name :</Form.Label>
                  <Form.Control
                    type="text"
                    name="storeName"
                    value={storename}
                    onChange={(e) => setStorename(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>storeKeeper :</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={storeKeeper}
                    onChange={(e) => setStoreKeeper(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label >Email :</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label >password :</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label >mobile No :</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobileno"
                    value={mobileno}
                    onChange={(e) => setMobileno(e.target.value)}
                  />
                </div>
                <Button variant="success" className="my-3" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddStore;
