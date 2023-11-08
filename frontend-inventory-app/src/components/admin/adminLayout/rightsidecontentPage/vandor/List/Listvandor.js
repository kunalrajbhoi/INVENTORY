import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";

function Listvandor() {

  const [modal, showModal] = useState(false);
  const [vandorId, setVandorId] = useState('');
  const [vandorName, setVandorName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [balance, setBalance] = useState("");



  const GET_ALL_VANDOR = gql`
    query GetAllVandor {
      getAllVandor {
        id
        vandorName
        companyName
        balance
      }
    }
  `;

  const { data, refetch } = useQuery(GET_ALL_VANDOR);


  //------------------------------------------------------
  // --------------function for handle EDIT start---------
  //------------------------------------------------------

  const EDIT_VANDOR = gql`mutation UpdateVandor($updateVandorId: ID, $vandorName: String, $companyName: String, $balance: Float) {
    updateVandor(id: $updateVandorId, vandorName: $vandorName, companyName: $companyName, balance: $balance) {
      id
      vandorName
      companyName
      balance
    }
  }`;



  const [EditData] = useMutation(EDIT_VANDOR);



  function handleEdit(id) {
    showModal(true);
    setVandorId(id);
  }


  const handleSubmit = async () => {
    await EditData({
      variables: {
        updateVandorId: vandorId,
        vandorName: vandorName,
        companyName: companyName,
        balance: parseFloat(balance)
      }
    });
    showModal(false);
    setVandorName("");
    setCompanyName("");
    setBalance("");
  }

  //------------------------------------------------------
  // --------------function for handle EDIT END---------
  //------------------------------------------------------

  //------------------------------------------------------
  // --------------function for handle DELETE start---------
  //------------------------------------------------------


  const DELETE_VANDOR = gql`mutation DeleteVandor($deleteVandorId: ID!) {
    deleteVandor(id: $deleteVandorId) {
      id
      vandorName
      companyName
      balance
    }
  }`;


  const [DeleteVandor] = useMutation(DELETE_VANDOR, {
    onCompleted: () => {
      refetch();
    }
  });


  async function handleDelete(id) {
    const shouldDelete = window.confirm(`Are you sure you want to delete`);
    if (shouldDelete) {
      await DeleteVandor({
        variables:
        {
          deleteVandorId: id
        }
      });
    }
  }


  //------------------------------------------------------
  // --------------function for handle DELETE END---------
  //------------------------------------------------------



  useEffect(() => {
    refetch();
  });

  return (
    <div>
      <Row>
        <Col className="mx-auto my-5">
          <Card>
            <Card.Body>

              <h2>Table of vandor</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">vandor Name</th>
                    <th className="border">company Name</th>
                    <th className="border">balance</th>
                    <th className="border">action</th>
                  </tr>
                </thead>

                <tbody className="table-body">

                  {data && data.getAllVandor.map((item, index) => (
                    <tr className="border" key={item.id}>
                      <td className="border"> {index + 1} </td>
                      <td className="border"> {item.vandorName} </td>
                      <td className="border"> {item.companyName} </td>
                      <td className="border"> {item.balance} </td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => handleEdit(item.id)} >
                          <i className="bi bi-pencil-square"></i>
                        </Button> {" "}
                        <Button className="btn btn-sm" onClick={() => handleDelete(item.id)} >
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
              <Modal.Title as="h5">Update vandor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
              <Form.Label >  vandor name : </Form.Label>

              <Form.Control
                type="text"
                name="vandorname"
                value={vandorName}
                onChange={(e) => setVandorName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label >  company name : </Form.Label>

              <Form.Control
                type="text"
                name="companyname"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
            <Button type='submit' className='my-2 btn btn-primary' onClick={handleSubmit}>Submit</Button>
          </Modal.Body>
        </Modal>

      </Col>
    </Row>
    </div >
  )
}

export default Listvandor;
