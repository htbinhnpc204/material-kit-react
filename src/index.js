import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "components/AuthContext/authContext";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
