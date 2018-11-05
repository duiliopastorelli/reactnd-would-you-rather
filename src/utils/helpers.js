/**
 * Filters the questions for determine which have been answered or not
 *
 * @param questions
 * @param authedUser
 * @returns {{unanswered, answered}}
 */
export function filterQuestionsByUser(questions, authedUser) {
  const unanswered = [];
  const answered = [];

  for (const key of Object.keys(questions)) {

    //Check if the authed user voted for any of the available options
    if (
      questions[key].optionOne.votes.includes(authedUser) ||
      questions[key].optionTwo.votes.includes(authedUser)
    ) {
      answered.push(questions[key]);
    } else {
      unanswered.push(questions[key]);
    }
  }

  answered.sort((a, b) => a.timestamp - b.timestamp);

  return {unanswered, answered}
}

/**
 * Checks if the question has already been voted by the current logged in user
 *
 * @param question
 * @param authedUser
 * @returns {boolean}
 */
export function checkIfAlreadyVoted(question, authedUser) {
  return question.votes.includes(authedUser);
}

/**
 * Given the available questions returns the stats for all of them a a new
 * array of object
 *
 * @param questions
 * @returns {Array}
 */
export function getStats(questions) {

  /**
   * Given 2 numbers, returns an objects containing the percentages between them
   *
   * @param a
   * @param b
   * @returns {{a: number, b: number}}
   */
  function getPercentile(a, b) {
    if (a + b > 0) {
      return {
        a: Math.round(a / (a + b) * 100),
        b: 100 - Math.round(a / (a + b) * 100),
      }
    } else {
      return {
        a: 0,
        b: 0,
      }
    }
  }

  //The result array that will be eventually returned
  let result = {};

  //Iterate through the question for populate the partial result
  for (const key of Object.keys(questions)) {
    const partialResult = {
      questionId: "",
      optionOne: {},
      optionTwo: {},
    };

    let percentage =
      getPercentile(
        questions[key].optionOne.votes.length,
        questions[key].optionTwo.votes.length
      );

    partialResult.questionId = key;
    partialResult.optionOne.votersNumber =
      questions[key].optionOne.votes.length;
    partialResult.optionTwo.votersNumber =
      questions[key].optionTwo.votes.length;
    partialResult.optionOne.votersPercent = percentage.a;
    partialResult.optionTwo.votersPercent = percentage.b;

    //Add the partial result data to the final result array
    result[partialResult.questionId] = partialResult;

  }

  return result;
}

/**
 * Persists the value of the user in the local storage, or removes the key
 * if no value is passed
 *
 * @param user
 */
export function persistLogin(user) {
  user
    ? localStorage.loggedUser = user
    : localStorage.removeItem("loggedUser");
}

export function handleNotLoggedUserRedirection(props) {
  //Redirects the user to the login if is not logged in
  !props.authedUser &&
  !localStorage.loggedUser &&
  props.history.push("/login");
}