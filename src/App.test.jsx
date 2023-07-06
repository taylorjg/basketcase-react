import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ToastProvider } from "@app/hooks/toast-provider";
import { App } from "./App";

const renderApp = (path) => {
  const queryClient = new QueryClient();
  const routes = [{ path: "*", element: <App /> }];
  const maybeOpts = path ? { initialEntries: [path] } : undefined;
  const router = createMemoryRouter(routes, maybeOpts);

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
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

  it("URL state is reflected in the UI state", async () => {
    renderApp("/?sortBy=1");
    const productDescriptions = [
      "LG TrueSteam™ F14U1JBS8 10Kg Washing Machine with 1400 rpm - Black", // product 1
      "Hotpoint Ultima S-Line RPD10667DD 10Kg Washing Machine with 1600 rpm - White", // product 10
    ];
    for (const productDescription of productDescriptions) {
      expect(await screen.findByText(productDescription)).toBeInTheDocument();
    }
  });
});
