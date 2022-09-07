import { Button, Container } from "react-bootstrap";
import Filter from "./components/todos/Filter";

const App = () => {
  return (
    <Container className="pt-4">
      <Filter />
      <Button className="my-2">+ New To Do</Button>
      <div>Table</div>
      <div>Nav</div>
      <div>Metrics</div>
    </Container>
  );
};

export default App;
