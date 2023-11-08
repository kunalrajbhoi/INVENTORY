import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";

function Listcolor() {

  const [modal, showModal] = useState(false);
  const [colorName, setColorName] = useState('');
  const [colorId, setColorId] = useState('');

 

  const GET_ALL_COLOUR = gql`
query GetAllColor {
  getAllColor {
    id
    colorName
  }
}`;

  const { data, refetch } = useQuery(GET_ALL_COLOUR);


  //------------------------------------------------------
  // --------------function for handle EDIT start---------
  //------------------------------------------------------


  const EDIT_COLOUR = gql`mutation UpdateColor($updateColorId: ID, $colorName: String) {
    updateColor(id: $updateColorId, colorName: $colorName) {
      id
      colorName
    }
  }`;


  const [EditData] = useMutation(EDIT_COLOUR);


  function handleEdit(id,name) {
    showModal(true);
    setColorId(id);
    setColorName(name);
  }


  const handleSubmit = async () => {
    await EditData({
      variables : {
        updateColorId: colorId,
        colorName: colorName
      }
    });
    showModal(false);
    setColorName("")
  }
 
 
  //------------------------------------------------------
  // --------------function for handle EDIT END---------
  //------------------------------------------------------



  //------------------------------------------------------
  // --------------function for handle DELETE start---------
  //------------------------------------------------------

  const DELETE_COLOR = gql`mutation DeleteColor($deleteColorId: ID!) {
    deleteColor(id: $deleteColorId) {
      id
      colorName
    }
  }`;


  const [DeleteSize] = useMutation(DELETE_COLOR, {
    onCompleted: () => {
      refetch();
    }
  });

  async function handleDelete(id ,name) {
    const shouldDelete = window.confirm(`Are you sure you want to delete "${name}"`);
    if(shouldDelete) {
      await DeleteSize({
        variables: {
          deleteColorId: id
        }
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
    <>
      <Row>
        <Col className="mx-auto my-5">
          <Card>
            <Card.Body>

              <h2>Table of color</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">color</th>
                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">

                  {data && data.getAllColor.map((item, index) => (
                    <tr className="border" key={item.id}>
                      <td className="border">{index + 1}</td>
                      <td className="border">{item.colorName}</td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => handleEdit(item.id,item.colorName)} >
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => handleDelete(item.id, item.colorName)}>
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
              <Modal.Title as="h5">Update Color</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Color Name</h5>
              <Form.Control type="text" name="colorName" value={colorName} 
              onChange={(e) => setColorName(e.target.value)} />
              <Button type='submit' className='my-2 btn btn-primary'  onClick={handleSubmit}  >Submit</Button>
            </Modal.Body>
          </Modal>

        </Col>
      </Row>
    </>
  );
}

export default Listcolor;
