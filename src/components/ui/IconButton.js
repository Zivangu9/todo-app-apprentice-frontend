import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const IconButton = ({ icon, color, tooltip, onClick }) => {
  return (
    <Col className="d-flex">
      <span className="mx-auto">
        <OverlayTrigger placement="top" overlay={<Tooltip>{tooltip}</Tooltip>}>
          <FontAwesomeIcon
            onClick={onClick}
            style={{ color: color }}
            icon={icon}
          />
        </OverlayTrigger>
      </span>
    </Col>
  );
};
export default IconButton;
