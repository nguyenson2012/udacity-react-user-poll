import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginForm from "./components/login/LoginForm";

const mockStore = configureStore([]);

describe("LoginForm component", () => {
  let store;
  let component;

  const mockUsers = [
    { id: "user1", name: "User One" },
    { id: "user2", name: "User Two" },
  ];

  beforeEach(() => {
    store = mockStore({
      users: mockUsers,
    });

    component = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  });

  it("renders the LoginForm component", () => {
    const selectElement = component.getByTestId("user-select");
    expect(selectElement).toBeInTheDocument();
  });

  //   it("selects a user and triggers submit", async () => {
  //     const selectElement = component.getByTestId("user-select");
  //     fireEvent.click(selectElement);
  //     await waitFor(() => screen.getByText("% user1"));

  //     fireEvent.click(screen.getByText("% user1"));

  //     const submitButton = component.getByTestId("submit-button");
  //     fireEvent.click(submitButton);

  //     await waitFor(() => {
  //       const authUserAction = store
  //         .getActions()
  //         .find((action) => action.type === "SET_AUTH_USER");
  //       expect(authUserAction.payload).toEqual("user1");
  //     });
  //   });

  it("displays error when submitting without selecting a user", async () => {
    const submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorTextElement = component.getByTestId("error-text");
      expect(errorTextElement).toBeInTheDocument();
    });
  });
});
