import React, { useCallback, useEffect, useState } from "react";
import { getApiUrl } from "../helper/Api";

const TodosContext = React.createContext({
  todos: [],
  filters: {},
  filter: () => {},
  delete: (id) => {},
  done: (id, done) => {},
  addFilters: (name, priority, state) => {},
  addSort: (priority, dueDate) => {},
});

export const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});
  const deleteHandler = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todoId !== id));
  };
  const doneHandler = (id, done) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.todoId !== id) todo.done = done;
        return todo;
      })
    );
  };

  const addFiltersHandler = (name, priority, state) => {
    let params = {};
    if (name) params.name = name;
    if (priority) params.priority = priority;
    if (state) params.done = state;
    setFilters(params);
  };
  const getData = useCallback(async () => {
    try {
      let url = new URL(getApiUrl() + "/todos");
      for (const key in filters) {
        url.searchParams.append(key, filters[key]);
      }
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("result is: ", JSON.stringify(result, null, 4));
      // console.log(result.content);
      setTodos(result.content);
    } catch (err) {
      console.log(err.message);
    }
  }, [filters]);
  useEffect(() => {
    getData();
  }, [filters, getData]);
  const addSortHandler = (priority, dueDate) => {};

  const contextValue = {
    todos: todos,
    filters: filters,
    done: doneHandler,
    delete: deleteHandler,
    addFilters: addFiltersHandler,
    addSort: addSortHandler,
    filter: getData,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
