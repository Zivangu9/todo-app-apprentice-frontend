import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import Input from "./Input";
import Select from "./Select";
const TodoModal = forwardRef(
  ({ onSave, title, id, name, priority, dueDate }, ref) => {
    const [show, setShow] = useState(false);
    const closeHandler = () => setShow(false);
    const showHandler = () => setShow(true);
    const nameRef = useRef();
    const priotityRef = useRef();
    const dueDateRef = useRef();
    const todosContext = useContext(TodosContext);
    useImperativeHandle(ref, () => ({ showModal: showHandler }));
    const saveTodoHandler = async () => {
      closeHandler();
      const params = {
        id: id,
        name: nameRef.current.value,
        priority: priotityRef.current.value,
        dueDate:
          dueDateRef.current.value === "" ? null : dueDateRef.current.value,
      };
      await onSave(params);
      todosContext.filter();
    };
    return (
      <Modal show={show} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Input
              ref={nameRef}
              label="Name"
              type="text"
              placeholder="Name of To Do"
              value={name}
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
              <Form.Control
                type="date"
                ref={dueDateRef}
                defaultValue={dueDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={saveTodoHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);
export default TodoModal;
