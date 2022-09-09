import { getApiUrl } from "./Api";

export const creteTodo = async ({name, priority, dueDate}) => {
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
      throw new Error(`Error! status: ${response.status}`);
    }
    if (response.status === 400) {
      const result = await response.json();
      console.log(
        result.errors.map((error) => {
          return error.defaultMessage;
        })
      );
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const updateTodo = async ({id, name, priority, dueDate}) => {
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
      throw new Error(`Error! status: ${response.status}`);
    }
    if (response.status === 400) {
      const result = await response.json();
      console.log(
        result.errors.map((error) => {
          return error.defaultMessage;
        })
      );
      return;
    }
    if (response.status === 404) {
      console.log("Not Found");
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(getApiUrl() + "/todos/" + id, {
      method: "DELETE",
    });
    if (!response.ok && response.status !== 404) {
      throw new Error(`Error! status: ${response.status}`);
    }
    if (response.status === 404) {
      console.log("Not Found");
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};
export const checkTodo = async (id, done) => {
  try {
    const response = await fetch(
      `${getApiUrl()}/todos/${id}/${!done ? "done" : "undone"}`,
      {
        method: "PUT",
      }
    );
    if (!response.ok && response.status !== 404) {
      throw new Error(`Error! status: ${response.status}`);
    }
    if (response.status === 404) {
      console.log("Not Found");
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};
