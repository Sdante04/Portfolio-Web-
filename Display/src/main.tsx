import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

// Si tu App ya importa estilos, podés borrar estas líneas.
// Si NO, dejalas para asegurar que carguen.
import "./styles/index.css";
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);