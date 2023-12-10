import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import "./css/components/styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
