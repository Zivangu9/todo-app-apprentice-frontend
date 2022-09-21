import React, { useCallback, useEffect, useState } from "react";
import { getApiUrl } from "../helper/Api";
import useTodosRequests from "../helper/HttpRequests";

const TodosContext = React.createContext({
  todos: [],
  errors: [],
  messages: [],
  pagination: { totalPages: 0, currentPage: 0 },
  metrics: { generalAvg: 0, lowAvg: 0, mediumAvg: 0, highAvg: 0 },
  create: () => {},
  update: () => {},
  delete: () => {},
  check: () => {},
  setPage: () => {},
  addFilters: (name, priority, state) => {},
  addSorts: (priority, dueDate) => {},
  filter: () => {},
});

export const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [metrics, setMetrics] = useState({
    generalAvg: 0,
    lowAvg: 0,
    mediumAvg: 0,
    highAvg: 0,
  });
  const [filters, setFilters] = useState({});
  const [sorts, setSorts] = useState([]);
  const {
    creteTodo,
    updateTodo,
    deleteTodo,
    checkTodo,
    getMetrics,
    errors,
    messages,
  } = useTodosRequests();
  const getTodos = async () => {
    getMetrics(setMetrics);
    try {
      let url = new URL(getApiUrl() + "/todos");
      for (const key in filters) {
        url.searchParams.append(key, filters[key]);
      }
      if (sorts.length > 0) url.searchParams.append("sort", sorts.join(" "));
      url.searchParams.append("page", currentPage);
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setTodos(result.content);
      setTotalPages(result.totalPages);
      setCurrentPage((prevCurrentPage) =>
        ajustCurrentPage(prevCurrentPage, totalPages)
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters, sorts]);
  const ajustCurrentPage = (currentPage, totalPages) => {
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    if (currentPage < 0) currentPage = 0;
    return currentPage;
  };
  const setPageHandler = useCallback(
    (number) => {
      ajustCurrentPage(number, totalPages);
      setCurrentPage(number);
    },
    [totalPages]
  );

  const addFiltersHandler = (name, priority, state) => {
    let params = {};
    if (name) params.name = name;
    if (priority) params.priority = priority;
    if (state) params.done = state;
    setFilters(params);
  };
  const addSortsHandler = (sort) => {
    const splitedSort = sort.split("-");
    setSorts((prevSorts) => {
      let newSorts = prevSorts.filter((s) => !s.startsWith(splitedSort[0]));
      if (splitedSort[1]) newSorts.push(sort);
      return newSorts;
    });
  };
  const contextValue = {
    todos: todos,
    errors: errors,
    messages: messages,
    pagination: { totalPages, currentPage },
    metrics: metrics,
    create: creteTodo,
    update: updateTodo,
    delete: deleteTodo,
    check: checkTodo,
    setPage: setPageHandler,
    addFilters: addFiltersHandler,
    addSorts: addSortsHandler,
    filter: getTodos,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
