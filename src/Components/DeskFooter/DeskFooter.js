import React from "react";
import Card from "react-bootstrap/Card";
import './DeskFooter.css';

// This is the footer component for the Desktop view

export function DeskFooter() {

  return (
    <div id="bottom">
      <Card className="border-0">
          
          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            id="bg"
          >
            <Card.Text
              className="text-center mr-3 ml-3 mb-1"
              id="blueyou">
              WHAT CAN BLUE DO FOR YOU?
            </Card.Text>
            <Card.Text
              className="mr-3 ml-3 mt-2 text-center"
              id="estimates">
              All estimates and proposals are guaranteed for six months and are
              completed free of charge
            </Card.Text>
            <Card.Text
              className="mr-3 ml-3 mt-2 text-center"
              id="copyright">
               <br /> 
              Copyright © 2021 BlueSky. All Rights Reserved
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
  );
}