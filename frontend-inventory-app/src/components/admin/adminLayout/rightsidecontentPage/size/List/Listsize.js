import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";

function Listsize() {

  const [modal, showModal] = useState(false);
  const [sizeName, setSizeName] = useState('');
  const [sizeId, setSizeId] = useState('');


  const GET_ALL_SIZE = gql`query GetAllSize {
    getAllSize {
      id
      sizeName
    }
  }`;

  const { data, refetch } = useQuery(GET_ALL_SIZE);


  //------------------------------------------------------
  // --------------function for handle EDIT start---------
  //------------------------------------------------------


  const EDIT_SIZE = gql`mutation UpdateSize($updateSizeId: ID, $sizeName: String) {
    updateSize(id: $updateSizeId, sizeName: $sizeName) {
      id
      sizeName
    }
  }`;


  const [EditData] = useMutation(EDIT_SIZE);

  function hadleEdit(id,name) {
    showModal(true);
    // console.log(id);
    setSizeId(id);
    setSizeName(name);
  }


  const handleSubmit = async () => {
    await EditData({
      variables: {
        updateSizeId: sizeId,
        sizeName: sizeName
      }
    });
    showModal(false);
    setSizeName("");
  }


  //------------------------------------------------------
  // --------------function for handle EDIT END---------
  //------------------------------------------------------


  //------------------------------------------------------
  // --------------function for handle DELETE start---------
  //------------------------------------------------------

  const DELETE_SIZE = gql`mutation DeleteSize($deleteSizeId: ID!) {
    deleteSize(id: $deleteSizeId) {
      id
      sizeName
    }
  }`;


  const [DeleteSize] = useMutation(DELETE_SIZE, {
    onCompleted: () => {
      refetch();
    }
  });




  async function handleDelete(id, name) {
    const shouldDelete = window.confirm(`Are you sure you want to delete "${name}"`);
    if (shouldDelete) {
      await DeleteSize({
        variables: {
          deleteSizeId: id
        }
      });
    }
  }


  //------------------------------------------------------
  // --------------function for handle DELETE END---------
  //------------------------------------------------------



  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <>
      <Row>
        <Col className="mx-auto my-5">
          <Card>
            <Card.Body>

              <h2>Table of size</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">size</th>
                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {data && data.getAllSize.map((item, index) => (
                    <tr className="border" key={item.id}>
                      <td className="border">{index + 1}</td>
                      <td className="border">{item.sizeName}</td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => hadleEdit(item.id,item.sizeName )}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => handleDelete(item.id, item.sizeName)} >
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
              <Modal.Title as="h5">Update Size</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Size Name</h5>
              <Form.Control type="text" name="sizeName" value={sizeName}
                onChange={(e) => setSizeName(e.target.value)} />
              <Button type='submit' className='my-2 btn btn-primary' onClick={handleSubmit}  >Submit</Button>
            </Modal.Body>
          </Modal>


        </Col>
      </Row>
    </>
  );
}

export default Listsize;
