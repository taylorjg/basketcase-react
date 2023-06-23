describe("happy path scenarios", () => {
  it("renders page with results of initial query", () => {
    cy.visit("/");
    const productDescriptions = [
      "Beko WM5122S 5Kg Washing Machine with 1200 rpm - Silver", // product 1
      "Hotpoint WMAO743P 7Kg Washing Machine with 1400 rpm - White", // product 10
    ];
    for (const productDescription of productDescriptions) {
      cy.findByText(productDescription);
    }
  });
});
