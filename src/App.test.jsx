import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ToastProvider } from "@app/hooks/toast-provider";
import { App } from "./App";
import { selectItem } from "./test-helpers";

const renderApp = (path) => {
  const queryClient = new QueryClient();
  const routes = [{ path: "*", element: <App /> }];
  const maybeOpts = path ? { initialEntries: [path] } : undefined;
  const router = createMemoryRouter(routes, maybeOpts);

  render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  );

  return router;
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
    renderApp("/?sortBy=price-high-to-low");

    const productDescriptions = [
      "LG TrueSteam™ F14U1JBS8 10Kg Washing Machine with 1400 rpm - Black", // product 1
      "Hotpoint Ultima S-Line RPD10667DD 10Kg Washing Machine with 1600 rpm - White", // product 10
    ];

    for (const productDescription of productDescriptions) {
      expect(await screen.findByText(productDescription)).toBeInTheDocument();
    }
  });

  it("UI state is reflected in the URL state", async () => {
    const router = renderApp();

    const productDescription1 = "Beko WM5122S 5Kg Washing Machine with 1200 rpm - Silver";
    expect(await screen.findByText(productDescription1)).toBeInTheDocument();

    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toBe("");

    selectItem("Sort By", "Price high to low");

    const productDescription2 =
      "LG TrueSteam™ F14U1JBS8 10Kg Washing Machine with 1400 rpm - Black";
    expect(await screen.findByText(productDescription2)).toBeInTheDocument();

    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toBe("?sortBy=price-high-to-low");
  });
});
