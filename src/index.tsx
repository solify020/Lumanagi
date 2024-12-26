import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { Web3ReactProvider } from "@web3-react/core";

import connectors from "./connectors/index";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <App />
      </SnackbarProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
