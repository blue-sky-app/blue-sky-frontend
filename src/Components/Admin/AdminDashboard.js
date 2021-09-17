import React, { useState, useEffect } from "react";
import { fetchUser } from "../API/Api.js";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import "./Admin.css";
import { Card } from "react-bootstrap";

export function AdminDashboard() {
  const [estimates, setEstimates] = useState([]);
  const [users, setUsers] = useState([]);

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

  // user Fetch
  useEffect(() => {
    fetchUser().then(setUsers);
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  const totalEstimates = estimates.length;
  const totalUsers = users.length;

  return (
    <>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>{totalUsers}</strong>
        </Card.Title>
        <Card.Text className="text-center">Total Customers</Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>{totalEstimates}</strong>
        </Card.Title>
        <Card.Text className="text-center">Estimates Needing Review</Card.Text>
      </Card.Body>
    </>
  );
}
