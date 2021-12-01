// Author(s): Dan, Sam
import React, { useState, useEffect } from "react";
import { fetchCategories } from "../API/Api.js";
import { Table, Button } from "react-bootstrap";
import Modal from "../Modal/Modal.js";
import "./Admin.css";
import { UpdateCategories } from "../Forms/UpdateCategories.js";

// Provides categories tab content for admin console
export function AdminCategories() {
  const [token] = useState(sessionStorage.getItem('token') || '');
  const [categories, setCategories] = useState([]);
  const [categoriesTable, setcategoriesTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // This fetches available Services for each category from the Db
  useEffect(() => {
    fetchCategories(token).then(setCategories);
  }, [token]);

  // Builds the table using data fetched from the Db, updates when "category" state changes
  useEffect(() => {
    let categoriesArray = [];
    for (let i in categories) {
      let categoryItems = [];
      for (let j in categories[i].services) {
        categoryItems.push(
          <tr className="mx-auto" id="adminRow">
            <td className="align-self-center">{categories[i].services[j]}</td>
          </tr>
        );
      }
      categoriesArray.push(
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
    setcategoriesTable(categoriesArray)
  }, [categories])

  // Performs another fetch when called to refresh the table data on page
  const refreshData = () => {
    fetchCategories(token).then(setCategories); 
  }

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>

        <UpdateCategories categories={categories} refreshData={refreshData}/>
        
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
