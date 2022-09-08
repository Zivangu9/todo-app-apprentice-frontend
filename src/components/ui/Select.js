import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const Select = forwardRef(({ label, options, className, value }, ref) => {
  return (
    <Form.Group className={className} controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Select ref={ref} defaultValue={value}>
        {options.map((option) => {
          return (
            <option key={option.text} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
});
export default Select;
