import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";
import toast from 'react-hot-toast';


function ListGender() {

  const [modal, showModal] = useState(false);
  const [genderName, setGenderName] = useState('');
  const [genderId, setGenderId] = useState('');



  const GET_ALL_GENDER = gql`query GetAllGender {
    getAllGender {
      id
      genderName
    }
  }`;

  const { data, refetch } = useQuery(GET_ALL_GENDER);

  //function for handle edit

  const EDIT_GENDER = gql`mutation UpdateGender($updateGenderId: ID, $genderName: String) {
    updateGender(id: $updateGenderId, genderName: $genderName) {
      id
      genderName
    }
  }`;

  const [EditData] = useMutation(EDIT_GENDER);

  function handleEdit(id, name) {
     showModal(true);
     setGenderId(id);
     setGenderName(name);

     console.log(id);
     console.log(name);

     
  }


  async function handleSubmit() {
await EditData({
  variables: {
    updateGenderId: genderId,
    genderName: genderName
  }
});

showModal(false);
setGenderName("");
  }

 // handle delete
 
 const DELETE_GENDER = gql`mutation DeleteGender($deleteGenderId: ID!) {
  deleteGender(id: $deleteGenderId) {
    id
    genderName
  }
}`;

const [DeleteGender] = useMutation(DELETE_GENDER, {
  onCompleted: () => {
    toast.success("Delete successfully");
    refetch();
  }
});


async function handleDelete(id, name) {
  const shouldDelete = window.confirm(`Are you sure you want to delete "${name}"`);
  if(shouldDelete) {
    await DeleteGender({
      variables: {
        deleteGenderId: id
      }
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

              <h2>Table of gender</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">gender</th>
                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data?.getAllGender?.map((item, index) => (
                    <tr className="border" key={item.id}>
                      <td className="border"> {index + 1} </td>
                      <td className="border"> {item.genderName} </td>
                      <td className="border"> <Button onClick={() => handleEdit(item.id, item.genderName)}> <i className="bi bi-pencil-square"></i> </Button> </td>
                      <td className="border"> <Button onClick={() => handleDelete(item.id, item.genderName)}> <i className="bi bi-trash"></i> </Button> </td>
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
              <Modal.Title as="h5">Update gender</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>gender Name</h5>
              <Form.Control type="text" value={genderName} onChange={(e) => setGenderName(e.target.value)} />
              <Button type='submit' className='my-2 btn btn-primary' onClick={handleSubmit} >Submit</Button>
            </Modal.Body>
          </Modal>


        </Col>
      </Row>
    </div>
  )
}

export default ListGender
