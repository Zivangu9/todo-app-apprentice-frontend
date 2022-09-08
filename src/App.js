import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import Filter from "./components/todos/Filter";
import Metrics from "./components/todos/Metrics";
import TodoPagination from "./components/todos/TodoPagination";
import TodosTable from "./components/todos/TodosTable";
import TodoModal from "./components/ui/TodoModal";

const App = () => {
  const modalRef = useRef();
  const handleShow = () => {
    if (modalRef.current !== undefined )
      modalRef.current.showModal();
  };
  return (
    <Container className="pt-4">
      <TodoModal ref={modalRef}></TodoModal>
      <Filter />
      <Button className="my-2" onClick={handleShow}>+ New To Do</Button>
      <TodosTable />
      <TodoPagination className="mx-auto" />
      <Metrics />
    </Container>
  );
};

export default App;
