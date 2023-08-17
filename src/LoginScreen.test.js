import { render, fireEvent, waitFor } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import middleware from "./middleware";
import LoginScreen from "./components/login/LoginScreen";

const store = createStore(rootReducer, middleware);

test("render LoginScreen", async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const component = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
  const { getByText } = component;
  expect(getByText("Sign In")).toBeInTheDocument();
});

test("click submit button when not choose user", async () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const component = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
  var submitBtn = component.getByTestId("submit-button");

  await waitFor(() => {
    fireEvent.click(submitBtn);
    expect(component.getByTestId("error-text")).toBeInTheDocument();
  });
});
