export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTIONS = 'ADD_USER_QUESTIONS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addUserQuestions(question) {
  return {
    type: ADD_USER_QUESTIONS,
    question
  }
}