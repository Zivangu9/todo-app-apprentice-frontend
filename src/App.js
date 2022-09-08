import { Button, Container } from "react-bootstrap";
import Filter from "./components/todos/Filter";
import TodosTable from "./components/todos/TodosTable";

const App = () => {
  return (
    <Container className="pt-4">
      <Filter />
      <Button className="my-2">+ New To Do</Button>
      <TodosTable />
      <div>Nav</div>
      <div>Metrics</div>
    </Container>
  );
};

export default App;
