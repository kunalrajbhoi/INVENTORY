import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";

function ListPayment() {
  const [modal, showModal] = useState(false);
  const [paymentName, setPaymentName] = useState("");
  const [paymentId, setPaymentId] = useState("");

  const GET_ALL_CATEGORY = gql`
    query GetAllPaymentMethod {
      getAllPaymentMethod {
        id
        paymentMethodName
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_CATEGORY);

  //update payment

  const EDIT_PAYMENT = gql`
    mutation UpdatePaymentMethod(
      $updatePaymentMethodId: ID
      $paymentMethodName: String
    ) {
      updatePaymentMethod(
        id: $updatePaymentMethodId
        paymentMethodName: $paymentMethodName
      ) {
        id
        paymentMethodName
      }
    }
  `;

  const [EditData] = useMutation(EDIT_PAYMENT);

  function handleEdit(id, name) {
    showModal(true);
    setPaymentId(id);
    setPaymentName(name);
  }

  const handleSubmit = async () => {
    await EditData({
      variables: {
        updatePaymentMethodId: paymentId,
        paymentMethodName: paymentName,
      },
    });
    showModal(false);
    setPaymentName("");
  };

  // function for delete payment

  const DELETE_PAYMENT = gql`
    mutation DeletePaymentMethod($deletePaymentMethodId: ID!) {
      deletePaymentMethod(id: $deletePaymentMethodId) {
        id
        paymentMethodName
      }
    }
  `;

  const [DeletePayment] = useMutation(DELETE_PAYMENT, {
    onCompleted: () => {
      refetch();
    },
  });

  async function handleDelete(id, name) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${name}"`
    );
    if (shouldDelete) {
      await DeletePayment({
        variables: {
          deletePaymentMethodId: id,
        },
      });
    }
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Row>
        <Col className="mx-auto my-5">
          <Card>
            <Card.Body>
              <h2>Table of color</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">paymentMethodName</th>
                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {data &&
                    data.getAllPaymentMethod.map((item, index) => (
                      <tr className="border" key={item.id}>
                        <td className="border">{index + 1}</td>
                        <td className="border">{item.paymentMethodName}</td>
                        <td className="border">
                          <Button
                            className="btn btn-sm"
                            onClick={() =>
                              handleEdit(item.id, item.paymentMethodName)
                            }
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                        </td>
                        <td className="border">
                          <Button
                            className="btn btn-sm"
                            onClick={() =>
                              handleDelete(item.id, item.paymentMethodName)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
              <Modal.Title as="h5">Update PAYMENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>payment Name</h5>
              <Form.Control
                type="text"
                name="paymentName"
                value={paymentName}
                onChange={(e) => setPaymentName(e.target.value)}
              />
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
    </div>
  );
}

export default ListPayment;
