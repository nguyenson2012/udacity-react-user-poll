import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

describe("_saveQuestion", () => {
  it("will return true if can save question", async () => {
    const questionInput = {
      optionOneText: "Messi",
      optionTwoText: "Ronaldo",
      author: "PEP",
    };
    const response = await _saveQuestion(questionInput);
    expect(response.id).toBeDefined();
    expect(response.timestamp).toBeDefined();
    expect(response.author).toBeDefined();
    expect(response.optionOne).toBeDefined();
    expect(response.optionTwo).toBeDefined();
  });
  it("will return error if input is not correct", async () => {
    const questionInput = {
      optionOneText: "Messi",
      optionTwoText: "Ronaldo",
    };
    await expect(_saveQuestion(questionInput)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return true if can save answer of question", async () => {
    const answerInput = {
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    };
    const response = await _saveQuestionAnswer(answerInput);
    expect(response).toEqual(true);
  });
  it("will return error if input is not correct", async () => {
    const answerInput = {
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
    };
    await expect(_saveQuestionAnswer(answerInput)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
