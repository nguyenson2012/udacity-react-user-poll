import { saveQuestionAnswer } from "../utils/api";
import { addAnswerForQuestion } from "../actions/questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_OF_USER = "ADD_ANSWER_OF_USER";
export const ADD_QUESTION_OF_USER = "ADD_QUESTION_OF_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addAnswerOfUser(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_OF_USER,
    authUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerOfUser(authUser, qid, answer));
    dispatch(addAnswerForQuestion(authUser, qid, answer));

    return saveQuestionAnswer(authUser, qid, answer).catch((e) => {
      console.warn("Error handleSaveQuestionAnswer:", e);
    });
  };
}

export function addQuestionOfUser({ id, author }) {
  return {
    type: ADD_QUESTION_OF_USER,
    id,
    author,
  };
}
