import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const selectItem = (selectLabelText, selectItemText) => {
  const selectComponent = screen.getByLabelText(selectLabelText);
  fireEvent.mouseDown(within(selectComponent).getByRole("button"));
  const listbox = screen.getByRole("listbox");
  userEvent.click(within(listbox).getByText(selectItemText));
};
