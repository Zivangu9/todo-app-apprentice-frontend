import fontawesome from "@fortawesome/fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { Form, Row } from "react-bootstrap";
import { getApiUrl } from "../../helper/Api";
import TodosContext from "../../store/todos-context";
import IconButton from "../ui/IconButton";
import TodoUpdateModal from "../ui/TodoUpdateModal";

fontawesome.library.add(faPen, faTrash);

const Todo = ({ id, done, name, priority, dueDate }) => {
  const todosContext = useContext(TodosContext);
  const checkHandler = async () => {
    try {
      const response = await fetch(
        `${getApiUrl()}/todos/${id}/${!done ? "done" : "undone"}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok && response.status !== 404) {
        throw new Error(`Error! status: ${response.status}`);
      }
      if (response.status === 404) {
        console.log("Not Found");
        return;
      }
      todosContext.filter();
      // console.log("Updated");
    } catch (err) {
      console.log(err.message);
    }
  };
  const deleteHandler = async () => {
    try {
      const response = await fetch(getApiUrl() + "/todos/" + id, {
        method: "DELETE",
      });
      if (!response.ok && response.status !== 404) {
        throw new Error(`Error! status: ${response.status}`);
      }
      if (response.status === 404) {
        console.log("Not Found");
        return;
      }
      todosContext.filter();
      // console.log("Deleted");
    } catch (err) {
      console.log(err.message);
    }
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
        <TodoUpdateModal
          ref={modalRef}
          id={id}
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
