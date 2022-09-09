import { default as React, useContext } from "react";
import PortalReactDOM from "react-dom";
import TodosContext from "../../store/todos-context";
import MessageToast from "./MessageToast";

const ToastsCollector = ({ title, message }) => {
  const todosContext = useContext(TodosContext);
  const errors = todosContext.errors.map((error, i) => {
    return (
      <MessageToast
        key={"mt-" + i}
        id={"e"+i}
        title="Error"
        type="error"
        toastMessage={error}
      ></MessageToast>
    );
  });
  const messages = todosContext.messages.map((message, i) => {
    return (
      <MessageToast
        key={"mt-m" + i}
        id={"m"+i}
        title="Succes"
        type="succes"
        toastMessage={message}
      ></MessageToast>
    );
  });
  return (
    <React.Fragment>
      {PortalReactDOM.createPortal(
        <>
          {errors}
          {messages}
        </>,
        document.getElementById("toast-container")
      )}
    </React.Fragment>
  );
};

export default ToastsCollector;
