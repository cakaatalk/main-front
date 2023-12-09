import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { AuthProvider } from "./Contexts/AuthContext";
import "./css/components/styles.css";
import { FriendsProvider } from "./Contexts/FriendsContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FriendsProvider>
        <App />
      </FriendsProvider>
    </AuthProvider>
  </React.StrictMode>
);
