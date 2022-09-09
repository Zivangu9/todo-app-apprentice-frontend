import React, { useCallback, useEffect, useState } from "react";
import { getApiUrl } from "../helper/Api";
import { getMetrics } from "../helper/HttpRequests";

const TodosContext = React.createContext({
  metrics: { generalAvg: 0, lowAvg: 0, mediumAvg: 0, highAvg: 0 },
  todos: [],
  pagination: { totalPages: 0, currentPage: 0 },
  setPage: () => {},
  filter: () => {},
  addFilters: (name, priority, state) => {},
  addSorts: (priority, dueDate) => {},
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
  const [priorirySort, setPrioritySort] = useState("");
  const [dueDateSort, setDueDateSort] = useState("");
  const [isPrioriryFirst, setIsPrioriryFirst] = useState(true);

  const ajustCurrentPage = (currentPage, totalPages) => {
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    if (currentPage < 0) currentPage = 0;
    return currentPage;
  };
  const setPageHandler = (number) => {
    ajustCurrentPage(number, totalPages);
    setCurrentPage(number);
  };
  const getData = useCallback(async () => {
    try {
      let url = new URL(getApiUrl() + "/todos");
      for (const key in filters) {
        url.searchParams.append(key, filters[key]);
      }
      if (priorirySort || dueDateSort)
        if (isPrioriryFirst)
          url.searchParams.append("sort", `${priorirySort} ${dueDateSort}`);
        else url.searchParams.append("sort", `${dueDateSort} ${priorirySort}`);
      if (currentPage) url.searchParams.append("page", currentPage);
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setTodos(result.content);
      await setTotalPages(result.totalPages);
      setCurrentPage((prevCurrentPage) =>
        ajustCurrentPage(prevCurrentPage, totalPages)
      );
      getMetrics(setMetrics);
    } catch (err) {
      console.log(err.message);
    }
  }, [filters, priorirySort, dueDateSort, isPrioriryFirst, currentPage, totalPages]);
  useEffect(() => {
    getData();
  }, [filters, getData]);
  const addFiltersHandler = (name, priority, state) => {
    let params = {};
    if (name) params.name = name;
    if (priority) params.priority = priority;
    if (state) params.done = state;
    setFilters(params, getData());
  };
  const addSortsHandler = useCallback(
    async (priority, dueDate) => {
      if (priorirySort !== priority) {
        await setIsPrioriryFirst(true);
        await setPrioritySort(priority);
      }
      if (dueDateSort !== dueDate) {
        await setIsPrioriryFirst(false);
        await setDueDateSort(dueDate);
      }
      getData();
    },
    [getData, dueDateSort, priorirySort, setPrioritySort, setDueDateSort, setIsPrioriryFirst]
  );
  const contextValue = {
    todos: todos,
    pagination: { totalPages, currentPage },
    metrics: metrics,
    setPage: setPageHandler,
    addFilters: addFiltersHandler,
    addSorts: addSortsHandler,
    filter: getData,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
