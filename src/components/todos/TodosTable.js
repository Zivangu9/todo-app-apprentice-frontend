import { useState } from "react";
import { Table } from "react-bootstrap";
import Todo from "./Todo";
import "./TodoTable.css";

const DUMMY_DATA = [
  {
    todoId: 1,
    name: "Todo 1",
    priority: "Low",
    dueDate: "2022-09-05",
  },
  {
    todoId: 2,
    name: "Todo 2",
    priority: "Medium",
    dueDate: "2022-09-05",
  },
  {
    todoId: 3,
    name: "Todo 3",
    priority: "High",
    dueDate: "2022-09-05",
  },
];
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
  todos = DUMMY_DATA;
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
