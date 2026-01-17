import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../store/store";
import { theme } from "../theme";

if (typeof window.ResizeObserver === "undefined") {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MantineProvider theme={theme}>{ui}</MantineProvider>
    </Provider>
  );
}
