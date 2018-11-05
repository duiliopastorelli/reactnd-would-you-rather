import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/authedUser';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class UserBarInfo extends Component {


  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const {userName, avatarUrl, authedUser} = this.props;

    return (
      <Fragment>
        <span className={"barInfo--userName"}>{userName}</span>
        {avatarUrl !== "" &&
        <img
          className={"avatar"}
          src={avatarUrl}
          alt={userName + "'s Avatar"}
        />}

        {/*Shows the logout link only if a user already logged in, otherwise
         show the login link*/}
        {authedUser
          ? <span className={"logoutLink"} onClick={this.handleLogout}>Logout</span>
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

export default connect()(UserBarInfo);