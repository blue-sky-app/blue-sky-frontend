import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, headers } from "../API/Api.js";
import { Form, Table, Button } from "react-bootstrap";
import Modal from "../Modal/Modal.js";
import "./Admin.css";

export function AdminCategories() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // This fetch is for the Estimates
  useEffect(() => {
    fetchCategories(token);
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const fetchCategories = async (token) => {
    const response = await axios(`${API_BASE_URL}/servicecategories/`, headers(token));
    setCategories(response.data);
  };

  let categoriesTable = [];

  for (let i in categories) {
    let categoryItems = [];
    for (let j in categories[i].services) {
      categoryItems.push(
        <tr className="mx-auto" id="adminRow">
          <td className="align-self-center">{categories[i].services[j]}</td>
        </tr>
      );
    }
    categoriesTable.push(
      <>
        <thead>
          <tr>
            <th>{categories[i].customerType}</th>
          </tr>
        </thead>
        <tbody id="tbdy">{categoryItems}</tbody>
      </>
    );
  }

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h5>Update Services</h5>
        <Form>
          <Form.Group>
            <Form.Control as="select">
              <option value="accountType">Residential</option>
              <option value="accountType">Commercial</option>
            </Form.Control>
          </Form.Group>
          <Form.Group size="lg" controlId="firstName">
            <Form.Control type="text" value="Service-name" required />
          </Form.Group>
          <Button id="btn" variant="dark" block size="md" type="submit">
            ADD
          </Button>
          <Button id="btn" variant="dark" block size="md" type="submit">
            DELETE
          </Button>
        </Form>
      </Modal>
      <Table striped bordered hover size="sm" className="mx-auto w-25">
        {categoriesTable}
      </Table>
      <div className="d-flex justify-content-center">
        <Button onClick={() => setIsOpen(true)} variant="secondary" size="sm">
          Edit
        </Button>
      </div>
    </div>
  );
}
