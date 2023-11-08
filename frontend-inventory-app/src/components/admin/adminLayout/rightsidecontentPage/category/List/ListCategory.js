import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";

function ListCategory() {

  const [modal, showModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categroryId, setCategoryId] = useState('');



  const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      id
      categoryName
    }
  }`;

  const { data, refetch } = useQuery(GET_ALL_CATEGORY);






  //------------------------------------------------------
  // --------------function for handle EDIT start---------
  //------------------------------------------------------



  const EDIT_CATEGORY = gql`mutation UpdateCategory($updateCategoryId: ID, $categoryName: String) {
    updateCategory(id: $updateCategoryId, categoryName: $categoryName) {
      id
      categoryName
    }
  }`;


  const [EditData] = useMutation(EDIT_CATEGORY);

  function hadleEdit(id, name) {
    showModal(true);
    setCategoryId(id);
    setCategoryName(name);
  }

  const handleSubmit = async () => {
    await EditData({
      variables: {
        updateCategoryId: categroryId,
        categoryName: categoryName
      }
    });
    showModal(false);
    setCategoryName("");

    refetch();
  }


  //------------------------------------------------------
  // --------------function for handle EDIT END---------
  //------------------------------------------------------





  //------------------------------------------------------
  // --------------function for handle DELETE start---------
  //------------------------------------------------------


  const DELETE_cATEGORY = gql`
    mutation DeleteCategory($deleteCategoryId: ID!) {
      deleteCategory(id: $deleteCategoryId) {
        id
        categoryName
      }
    }
  `;

  const [deleteCat, {data: deleteData}] = useMutation(DELETE_cATEGORY, {
    onCompleted: () => {
      refetch();
    }
  });

  // if(deleteData){
  //   console.log("deleteData", deleteData);
  // }


 async function handleDelete(id,name) {
  const shouldDelete = window.confirm(`Are you sure you want to delete "${name}" `);
  if(shouldDelete) {
    await deleteCat({
      variables: {
      deleteCategoryId: id
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

              <h2>Table of Category List</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">category Name</th>
                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {data && data.getAllCategory.map((item, index) => (
                    <tr className="border" key={item.id}>
                      <td className="border">{index + 1}</td>
                      <td className="border">{item.categoryName}</td>
                      <td className="border">
                        <Button className="btn btn-sm" onClick={() => hadleEdit(item.id, item.categoryName)}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </td>
                      <td className="border">
                        <Button className="btn btn-sm"  onClick={() => handleDelete(item.id,item.categoryName)}>
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
              <Modal.Title as="h5">Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Category Name</h5>
              <Form.Control type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              <Button type='submit' className='my-2 btn btn-primary' onClick={handleSubmit}>Submit</Button>
            </Modal.Body>
          </Modal>

        </Col>
      </Row>
    </>
  );
}

export default ListCategory;
