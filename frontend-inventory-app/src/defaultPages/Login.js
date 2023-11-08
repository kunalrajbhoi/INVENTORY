import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { gql, useMutation, useQuery } from "@apollo/client";

const Login = () => {
  const initialFormData = {
    // username: "admin@gmail.com",
    // password: "admin",
    username: "rohannath002@gmail.com",
    password: "123456",

  };

  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

  const LOGIN_STORE = gql`
    mutation LoginStore($email: String!, $password: String!) {
      loginStore(email: $email, password: $password) {
        token
      }
    }
  `;

  const [userLogin, {data}] = useMutation(LOGIN_STORE, {
    onCompleted: async () => {
      localStorage.setItem('token', data?.loginStore?.token);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
      
    },
    onError: (err) => {
      console.log("ERROR",  err);
    }
  });

  if(data){
    console.log("Token: ", data?.loginStore?.token);
  }

  useEffect(() => {
    localStorage.setItem('token', data?.loginStore?.token);
  }, [data]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin({
      variables: {  
        email: formData.username,
        password: formData.password
      }
    })
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                <img src="/assets/logo-TRP.jpg" alt="Logo" className="" style={{ width: "100px", height: "auto"}} />
                  <p className=" mb-5 mt-3">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#/!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?
                        <Link to="/register" className="text-primary fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
