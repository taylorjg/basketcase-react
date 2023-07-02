import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "@app/hooks/use-toast";
import { App } from "./App";

const renderPage = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  );
};

describe("App test suite", () => {
  it("renders page with results of initial query", async () => {
    renderPage();
    const productDescriptions = [
      "Beko WM5122S 5Kg Washing Machine with 1200 rpm - Silver", // product 1
      "Hotpoint WMAO743P 7Kg Washing Machine with 1400 rpm - White", // product 10
    ];
    for (const productDescription of productDescriptions) {
      expect(await screen.findByText(productDescription)).toBeInTheDocument();
    }
  });
});
