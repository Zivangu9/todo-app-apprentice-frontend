import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const Input = forwardRef(({ label, type, placeholder }, ref) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control ref={ref} type={type} placeholder={placeholder}></Form.Control>
    </Form.Group>
  );
});

export default Input;
