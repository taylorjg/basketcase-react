import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

import { ToastProvider } from "@app/hooks/toast-provider";

import { App } from "./App.jsx";
import { GlobalStyles } from "./Global.styles";

const root = document.getElementById("root");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyles} />
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
