import { useCallback, useState } from "react";
import { getApiUrl } from "./Api";
const useTodosRequests = () => {
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);
  const addErrors = (errors) => {
    setErrors((prev) => [...prev, ...errors]);
  };
  const addMessages = (messages) => {
    setMessages((prev) => [...prev, ...messages]);
  };
  const creteTodo = useCallback(async ({ name, priority, dueDate }) => {
    try {
      const response = await fetch(getApiUrl() + "/todos", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          priority: priority,
          dueDate: dueDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok && response.status !== 400) {
        addErrors(["Server Error"]);
      }
      if (response.status === 400) {
        const result = await response.json();
        addErrors(result.errors.map((error) => {
          return error.defaultMessage;
        }));
        return;
      }
      addMessages(["Todo Saved"])
    } catch (err) {
      addErrors([err.message]);
      console.log(err.message);
    }
  }, []);

  const updateTodo = useCallback(async ({ id, name, priority, dueDate }) => {
    try {
      const response = await fetch(getApiUrl() + "/todos/" + id, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          priority: priority,
          dueDate: dueDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok && response.status !== 400 && response.status !== 404) {
        addErrors(["Server Error"]);
      }
      if (response.status === 400) {
        const result = await response.json();
        addErrors(result.errors.map((error) => {
          return error.defaultMessage;
        }));
        return;
      }
      if (response.status === 404) {
        addErrors(["Not Found"]);
        return;
      }
      addMessages(["Todo Updated"])
    } catch (err) {
      addErrors([err.message]);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      const response = await fetch(getApiUrl() + "/todos/" + id, {
        method: "DELETE",
      });
      if (!response.ok && response.status !== 404) {
        addErrors(["Server Error"]);
      }
      if (response.status === 404) {
        addErrors(["Not Found"]);
        return;
      }
      addMessages(["Todo Deleted"])
    } catch (err) {
      addErrors([err.message]);
    }
  }, []);
  const checkTodo = useCallback(async (id, done) => {
    try {
      const response = await fetch(
        `${getApiUrl()}/todos/${id}/${!done ? "done" : "undone"}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok && response.status !== 404) {
        addErrors(["Server Error"]);
      }
      if (response.status === 404) {
        addErrors(["Not Found"]);
        return;
      }
    } catch (err) {
      addErrors([err.message]);
    }
  }, []);
  const getMetrics = useCallback(async (setMetrics) => {
    try {
      let url = new URL(getApiUrl() + "/todos/metrics");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setMetrics(result);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return {
    creteTodo,
    updateTodo,
    deleteTodo,
    checkTodo,
    getMetrics,
    errors,
    messages,
  };
};

export default useTodosRequests;
