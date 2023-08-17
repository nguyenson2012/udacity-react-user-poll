import { initialData } from "../api/apiService";
import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";

export function initData() {
  return (dispatch) => {
    return initialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}
