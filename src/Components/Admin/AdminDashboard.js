import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import "./Admin.css";
import { Card } from "react-bootstrap";

export function AdminDashboard() {
  const [estimates, setEstimates] = useState([]);

  // This fetch is for the Estimates
  useEffect(() => {
    fetchEstimates();
  }, []);
  useEffect(() => {
    console.log(estimates);
  }, [estimates]);

  const fetchEstimates = async () => {
    const response = await axios(`${API_BASE_URL}estimates/`);
    setEstimates(response.data);
  };

  const totalEstimates = estimates.length;

  return (
    <Card.Body>
      <Card.Title className="text-center">
        <strong>{totalEstimates}</strong>
      </Card.Title>
      <Card.Text className="text-center">Estimates Needing Review</Card.Text>
    </Card.Body>
  );
}
