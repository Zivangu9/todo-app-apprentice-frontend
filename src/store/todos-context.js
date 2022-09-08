import React, { useState } from "react";
import { getApiUrl } from "../helper/Api";

const TodosContext = React.createContext({
  todos: [],
  filter: (name, priority, state) => {},
  sort: (priority, dueDate) => {},
});

export const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  //   const userIsLoggedIn = !!token;

  const filterHandler = async (name, priority, state) => {
    try {
      let params = {};
      if (name) params.name = name;
      if (priority) params.priority = priority;
      if (state) params.done = state;
      let url = new URL(getApiUrl() + "/todos");
      for (const key in params) {
        url.searchParams.append(key, params[key]);
      }
      console.log(url);
      console.log(params);
      
      const response = await fetch(
        url,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("result is: ", JSON.stringify(result, null, 4));
      console.log(result.content);
      setTodos(result.content);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sortHandler = (priority, dueDate) => {
    // setToken(null);
  };

  const contextValue = {
    todos: todos,
    filter: filterHandler,
    sort: sortHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
