import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserListElement from './UserListElement';
import PropTypes from 'prop-types';

class UserList extends Component {
  render() {
    return (
      <div className={"userList"}>
        <h2>Please select an user</h2>

        <ul>
          {this.props.userIds.map(user =>
            <UserListElement
              key={user}
              userId={user}
            />)}
        </ul>
      </div>
    )
  }
}

UserList.propTypes = {
  userIds: PropTypes.array.isRequired,
};

function mapStateToProps({users}){
  return {
    userIds:Object.keys(users)
      .sort(function(a, b) {
        //Sort the names alphabetically
        return a.toLowerCase().localeCompare(b.toLowerCase());
      })
  }
}

export default connect(mapStateToProps)(UserList);