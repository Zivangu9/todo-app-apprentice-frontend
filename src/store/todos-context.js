import React, { useCallback, useEffect, useState } from "react";
import { getApiUrl } from "../helper/Api";

const TodosContext = React.createContext({
  metrics: { generalAvg: 0, lowAvg: 0, mediumAvg: 0, highAvg: 0 },
  todos: [],
  pagination: { totalPages: 0, currentPage: 0 },
  setPage: () => {},
  filters: {},
  filter: () => {},
  addFilters: (name, priority, state) => {},
  addSort: (priority, dueDate) => {},
});

export const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 0,
  });
  const [metrics, setMetrics] = useState({
    generalAvg: 0,
    lowAvg: 0,
    mediumAvg: 0,
    highAvg: 0,
  });
  const [filters, setFilters] = useState({});

  const addFiltersHandler = (name, priority, state) => {
    let params = {};
    if (name) params.name = name;
    if (priority) params.priority = priority;
    if (state) params.done = state;
    setFilters(params, getData());
  };
  const ajustCurrentPage = (currentPage, totalPages) => {
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    if (currentPage < 0) currentPage = 0;
    return currentPage;
  };
  const setPageHandler = (number) => {
    setPagination((prevPagination) => {
      return {
        ...prevPagination,
        currentPage: ajustCurrentPage(number, prevPagination.totalPages),
      };
    });
  };
  const getMetrics = async () => {
    try {
      let url = new URL(getApiUrl() + "/todos/metrics");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("result is: ", JSON.stringify(result, null, 4));
      // console.log(result.content);
      setMetrics(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getData = useCallback(async () => {
    try {
      let url = new URL(getApiUrl() + "/todos");
      for (const key in filters) {
        url.searchParams.append(key, filters[key]);
      }
      if (pagination.currentPage)
        url.searchParams.append("page", pagination.currentPage);
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
      setPagination((prevPagination) => {
        return {
          totalPages: result.totalPages,
          currentPage: ajustCurrentPage(
            prevPagination.currentPage,
            result.totalPages
          ),
        };
      });
      getMetrics();
    } catch (err) {
      console.log(err.message);
    }
  }, [filters, pagination.currentPage]);
  useEffect(() => {
    getData();
  }, [filters, getData]);
  const addSortHandler = (priority, dueDate) => {};

  const contextValue = {
    todos: todos,
    pagination: pagination,
    metrics: metrics,
    filters: filters,
    setPage: setPageHandler,
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
