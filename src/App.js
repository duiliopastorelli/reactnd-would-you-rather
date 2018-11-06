import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch} from "react-router";
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getInitialUsers, getInitialQuestions} from './actions/shared';
import UserList from './components/UserList';
import Welcome from './components/Welcome';
import UserBarInfo from "./components/UserBarInfo";
import PoolList from "./components/PoolList";
import QuestionDetails from "./components/QuestionDetails";
import {setAuthedUser} from "./actions/authedUser";
import NotFound from "./components/NotFound";
import Add from "./components/Add";
import Leaderboard from "./components/Leaderboard";

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

            <Route exact path={"/leaderboard"} component={Leaderboard} />

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

App.propTypes = {
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string
};

function mapStateToProps({users, authedUser}) {
  return {
    users,
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(App));