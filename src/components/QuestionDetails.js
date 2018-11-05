import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PoolListElement from "./PoolListElement";

class QuestionDetails extends Component {

  componentDidMount(){
    //Redirects the user to the login if is not logged in
    !this.props.authedUser &&
    !localStorage.loggedUser &&
    this.props.history.push("/login");
  };

  handleBack = () => {
    this.props.history.push("/");
  };

  render() {
    const questionId = this.props.match.params.questionId;
    const currentQuestion = this.props.questions[questionId];

    let authorData;
    if (currentQuestion)
      authorData = this.props.users[currentQuestion.author];

    return (
      <Fragment>
        <h1>Would you rather</h1>

        <div className="btn backBtn">
          <span onClick={this.handleBack}>Back</span>
        </div>

        <h2>Question details (id: {this.props.match.params.questionId})</h2>

        {authorData &&
        <div>
          <PoolListElement
            id={questionId}
            questions={currentQuestion}
            authorData={authorData}
            votingSection={true}
          />
        </div>
        }
      </Fragment>
    )
  }
}

function mapStateToPros({questions, users, authedUser}) {
  return {
    questions,
    users,
    authedUser,
  }
}

export default withRouter(connect(mapStateToPros)(QuestionDetails));