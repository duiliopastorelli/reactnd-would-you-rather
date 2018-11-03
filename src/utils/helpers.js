/**
 * This function checks if the user is already logged in.
 * If not the user is redirected to the /login
 *
 * @param authedUser
 * @param history
 */
export function checkIfUserIsLogged(authedUser, history) {
  if (
    authedUser === null ||
    typeof authedUser === 'undefined'
  ) history.push('/login');
}

/**
 * Filters the questions for determine which have been answered or not
 *
 * @param questions
 * @param authedUser
 * @returns {{unanswered, answered}}
 */
export function filterQuestionsByUser(questions, authedUser){
  const unanswered=[];
  const answered=[];

  for(const key of Object.keys(questions)){

    //Check if the authed user voted for any of the available options
    if(
      questions[key].optionOne.votes.includes(authedUser) ||
      questions[key].optionTwo.votes.includes(authedUser)
    ){
      answered.push(questions[key]);
    } else {
      unanswered.push(questions[key]);
    }
  }

  answered.sort((a, b) => a.timestamp - b.timestamp);

  return {unanswered, answered}
}