import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodosContextProvider } from "./store/todos-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodosContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodosContextProvider>
);
