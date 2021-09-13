import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import Table from "react-bootstrap/Table";
import './Admin.css'; 

export function AdminNews() {
  const [news, setNews] = useState([]);

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
      <tr style={{ fontSize: "11px", alignItems: "center"}}>
          <td className="align-self-center">{news[i].customerType}</td>
          <td className="align-self-center">{news[i].headline}</td>
          <td className="align-self-center">{news[i].text}</td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>AccountType</th>
                <th>Headline</th>
                <th>Text</th>
            </tr>
        </thead>
        <tbody id="tbdy">
            {newsInputs}
        </tbody>
    </Table>
  );
}