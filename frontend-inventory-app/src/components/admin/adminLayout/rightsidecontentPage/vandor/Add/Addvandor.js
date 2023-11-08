import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";

function Addvandor() {


  const [vandorname, setVandorname] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [balance, setBalance] = useState("");


  const CREATE_ADDVANDOR_MUTATION = gql`mutation CreateVandor($vandorName: String, $companyName: String, $balance: Float) {
    createVandor(vandorName: $vandorName, companyName: $companyName, balance: $balance) {
      vandorName
      id
      companyName
      balance
    }
  }`;


  const [createvandor] = useMutation(CREATE_ADDVANDOR_MUTATION, {
    onCompleted: () => {
      toast.success("Created Successfully");


    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const { data } = await createvandor({
        variables: {
          vandorName: vandorname,
          companyName: companyname,
          balance: parseFloat(balance),
        },
      });

      console.log(data);

      setVandorname("");
      setCompanyname("");
      setBalance("");



    }

    catch (err) {
      console.log(err);
    }

  }


  return (
    <>
      <Row>
        <Col className="col-8 mx-auto my-5">
          <Card className="mb-5">
            <Card.Body>
              <h1>create vandor</h1>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label >  vandor name : </Form.Label>

                  <Form.Control
                    type="text"
                    name="vandorname"
                    value={vandorname}
                    onChange={(e) => setVandorname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label >  company name : </Form.Label>

                  <Form.Control
                    type="text"
                    name="companyname"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label >  balance : </Form.Label>

                  <Form.Control
                    type="number"
                    name="balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
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
  )
}

export default Addvandor;
