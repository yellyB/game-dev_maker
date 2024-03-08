import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./context/state.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);
