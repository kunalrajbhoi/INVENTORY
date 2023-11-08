import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Row, Button, Table, Modal, Form } from "react-bootstrap";

function ListStores() {
  const [modal, showModal] = useState(false);
  const [storeId, setStoreID] = useState("");
  const [storename, setStorename] = useState("");
  const [storeKeeper, setStoreKeeper] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileno, setMobileno] = useState("");

  const GET_ALL_STORE = gql`
    query GetAllStore {
      getAllStore {
        id
        storeName
        storeKeeper
        email
        mobileNo
        role
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_STORE);

  //------------------------------------------------------
  // --------------function for handle EDIT start---------
  //------------------------------------------------------

  const EDIT_STORE = gql`
    mutation UpdateStore(
      $updateStoreId: ID!
      $storeName: String
      $storeKeeper: String
      $email: String
      $mobileNo: String
      $password: String
      $role: [String]
    ) {
      updateStore(
        id: $updateStoreId
        storeName: $storeName
        storeKeeper: $storeKeeper
        email: $email
        mobileNo: $mobileNo
        password: $password
        role: $role
      ) {
        storeName
        storeKeeper
        role
        mobileNo
        id
        email
      }
    }
  `;

  const [EditData] = useMutation(EDIT_STORE);

  function handleEdit(id) {
    showModal(true);
    setStoreID(id);
  }

  const handleSubmit = async () => {
    await EditData({
      variables: {
        updateStoreId: storeId,
        storeName: storename,
        storeKeeper: storeKeeper,
        email: email,
        mobileNo: mobileno,
        password: password,
        role: "store",
      },
    });
    showModal(false);
  };

  //------------------------------------------------------
  // --------------function for handle EDIT END---------
  //------------------------------------------------------

  //------------------------------------------------------
  // --------------function for handle DELETE start---------
  //------------------------------------------------------

  const DELETE_STORE = gql`
    mutation DeleteStore($deleteStoreId: ID!) {
      deleteStore(id: $deleteStoreId) {
        id
        storeName
        storeKeeper
        email
        mobileNo
        role
      }
    }
  `;

  const [DeleteStore] = useMutation(DELETE_STORE, {
    onCompleted: () => {
      refetch();
    },
  });

  async function handleDelete(id, name) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${name}" `
    );
    if (shouldDelete) {
      await DeleteStore({
        variables: {
          deleteStoreId: id,
        },
      });
    }
  }

  //------------------------------------------------------
  // --------------function for handle DELETE END---------
  //------------------------------------------------------

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Row className="mx-auto my-5">
      <Col>
        <Card>
          <Card.Body>
            <h2>Table of Store List</h2>
            <Table bordered hover responsive className="mt-2">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Store Name</th>
                  <th>store Keeper</th>
                  <th>email</th>
                  <th>mobileNo</th>
                  <th>role</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.getAllStore.map((item, index) => (
                    <tr key={item.id}>
                      <td> {index + 1} </td>
                      <td> {item.storeName} </td>
                      <td> {item.storeKeeper} </td>
                      <td> {item.email} </td>
                      <td> {item.mobileNo} </td>
                      <td> {item.role} </td>

                      <td>
                        <Button
                          className="btn btn-sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>{" "}
                        <Button
                          className="btn btn-sm"
                          onClick={() => handleDelete(item.id, item.storeName)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal
          className="modal-right scroll-out-negative"
          show={modal}
          onHide={() => showModal(false)}
          scrollable
          dialogClassName="full"
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5">Update Size</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label>password :</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label>mobile No :</Form.Label>
              <Form.Control
                type="text"
                name="mobileno"
                value={mobileno}
                onChange={(e) => setMobileno(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="my-2 btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}

export default ListStores;
