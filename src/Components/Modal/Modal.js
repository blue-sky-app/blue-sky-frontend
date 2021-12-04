// Author(s): Sam
import React from 'react';
import ReactDom from 'react-dom';
import "./Modal.css";

// Provides modals for use in components. Can call parent functions based on tab value.
export default function Modal({ open, children, onClose, search, tab, clear }) {
  if (!open) return null;

  // Specifies close actions passed from props when modal is closed
  const closeActions = () => {
    onClose();
    if (tab === "users") {
      search()
    }
    else if (tab === "categories") {
      clear();
    }
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



