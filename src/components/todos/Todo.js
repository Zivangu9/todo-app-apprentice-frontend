import fontawesome from "@fortawesome/fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { getApiUrl } from "../../helper/Api";
import TodosContext from "../../store/todos-context";

fontawesome.library.add(faPen, faTrash);

const Todo = ({ id, name, priority, dueDate }) => {
  const todosContext = useContext(TodosContext);
  const deleteHandler = async () => {
    try {
      const response = await fetch(getApiUrl() + "/todos/" + id, {
        method: "DELETE",
      });
      if (!response.ok && response.status !== 404) {
        throw new Error(`Error! status: ${response.status}`);
      }
      if (response.status === 404) {
        console.log("Not Found"
        );
        return;
      }
      todosContext.delete(id);
      console.log("Deleted");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <tr>
      <td className="d-flex">
        <Form.Check className="mx-auto" />
      </td>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{dueDate}</td>
      <td>
        <Row>
          <Col className="d-flex">
            <span className="mx-auto">
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <FontAwesomeIcon
                  style={{ color: "#ffc107" }}
                  icon="fa-solid fa-pen"
                />
              </OverlayTrigger>
            </span>
          </Col>
          <Col className="d-flex">
            <span className="mx-auto">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <FontAwesomeIcon
                onClick={deleteHandler}
                  style={{ color: "#dc3545" }}
                  icon="fa-solid fa-trash"
                />
              </OverlayTrigger>
            </span>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default Todo;
