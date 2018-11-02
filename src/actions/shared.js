import {_getUsers, _getQuestions} from "../utils/_DATA";
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";

export function getInitialUsers() {
  //Thunk pattern for async request
  return (dispatch) => {
    //Retrieve the users from the DB
    return _getUsers()
      .then((users) => {
        //Dispatch the action for update the UI
        dispatch(receiveUsers(users))
      })
  }
}

export function getInitialQuestions() {
  return (dispatch) => {
    //retrieve the questions from the DB
    return _getQuestions()
      .then((questions)=> {
        dispatch(receiveQuestions(questions))
      })
  }
}