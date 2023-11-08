import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

function Orderlist() {
  return (
    <>
      <Row>
        <Col className="mx-auto my-5">
          <Card>
            <Card.Body>
              {/* Display the table */}
              <h2>Table of order List</h2>
              <table className="table mt-2 border ">
                <thead className="table-head">
                  <tr className="border">
                    <th className="border">Sr No</th>
                    <th className="border">customer Name</th>
                    <th className="border">mobile No</th>
                    <th className="border">Products</th>

                    <th className="border">edit</th>
                    <th className="border">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="border">
                    <td className="border">index + 1</td>
                    <td className="border">customerName</td>
                    <td className="border">mobilenumber</td>
                    <td className="border">products</td>
                    <td className="border">
                      <Button className="btn btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </td>
                    <td className="border">
                      <Button className="btn btn-sm">
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border" colSpan="7">
                      Total
                    </td>
                    <td className="border"> 10</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Orderlist;
