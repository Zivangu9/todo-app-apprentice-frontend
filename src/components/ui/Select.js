import { Form } from "react-bootstrap";

const Select = ({ label, options, className }) => {
  return (
    <Form.Group className={className} controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Select>
        {options.map((option) => {
          return <option key={option.text} value={option.value}>{option.text}</option>;
        })}
      </Form.Select>
    </Form.Group>
  );
};
export default Select;
