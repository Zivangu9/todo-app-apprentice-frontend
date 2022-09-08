import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getApiUrl } from "../../helper/Api";
import Input from "./Input";
import Select from "./Select";
const TodoModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nameRef = useRef();
  const priotityRef = useRef();
  const dueDateRef = useRef();
  useImperativeHandle(ref, () => ({ showModal: handleShow }));
  const handleCreteTodo = async () => {
    try {
      const response = await fetch(getApiUrl() + "/todos", {
        method: "POST",
        body: JSON.stringify({
          name: nameRef.current.value,
          priority: priotityRef.current.value,
          dueDate:
            dueDateRef.current.value === "" ? null : dueDateRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok && response.status !== 400) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      if (response.status === 400) {
        console.log(
          result.errors.map((error) => {
            return error.defaultMessage;
          })
        );
        return;
      }
      console.log("result is: ", JSON.stringify(result, null, 4));
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crete a new To Do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            ref={nameRef}
            label="Name"
            type="text"
            placeholder="Name of To Do"
          />
          <Select
            ref={priotityRef}
            className="mt-2"
            label="Priority"
            options={[
              { value: null, text: "..." },
              { value: "LOW", text: "Low" },
              { value: "MEDIUM", text: "Medium" },
              { value: "HIGH", text: "High" },
            ]}
          />
          <Form.Group className="mt-2" controlId="DueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" ref={dueDateRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreteTodo}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default TodoModal;
