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