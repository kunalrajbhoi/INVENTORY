import React, { useState } from 'react';
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client"; // Import gql and useMutation
import toast from 'react-hot-toast';

function AddCategory() {


  const [formData, setFormData] = useState("");


  const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategory($categoryName: String!) {
      createCategory(categoryName: $categoryName) {
        categoryName
        id
      }
    }
  `;

 
  
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success("Created successfully !");
    }
  }); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } =
       await createCategory({
        variables: {
          categoryName: formData,
        },
      });

      console.log(data.createCategory);

      setFormData(""); 
      
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  return (
    <Row>
      <Col className="col-8 mx-auto my-5">
        <Card className="mb-5">
          <Card.Body>
            <h1>Create Category</h1>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Form.Label htmlFor="categoryName">Category Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
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
  );
}

export default AddCategory;
