import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {Route} from 'react-router-dom';
import {getInitialUsers, getInitialQuestions} from './actions/shared';
import {checkIfUserIsLogged} from "./utils/helpers";
import UserList from './components/UserList';
import Welcome from './components/Welcome';
import UserBarInfo from "./components/UserBarInfo";

class App extends Component {

  componentDidMount() {
    //Retrieve the Users from the DB
    this.props.dispatch(getInitialUsers());

    //Retrieve the questions from the DB
    this.props.dispatch(getInitialQuestions());
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
          <h1>Would you Rather</h1>

          {!this.props.authedUser && <Welcome/>}

          <Route exact path={"/login"} component={UserList}/>
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