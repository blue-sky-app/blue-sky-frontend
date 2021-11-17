// Author(s): Dan
import React, { useState, useEffect } from "react";
import { fetchEstimates } from "../API/Api.js";
import Table from "react-bootstrap/Table";
import "./Admin.css";

// Provides estimates tab content for admin console
export function AdminEstimates() {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [estimates, setEstimates] = useState([]);

  // This fetches the Estimates data from Db
  useEffect(() => {
    fetchEstimates(token).then(setEstimates);
  }, [token]);

  const estimateInputs = [];

  // Builds Estimates table from data fetched from Db
  for (let i in estimates) {
    let date = JSON.stringify(estimates[i].created_date);
    let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(
      1,
      5
    )}`;
    let updatedServices = [];
    for (let j in estimates[i].services) {
      updatedServices.push(
        <div className="mx-auto">{estimates[i].services[j]}</div>
      );
    }
    estimateInputs.push(
      <tr id="tableFont">
        <td>{newDate}</td>
        <td>{estimates[i].email}</td>
        <td>{estimates[i].firstName}</td>
        <td>{estimates[i].lastName}</td>
        <td>{estimates[i].accountType}</td>
        <td>{updatedServices}</td>
      </tr>
    );
  }

  // posting "No Service Info" if no estimates are awaiting review
  if (estimateInputs.length === 0) {
    estimateInputs.push(
      <tr id="tableFont">
        <td colSpan="3">No Estimates Available</td>
      </tr>
    );
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Date Submitted</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Account Type</th>
          <th>Services</th>
        </tr>
      </thead>
      <tbody id="tbdy">{estimateInputs}</tbody>
    </Table>
  );
}
