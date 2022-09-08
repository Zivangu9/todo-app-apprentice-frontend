import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getApiUrl } from "../../helper/Api";
import TodosContext from "../../store/todos-context";
import Input from "./Input";
import Select from "./Select";
const TodoUpdateModal = forwardRef(({id, name, priority, dueDate}, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nameRef = useRef();
  const priotityRef = useRef();
  const dueDateRef = useRef();
  const todosContext = useContext(TodosContext);
  useImperativeHandle(ref, () => ({ showModal: handleShow }));
  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(getApiUrl() + "/todos/" + id, {
        method: "PUT",
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
      if (!response.ok && response.status !== 400 && response.status !== 404) {
        throw new Error(`Error! status: ${response.status}`);
      }
      if (response.status === 400) {
        const result = await response.json();
        console.log(
          result.errors.map((error) => {
            return error.defaultMessage;
          })
        );
        return;
      }
      if (response.status === 404) {
        console.log("Not Found");
        return;
      }
      // console.log("result is: ", JSON.stringify(result, null, 4));
      todosContext.filter();
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update To Do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Input
            ref={nameRef}
            label="Name"
            type="text"
            value={name}
            placeholder="Name of To Do"
          />
          <Select
            ref={priotityRef}
            className="mt-2"
            label="Priority"
            value={priority}
            options={[
              { value: null, text: "..." },
              { value: "LOW", text: "Low" },
              { value: "MEDIUM", text: "Medium" },
              { value: "HIGH", text: "High" },
            ]}
          />
          <Form.Group className="mt-2" controlId="DueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" defaultValue={dueDate} ref={dueDateRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTodo}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default TodoUpdateModal;
