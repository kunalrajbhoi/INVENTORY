import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import toast from "react-hot-toast";



function Addsize() {

  const [size, setSize] = useState("");




  const CREATE_SIZE_MUTATION = gql`mutation CreateSize($sizeName: String) {
  createSize(sizeName: $sizeName) {
    sizeName
    id
  }
}`;

  const [createSize] = useMutation(CREATE_SIZE_MUTATION, {
    onCompleted: () => {
      toast.success("Created Successfully");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createSize({
        variables: {
          sizeName: size
        },
      });

      setSize("");
      console.log(data.createSize);

    }
    catch (err) {
      console.error(err);
    }
  };



  return (
    <>
      <Row>
        <Col className="col-8 mx-auto my-5">
          <Card className="mb-5">
            <Card.Body>
              <h1>create size</h1>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label >
                    Size :
                  </Form.Label>

                  <Form.Control
                    type="text"

                    name="categoryName"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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

export default Addsize;
