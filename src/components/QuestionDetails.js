import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import PoolListElement from "./PoolListElement";
import {handleNotLoggedUserRedirection} from "../utils/helpers";

class QuestionDetails extends Component {

  componentDidMount(){
    //Redirects the user to the login if is not logged in
    handleNotLoggedUserRedirection(this.props);
  };

  //Handle the 'back' button functionality
  handleBack = () => {
    this.props.history.push("/");
  };

  render() {
    const questionId = this.props.match.params.questionId;
    const currentQuestion = this.props.questions[questionId];

    let authorData;
    //Checks if the currentQuestion is a thing, because this data is
    // retrieved asynchronously
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

QuestionDetails.propTypes = {
  authedUser: PropTypes.string,
  users: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
};

function mapStateToPros({authedUser, users, questions}) {
  return {
    authedUser,
    users,
    questions,
  }
}

export default withRouter(connect(mapStateToPros)(QuestionDetails));