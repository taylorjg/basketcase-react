import { fireEvent, screen } from "@testing-library/react";

const sortByLabelsToValues = {
  "Price low to high": "price-low-to-high",
  "Price high to low": "price-high-to-low",
  "Average rating": "average-rating",
  "Review count": "review-count",
};

export const selectItem = (selectLabelText, selectItemText) => {
  const value = sortByLabelsToValues[selectItemText] ?? selectItemText;
  const labeled = screen.getByLabelText(selectLabelText);
  const selectRoot =
    labeled.closest(".MuiSelect-root") ?? labeled.closest(".MuiInputBase-root") ?? labeled;
  const nativeInput = selectRoot.querySelector(".MuiSelect-nativeInput");

  fireEvent.change(nativeInput, { target: { value } });
};
