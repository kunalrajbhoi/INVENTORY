import { gql, useMutation } from '@apollo/client'
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import { useState } from 'react';
import toast from "react-hot-toast";

function AddGender() {

  const [gender , setGender] = useState("");

  const CREATE_GENDER_MUTATION = gql`mutation Mutation($genderName: String) {
  createGender(genderName: $genderName) {
    id
    genderName
  }
}`;

  const [createGender] = useMutation(CREATE_GENDER_MUTATION, {
    onCompleted: () => {
      toast.success("Created successfully !");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createGender({
        variables: {
          genderName: gender
        }
      });

      console.log(data.createGender);

      setGender("");
    }
    catch (err) {
      console.error(err);
    }
  }
  


  return (
    <div>
      <Row>
        <Col className="col-8 mx-auto my-5">
          <Card className="mb-5">
            <Card.Body>
              <h1>Create gender</h1>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label htmlFor="colorName">gender:</Form.Label>
                  <Form.Control
                    type="text"
                    id="colorName"
                    name="colorName"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
    </div>
  )
}

export default AddGender
