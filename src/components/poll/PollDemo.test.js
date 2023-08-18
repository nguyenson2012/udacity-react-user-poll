import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import PollDemo from "./PollDemo";

describe("PollDemo component", () => {
  it("renders the PollDemo component", () => {
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

    const { getByText } = render(
      <PollDemo question={mockQuestion} unanswered={true} />
    );
    const optionOneText = getByText(
      "Build our new application with Javascript",
      { exact: false }
    );
    expect(optionOneText).toBeInTheDocument();
  });

  it("redirects to question page when button is clicked", () => {
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

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <PollDemo question={mockQuestion} unanswered={true} />
      </Router>
    );

    const button = getByText("Poll Available");
    fireEvent.click(button);

    expect(history.location.pathname).toBe(`/questions/${mockQuestion.id}`);
  });
});
