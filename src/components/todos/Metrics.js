import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import TodosContext from "../../store/todos-context";

const Metrics = () => {
  const todosContext = useContext(TodosContext);
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Row>
              <span className="text-center">Average time to finish tasks:</span>
            </Row>
            <Row className="mt-4">
              <span className="text-center">{`${todosContext.metrics.generalAvg} seconds`}</span>
            </Row>
          </Col>
          <Col>
            <Row>Average time to finish tasks:</Row>
            <Row>{`Low: ${todosContext.metrics.lowAvg} seconds`}</Row>
            <Row>{`Medium: ${todosContext.metrics.mediumAvg} seconds`}</Row>
            <Row>{`High: ${todosContext.metrics.highAvg} seconds`}</Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Metrics;
