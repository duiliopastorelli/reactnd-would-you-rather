import {ADD_USER_QUESTIONS, RECEIVE_USERS} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case ADD_USER_QUESTIONS:
      //Adds the new question to the user questions array
      state[action.question.author].questions.push(action.question.newQuestion);
      return {
        ...state,
      };

    default:
      return state
  }
}