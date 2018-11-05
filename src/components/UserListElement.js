import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {setAuthedUser} from '../actions/authedUser';
import PropTypes from 'prop-types'

class UserListElement extends Component {
  handleUserSelection = (e) => {
    e.preventDefault();

    //Update the state with the selected authedUser
    this.props.dispatch(setAuthedUser(this.props.userId));

    //todo persist the authedUser in the local storage

    //Redirect the user to the previous page visited
    this.props.history.goBack();
  };

  render() {
    const {currentUserData, userId} = this.props;
    const data = currentUserData[userId];

    return (
      <li onClick={this.handleUserSelection}>
        <span>
          <img
            src={data.avatarURL}
            alt={data.name + "'s avatar"}/>
          <span>{data.name}</span>
        </span>
      </li>
    )
  }
}

UserListElement.propTypes = {
  currentUserData: PropTypes.object.isRequired,
};

function mapStateToProps({users}) {
  return {
    currentUserData: users
  }
}

export default withRouter(connect(mapStateToProps)(UserListElement));