import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import Todo from "./Todo";
import "./TodoTable.css";

const TodosTable = ({ todos }) => {
  const todosContext = useContext(TodosContext);
  todos = todosContext.todos;
  const { addSorts } = todosContext;

  const updateSort = (prefix, prev) => {
    let result = "";
    if (prev === "") result = "asc";
    else if (prev === "asc") result = "desc";
    addSorts(`${prefix}-${result}`);
    return result;
  };

  const [priorirySort, setPrioritySort] = useState("");
  const prioritySortHandler = () => {
    setPrioritySort((prevPriorirySort) => {
      const result = updateSort("priority", prevPriorirySort);
      return result;
    });
  };

  const [dueDateSort, setDueDateSort] = useState("");
  const DueDateSortHandler = () => {
    setDueDateSort((prevDueDateSort) => {
      const result = updateSort("due_date", prevDueDateSort);
      return result;
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th
            className={`sorting ${priorirySort}`}
            onClick={prioritySortHandler}
          >
            Priority
          </th>
          <th className={`sorting ${dueDateSort}`} onClick={DueDateSortHandler}>
            Due Date
          </th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.todoId}
              id={todo.todoId}
              done={todo.done}
              name={todo.name}
              priority={todo.priority}
              dueDate={todo.dueDate}
            ></Todo>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TodosTable;
