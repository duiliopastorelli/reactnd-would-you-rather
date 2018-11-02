import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserListElement from "./UserListElement";

class UserList extends Component {
  render() {
    return (
      <div>
        Please select an user
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