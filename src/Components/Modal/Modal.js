import React from 'react';
import ReactDom from 'react-dom';
import "./Modal.css";

export default function Modal({ open, children, onClose, search }) {
  if (!open) return null;

  const closeActions = () => {
    onClose();
    search()
  }

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={closeActions}/>
      <div className="cModal">
        <button 
          className="cClose"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closeActions}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}



