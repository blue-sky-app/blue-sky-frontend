import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import Table from "react-bootstrap/Table";
import './Admin.css'; 

export function AdminEstimates() {
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

  let estimateInputs = [];

  for (let i in estimates) {
    let date = JSON.stringify(estimates[i].created_date);
    let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
    let updatedServices = [];
    for (let j in estimates[i].services) {
      updatedServices.push(
        <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
          <td>{estimates[i].services[j]}</td>
        </tr>
      )
    }
    estimateInputs.push(
      <tr style={{ fontSize: "11px", alignItems: "center"}}>
          <td className="align-self-center">{newDate}</td>
          <td className="align-self-center">{estimates[i].email}</td>
          <td className="align-self-center">{estimates[i].firstName}</td>
          <td className="align-self-center">{estimates[i].lastName}</td>
          <td className="align-self-center">{estimates[i].accountType}</td>
          <td>{updatedServices}</td>
      </tr>
    );
  }

  // posting No Service Info for users with no services
  if (estimateInputs.length === 0) {
    estimateInputs.push(
      <tr style={{ fontSize: "11px", textAlign: "center" }}>
        <td colspan="3">No Estimates Available</td>
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
        <tbody id="tbdy">
            {estimateInputs}
        </tbody>
    </Table>
  );
}