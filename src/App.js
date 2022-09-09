import { useContext, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import Filter from "./components/Filter";
import Metrics from "./components/Metrics";
import TodoPagination from "./components/pagination/TodoPagination";
import TodosTable from "./components/todos/TodosTable";
import ToastsCollector from "./components/ui/ToastsCollector";
import TodoModal from "./components/ui/TodoModal";
import TodosContext from "./store/todos-context";

const App = () => {
  const modalRef = useRef();

  const handleShow = () => {
    if (modalRef.current !== undefined) modalRef.current.showModal();
  };
  const todosContext = useContext(TodosContext);
  
  useEffect(() => {
    todosContext.filter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <Container className="pt-4">
      <ToastsCollector />
      <TodoModal
        ref={modalRef}
        onSave={todosContext.create}
        title="Create a new To Do"
      ></TodoModal>
      <Filter />
      <Button className="my-2" onClick={handleShow}>
        + New To Do
      </Button>
      <TodosTable />
      <TodoPagination className="mx-auto" />
      <Metrics />
    </Container>
  );
};

export default App;
