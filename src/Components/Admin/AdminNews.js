// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import { fetchNews } from "../API/Api.js";
import { Table, Button } from "react-bootstrap";
import Modal from "../Modal/Modal.js";
import { UpdateNews } from "../Forms/UpdateNews.js";
import "./Admin.css";

// Provides news tab content for admin console
export function AdminNews() {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [news, setNews] = useState([]);
  const [newsTable, setNewsTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // This fetch is for the News
  useEffect(() => {
    fetchNews(token).then(setNews);
  }, [token]);

  useEffect(() => {
    let newsInputs = [];
    for (let i in news) {
      newsInputs.push(
        <tr id="tableFont">
          <td key={news[i].customerType} className="align-self-center">{news[i].customerType}</td>
          <td key={`${news[i].customerType} headline`} className="align-self-center">{news[i].headline}</td>
          <td key={`${news[i].customerType} text`} className="align-self-center">{news[i].text}</td>
        </tr>
      );
    }
    setNewsTable(newsInputs)
  }, [news])

  const refreshData = () => {
    fetchNews(token).then(setNews); 
    console.log("refreshed")
  }

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <UpdateNews news={news} refreshData={refreshData}/>
      </Modal>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>AccountType</th>
            <th>Headline</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody id="tbdy">{newsTable}</tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Button onClick={() => setIsOpen(true)} variant="secondary" size="sm">
          Edit
        </Button>
      </div>
    </div>
  );
}
