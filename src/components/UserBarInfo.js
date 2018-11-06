import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {setAuthedUser} from '../actions/authedUser';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {persistLogin} from "../utils/helpers";

class UserBarInfo extends Component {

  handleLogout = () => {

    this.props.dispatch(setAuthedUser(null));

    //Remove the user token value
    persistLogin();

    this.props.history.push("/");
  };

  render() {
    const {userName, avatarUrl, authedUser} = this.props;

    return (
      <Fragment>
        <span className={"barInfo-element"}>{userName}</span>
        {avatarUrl !== "" &&
        <img
          className={"avatar"}
          src={avatarUrl}
          alt={userName + "'s Avatar"}
        />}

        {/*Shows the logout link only if a user already logged in, otherwise
         show the login link*/}
        {authedUser !== null
          ? <Fragment>
            <Link className={"barInfo-element"} to={"/leaderboard"}>Leaderboard</Link>
            <Link className={"barInfo-element"} to={"/add"}>Add Question</Link>
            <span className={"logoutLink"}
                  onClick={this.handleLogout}>Logout</span>
          </Fragment>
          : <Link to={'/login'}>Login</Link>
        }

      </Fragment>
    )
  }
}

UserBarInfo.propTypes = {
  userName: PropTypes.string.isRequired,
  avatarURL: PropTypes.string,
  authedUser: PropTypes.string,
};

export default withRouter(connect()(UserBarInfo));