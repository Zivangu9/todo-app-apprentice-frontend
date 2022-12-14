import fontawesome from "@fortawesome/fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { Form, Row } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import IconButton from "../ui/IconButton";
import TodoModal from "../ui/TodoModal";

fontawesome.library.add(faPen, faTrash);

const Todo = ({ id, done, name, priority, dueDate }) => {
  const todosContext = useContext(TodosContext);
  const checkHandler = async () => {
    await todosContext.check(id, done);
    todosContext.filter();
  }
  const deleteHandler = async () => {
    await todosContext.delete(id);
    todosContext.filter();
  };
  const modalRef = useRef();
  const handleShow = () => {
    if (modalRef.current !== undefined) modalRef.current.showModal();
  };
  return (
    <tr>
      <td className="d-flex">
        <Form.Check
          className="mx-auto"
          checked={done}
          onChange={checkHandler}
        />
      </td>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{dueDate}</td>
      <td>
        <TodoModal
          ref={modalRef}
          id={id}
          onSave={todosContext.update}
          title="Update To Do"
          name={name}
          priority={priority}
          dueDate={dueDate}
        />
        <Row>
          <IconButton
            icon="fa-solid fa-pen"
            color="#ffc107"
            tooltip="Edit"
            onClick={handleShow}
          />
          <IconButton
            icon="fa-solid fa-trash"
            color="#dc3545"
            tooltip="Delete"
            onClick={deleteHandler}
          />
        </Row>
      </td>
    </tr>
  );
};

export default Todo;
