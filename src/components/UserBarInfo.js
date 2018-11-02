import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from "../actions/authedUser";

class UserBarInfo extends Component {


  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const {userName, avatarUrl, authedUser} = this.props;

    return (
      <Fragment>
        <span>{userName}</span>
        {avatarUrl !== "" &&
        <img src={avatarUrl} alt={userName + "'s Avatar"}/>}

        {/*Shows the logout link only if a user already logged in*/}
        {authedUser && <a href="#" onClick={this.handleLogout}>Logout</a>}

      </Fragment>
    )
  }
}

export default connect()(UserBarInfo);