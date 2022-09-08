import fontawesome from "@fortawesome/fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

fontawesome.library.add(faPen, faTrash);

const Todo = ({ id, name, priority, dueDate }) => {
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
