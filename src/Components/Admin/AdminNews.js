import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import { Form, Table, Button } from "react-bootstrap";
import Modal from "../Modal/Modal.js";
import "./Admin.css";

export function AdminNews() {
  const [news, setNews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // This fetch is for the News
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    console.log(news);
  }, [news]);

  const fetchNews = async () => {
    const response = await axios(`${API_BASE_URL}news/`);
    setNews(response.data);
  };

  let newsInputs = [];

  for (let i in news) {
    newsInputs.push(
      <tr id="tableFont">
        <td className="align-self-center">{news[i].customerType}</td>
        <td className="align-self-center">{news[i].headline}</td>
        <td className="align-self-center">{news[i].text}</td>
      </tr>
    );
  }

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h5>Update News</h5>
        <Form>
          <Form.Group>
            <Form.Control as="select">
              <option value="accountType">Residential</option>
              <option value="accountType">Commercial</option>
            </Form.Control>
          </Form.Group>
          <Form.Group size="lg" controlId="firstName">
            <Form.Control
              as="textarea"
              value="Some news text here about some great happenings at Blue Sky!"
              required
            />
          </Form.Group>
          <Button id="btn" variant="dark" block size="md" type="submit">
            ADD
          </Button>
          <Button id="btn" variant="dark" block size="md" type="submit">
            DELETE
          </Button>
        </Form>
      </Modal>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>AccountType</th>
            <th>Headline</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody id="tbdy">{newsInputs}</tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Button onClick={() => setIsOpen(true)} variant="secondary" size="sm">
          Edit
        </Button>
      </div>
    </div>
  );
}
