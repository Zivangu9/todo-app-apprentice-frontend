import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { convertSeconds } from "../../helper/Time";
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
              <span className="text-center">{`${convertSeconds(todosContext.metrics.generalAvg)}`}</span>
            </Row>
          </Col>
          <Col>
            <Row>Average time to finish tasks by priority:</Row>
            <Row>{`Low: ${convertSeconds(todosContext.metrics.lowAvg)}`}</Row>
            <Row>{`Medium: ${convertSeconds(todosContext.metrics.mediumAvg)}`}</Row>
            <Row>{`High: ${convertSeconds(todosContext.metrics.highAvg)}`}</Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Metrics;
