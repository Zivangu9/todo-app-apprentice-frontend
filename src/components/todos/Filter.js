import { Button, Card, Col, Row } from "react-bootstrap";
import Input from "../ui/Input";
import Select from "../ui/Select";

const Filter = () => {
  return (
    <Card>
      <Card.Body gap>
        <Input label="Name" type="text" placeholder="Name of To Do" />
        <Row>
          <Col>
            <Select
              className="mt-2"
              label="Priority"
              options={[
                { value: null, text: "All" },
                { value: "HIGH", text: "High" },
                { value: "MEDIUM", text: "Medium" },
                { value: "LOW", text: "Low" },
              ]}
            />
            <Select
              className="mt-2"
              label="State"
              options={[
                { value: null, text: "All" },
                { value: "true", text: "Done" },
                { value: "false", text: "Undone" },
              ]}
            />
          </Col>
          <Col className="d-flex">
            <Button className="ms-auto mt-auto">Search</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default Filter;
