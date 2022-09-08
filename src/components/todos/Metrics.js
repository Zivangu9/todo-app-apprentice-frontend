import { Card, Col, Row } from "react-bootstrap";

const Metrics = () => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Row>
              <span className="text-center">Average time to finish tasks:</span>
            </Row>
            <Row className="mt-4">
              <span className="text-center">{`${"22:15"} minutes`}</span>
            </Row>
          </Col>
          <Col>
            <Row>Average time to finish tasks:</Row>
            <Row>{`Low: ${"10:25"} minutes`}</Row>
            <Row>{`Medium: ${"10:25"} minutes`}</Row>
            <Row>{`High: ${"10:25"} minutes`}</Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Metrics;
