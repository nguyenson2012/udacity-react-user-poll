import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PollQuestion from "./PollQuestion";

const mockStore = configureStore([]);

describe("PollQuestion component", () => {
  let store;
  let component;
  const mockAuthUser = "user123";
  const mockQuestion = {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  };

  beforeEach(() => {
    store = mockStore({
      authUser: mockAuthUser,
    });

    component = render(
      <Provider store={store}>
        <PollQuestion authUser={mockAuthUser} question={mockQuestion} />
      </Provider>
    );
  });

  it("renders the PollQuestion component", () => {
    const radioElement = component.getByText(
      "Build our new application with Javascript"
    );
    expect(radioElement).toBeInTheDocument();
  });

  it("selects an option and check submit", () => {
    const radioElement = component.getByText(
      "Build our new application with Javascript"
    );
    fireEvent.click(radioElement);

    const submitButton = component.getByText("Submit");
    expect(submitButton.closest("button")).toBeEnabled();
  });

  it("disables the submit button if no option is selected", () => {
    const submitButton = component.getByText("Submit");
    expect(submitButton.closest("button")).toHaveAttribute("disabled");
  });
});
