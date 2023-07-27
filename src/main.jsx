// import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
  // https://stackoverflow.com/a/60619061
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Global styles={GlobalStyles} />
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);

if (window.location.hostname !== "localhost") {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-VRT62SH6ZY";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-VRT62SH6ZY');
  `;
  document.head.appendChild(script2);
}
