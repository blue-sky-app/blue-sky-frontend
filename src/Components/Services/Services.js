import React, { useState, useEffect} from "react";
import axios from 'axios'
import { MobileNavBar } from "../NavBar/MobileNavBar.js";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";

export function Services() {
  // const [tables, setTables] = useState([]);

  
  // This fetch is for the table of transactions
  // useEffect(() => {
  //   fetchTable();
  // }, [])
  // useEffect(() => {
  //   console.log(tables)
  //   }, [tables])
      
  // const fetchTable = async() => {
  //   const response= await axios('http://localhost:8080/bb_hist');
  //   setTables(response.data)    
  // }

  // let bb_table = [];
  // const user = users.email;
  // for (const [i, table] of tables.entries()) {
  //   if (table.email === user) {
  //     let date = JSON.stringify(table.date);
  //     let newDate = `${date.slice(6, 8)}/${date.slice(9,11)}/${date.slice(1,5)}`;
  //     bb_table.push(
  //       <tr style={{fontSize: "11px",  textAlign: "center"}}>
  //         <td>{table.transaction_type}</td>
  //         <td>{table.amount}</td>
  //         <td>{newDate}</td>
  //       </tr>                          
  //     );
  //   }
  // }
  
  return (
    <div>
    <Image src={HeaderLogo} className="d-flex w-100 mx-auto justify-content-center" />
    <Card className="border-0">
      <Card.Header 
        className="d-flex justify-content-center align-items-center text-white" 
        style={{backgroundColor:"#0a7ebd", height: "40px", fontWeight: "bold"}}
      >
          Blue Sky Services
      </Card.Header>               
      <Card.Body style={{overflowY: "scroll", maxHeight: "53vh"}}>
        <Table striped bordered hover size="sm">
          <thead style={{backgroundColor: "#434444", color: "white", fontSize: "12px",  textAlign: "center"}}>
            <tr>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>        
          <tbody style={{fontSize: "14px", textAlign: "center"}}>
            {/* {bb_table} */}
          </tbody>
        </Table>
        <Button className="mt-1 p-2" variant="dark" style={{fontSize: "12px", fontWeight:"bold"}} href="/services">REQUEST SERVICE</Button>
      </Card.Body>
    </Card>

    <MobileNavBar />
  </div>
  )
}