import {_getUsers, _getQuestions, _saveQuestionAnswer} from "../utils/_DATA";
import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {receiveStats} from "./stats";
import {getStats} from "../utils/helpers";

export function getInitialUsers() {
  //Thunk pattern for async request
  return (dispatch) => {
    //Retrieve the users from the DB
    return _getUsers()
      .then((users) => {
        //Dispatch the action for update the UI
        dispatch(receiveUsers(users));
      })
  }
}

export function getInitialQuestions(history) {
  return (dispatch) => {
    //Retrieve the questions from the DB
    return _getQuestions()
      .then((questions) => {
        dispatch(receiveQuestions(questions));
        dispatch(receiveStats(getStats(questions)));

        //Checks if the question displayed in the /questions/ route is
        // available in the DB, if not redirects the user to a 404 page
        if(history.location.pathname.indexOf("/questions/") !== -1){
          if(!questions.hasOwnProperty(history.location.pathname.slice(11))){
            history.push("/404");
          }
        }
      })
  }
}

export function saveAnswer(data) {
  return (dispatch) => {

    //Persist the answer in the DB
    return _saveQuestionAnswer(data)
      .then((res) => {
        dispatch(receiveUsers(res.users));
        dispatch(receiveQuestions(res.questions));
        dispatch(receiveStats(getStats(res.questions)));
      })
  }
}