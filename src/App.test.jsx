import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ToastProvider } from "@app/hooks/toast-provider";
import { App } from "./App";

const renderApp = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
};

describe("App test suite", () => {
  it("renders page with results of initial query", async () => {
    renderApp();
    const productDescriptions = [
      "Beko WM5122S 5Kg Washing Machine with 1200 rpm - Silver", // product 1
      "Hotpoint WMAO743P 7Kg Washing Machine with 1400 rpm - White", // product 10
    ];
    for (const productDescription of productDescriptions) {
      expect(await screen.findByText(productDescription)).toBeInTheDocument();
    }
  });
});
