import { saveQuestion } from "../api/apiService";
import { addQuestionOfUser } from "../actions/users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_FOR_QUESTION = "ADD_ANSWER_FOR_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addAnswerForQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_FOR_QUESTION,
    authUser,
    qid,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleSaveQuestion(optionOne, optionTwo, author) {
  return (dispatch) => {
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addQuestionOfUser(question));
    });
  };
}
