import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const Input = forwardRef(({ label, type, placeholder, value }, ref) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        autoComplete="off"
        ref={ref}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
      ></Form.Control>
    </Form.Group>
  );
});

export default Input;
