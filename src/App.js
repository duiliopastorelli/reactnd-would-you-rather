import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch} from "react-router";
import {Route} from 'react-router-dom';
import {getInitialUsers, getInitialQuestions} from './actions/shared';
import UserList from './components/UserList';
import Welcome from './components/Welcome';
import UserBarInfo from "./components/UserBarInfo";
import PoolList from "./components/PoolList";
import QuestionDetails from "./components/QuestionDetails";
import {setAuthedUser} from "./actions/authedUser";
import NotFound from "./components/NotFound";
import Add from "./components/Add";

class App extends Component {

  componentDidMount() {
    //Retrieve the Users from the DB
    this.props.dispatch(getInitialUsers());

    //Set the Store's authUser accordingly with the localStorage
    localStorage.loggedUser &&
    this.props.dispatch(setAuthedUser(localStorage.loggedUser));

    //Retrieve the questions from the DB
    this.props.dispatch(getInitialQuestions(this.props.history));
  }

  componentDidUpdate(prevProps) {
    //For consistency the app assures that the user is always logged in
    // if (this.props.authedUser !== prevProps.authedUser)
    //   checkIfUserIsLogged(this.props.authedUser, this.props.history);
  }

  render() {
    //Set default values for the UserBarInfo Component
    const userBarInfo = {};
    this.props.users[this.props.authedUser]
      ? userBarInfo.name = this.props.users[this.props.authedUser].name
      : userBarInfo.name = "User not logged in";

    this.props.users[this.props.authedUser]
      ? userBarInfo.avatarURL = this.props.users[this.props.authedUser].avatarURL
      : userBarInfo.avatarURL = "";

    return (
      <Fragment>
        <header>
          {
            <UserBarInfo
              userName={userBarInfo.name}
              avatarUrl={userBarInfo.avatarURL}
              authedUser={this.props.authedUser}
            />
          }
        </header>

        <div className={"appWrapper"}>

          <Switch>
            <Route exact path={"/"} render={() => (
              <Fragment>
                <h1>Would you Rather</h1>
                {!this.props.authedUser && <Welcome/>}
                {this.props.authedUser && <PoolList/>}
              </Fragment>
            )
            }/>

            <Route exact path={"/login"} component={UserList}/>

            <Route exact path={"/404"} component={NotFound}/>

            <Route exact path={"/add"} component={Add}/>
            <Route
              path={"/questions/:questionId"}
              component={QuestionDetails}
            />

            <Route component={NotFound} />
          </Switch>

        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    users,
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(App));