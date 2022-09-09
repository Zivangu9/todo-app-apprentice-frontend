import React, { useState } from "react";
import Toast from 'react-bootstrap/Toast';

const MessageToast = ({ title, toastMessage, type, id }) => {
  const [show, setShow] = useState(true);
  return (
    <Toast
      bg={type === "error" ? "danger" : "success"}
      key={"t-"+id}
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{toastMessage}</Toast.Body>
    </Toast>
  );
};

export default MessageToast;
