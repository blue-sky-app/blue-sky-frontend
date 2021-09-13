import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../API/Api.js";
import Table from "react-bootstrap/Table";
import './Admin.css'; 

export function AdminCategories() {
  const [categories, setCategories] = useState([]);

  // This fetch is for the Estimates
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const fetchCategories = async () => {
    const response = await axios(`${API_BASE_URL}servicecategories/`);
    setCategories(response.data);
  };

  let categoriesTable = [];

    for (let i in categories) {
    let categoryItems = [];
        for (let j in categories[i].services) {
            categoryItems.push(
                <tr className="mx-auto" style={{background: "rgba(0, 0, 0, 0", borderStyle: "hidden"}} >
                    <td className="align-self-center">{categories[i].services[j]}</td>
                </tr>

            )
        }
        categoriesTable.push(
            <>
                <thead>
                    <tr>
                        <th>{categories[i].customerType}</th>
                    </tr>
                </thead>
                <tbody id="tbdy">
                    {categoryItems}
                </tbody>
            </>
        );
    }

  return (
    <Table striped bordered hover size="sm">
        {categoriesTable}
    </Table>
  );
}