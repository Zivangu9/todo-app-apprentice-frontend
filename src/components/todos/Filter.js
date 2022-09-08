import { useContext, useRef } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import Input from "../ui/Input";
import Select from "../ui/Select";

const Filter = () => {
  const todosCotext = useContext(TodosContext);
  const nameRef = useRef();
  const priorityRef = useRef();
  const stateRef = useRef();
  const filterhandler = () => {
    todosCotext.addFilters(
      nameRef.current.value,
      priorityRef.current.value,
      stateRef.current.value
    );
  };
  return (
    <Card>
      <Card.Body>
        <Input
          ref={nameRef}
          label="Name"
          type="text"
          placeholder="Name of To Do"
        />
        <Row>
          <Col>
            <Select
              ref={priorityRef}
              className="mt-2"
              label="Priority"
              options={[
                { value: "", text: "All" },
                { value: "HIGH", text: "High" },
                { value: "MEDIUM", text: "Medium" },
                { value: "LOW", text: "Low" },
              ]}
            />
            <Select
              ref={stateRef}
              className="mt-2"
              label="State"
              options={[
                { value: "", text: "All" },
                { value: "true", text: "Done" },
                { value: "false", text: "Undone" },
              ]}
            />
          </Col>
          <Col className="d-flex">
            <Button onClick={filterhandler} className="ms-auto mt-auto">
              Search
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default Filter;
