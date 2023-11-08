import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

function RegistrationForm() {
  const phoneRegExp =
    /^(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})$/;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("user Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 chars!")
      .required("Password is required"),
    confirm: Yup.string()
      .min(6, "Must be at least 6 chars!")
      .required("Confirm your Password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    mobileNo: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is required"),
  });
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm: "",
    mobileNo: "",
  };
  // const onSubmit = (values) => console.log('submit form', values);

  const onSubmit = async (values, resetForm) => {
    console.log("values", values);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-2 text-center">
                  <img src="/assets/logo-TRP.jpg" alt="Logo" className="" style={{ width: "100px", height: "auto"}} />
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                        />
                        {errors.username && touched.username && (
                          <div className="text-danger">{errors.username}</div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicmobile">
                        <Form.Label className="text-center">
                          Mobile No
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile No"
                          name="mobileNo"
                          value={values.mobileNo}
                          onChange={handleChange}
                        />
                        {errors.mobileNo && touched.mobileNo && (
                          <div className="text-danger">{errors.mobileNo}</div>
                        )}
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
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword1"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="confirm"
                          value={values.confirm}
                          onChange={handleChange}
                        />
                        {errors.confirm && touched.confirm && (
                          <div className="text-danger">{errors.confirm}</div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign In
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
}

export default RegistrationForm;
