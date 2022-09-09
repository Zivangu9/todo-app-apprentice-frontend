import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TodosContext from "../../store/todos-context";
import Todo from "./Todo";
import "./TodoTable.css";

const TodosTable = ({ todos }) => {
  const [priorirySort, setPrioritySort] = useState("");
  const prioritySortHandler = () => {
    if (priorirySort === "") setPrioritySort("asc");
    else if (priorirySort === "asc") setPrioritySort("desc");
    else setPrioritySort("");
  };
  const [dueDateSort, setDueDateSort] = useState("");
  const DueDateSortHandler = () => {
    if (dueDateSort === "") setDueDateSort("asc");
    else if (dueDateSort === "asc") setDueDateSort("desc");
    else setDueDateSort("");
  };

  const todosContext = useContext(TodosContext);
  todos = todosContext.todos;
  const { addSorts } = todosContext;
  useEffect(() => {
    const priority = priorirySort ? `priority-${priorirySort}` : "";
    const dueDate = dueDateSort ? `due_date-${dueDateSort}` : "";
    addSorts(priority, dueDate);
  }, [priorirySort, dueDateSort, addSorts]);
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
              done={todo.doneFlag}
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
