import {combineReducers} from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

//Main reducer
export default combineReducers({
  authedUser,
  users,
  questions
})