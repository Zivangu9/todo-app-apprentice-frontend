import { Form } from "react-bootstrap";

const Input = ({ label, type, placeholder }) => {
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder}></Form.Control>
    </Form.Group>
  );
};

export default Input;
