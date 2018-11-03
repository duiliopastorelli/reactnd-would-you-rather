import React, {Component} from 'react';
import {connect} from 'react-redux';
import PoolListElement from "./PoolListElement";
import {filterQuestionsByUser} from "../utils/helpers";

class PoolList extends Component {

  state = {
    displayAnswered: false,
  };

  handleToggle = () => {
    this.setState(() => ({
      displayAnswered: !this.state.displayAnswered
    }))
  };

  render() {
    const {answeredQuestions, unansweredQuestions, users} = this.props;
    const currentQuestions = this.state.displayAnswered
      ? answeredQuestions
      : unansweredQuestions;

    return (
      <div>
        <div className={"poolBtn"}>
          <span
            onClick={this.handleToggle}
          >Display
            {this.state.displayAnswered ? " unanswered" : " answered"}
          </span>
        </div>

        <h2>{
        this.state.displayAnswered ? "Answered " : "Unanswered "
        } questions</h2>

        {currentQuestions.map((question) => {
          return <PoolListElement
            key={question.id}
            questions={question}
            author={this.props.users[question.author].name}
          />
        })}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}) {
  //Retrieve the questions filtered
  const filteredQuestions = filterQuestionsByUser(questions, authedUser);

  return {
    authedUser,
    unansweredQuestions: filteredQuestions.unanswered,
    answeredQuestions: filteredQuestions.answered,
    users,
  }
}

export default connect(mapStateToProps)(PoolList);