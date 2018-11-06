import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {handleNotLoggedUserRedirection} from "../utils/helpers";

class Leaderboard extends Component {

  componentDidMount(){
    handleNotLoggedUserRedirection(this.props);
  }

  handleBack = () => {
    this.props.history.push("/");
  };

  rankedUsers = (usersId) => {
    return usersId.map(userId => {
      return (
        {
          id: userId,
          name: this.props.users[userId].name,
          avatarURL: this.props.users[userId].avatarURL,
          answers: Object.keys(this.props.users[userId].answers).length,
          questions: this.props.users[userId].questions.length,
          total: Object.keys(this.props.users[userId].answers).length +
            this.props.users[userId].questions.length,
        }
      )
    })
      .sort((a, b) => {
        return b.total - a.total
      })
  };

  render() {
    const {users, usersKeys, authedUser} = this.props;

    return (
      <Fragment>
        <h1>Leaderboard</h1>

        <div className="btn backBtn">
          <span onClick={this.handleBack}>Back</span>
        </div>

        <div className={"leaderboard-wrapper"}>
          <div className={"leaderboard-userInfo"}>
            {users[authedUser] && this.rankedUsers(usersKeys).map(user => {
              return (
                <div
                  key={user.id}
                  className={"leaderboard-userInfo-details"}>
                  <p>{user.name}</p>
                  <img
                    className={"avatar"}
                    src={user.avatarURL}
                    alt={user.name + "'s Avatar"}
                  />
                  <p>Answers: {user.answers}</p>
                  <p>Questions: {user.questions}</p>
                  <p><b>Total: {user.total}</b></p>
                </div>
              )
            })
            }
          </div>

        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    users,
    authedUser,
    usersKeys: Object.keys(users),
  }
}

export default withRouter(connect(mapStateToProps)(Leaderboard));