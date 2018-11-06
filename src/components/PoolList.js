import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PoolListElement from "./PoolListElement";
import {filterQuestionsByUser} from "../utils/helpers";

class PoolList extends Component {

  state = {
    displayAnswered: false,
  };

  //Handle the toggle functionality between the unanswered and the answered
  // questions
  handleToggle = () => {
    this.setState(() => ({
      displayAnswered: !this.state.displayAnswered
    }))
  };

  render() {
    const {answeredQuestions, unansweredQuestions} = this.props;

    //Define which questions the UI should render, depending on the current
    // state
    const currentQuestions = this.state.displayAnswered
      ? answeredQuestions
      : unansweredQuestions;

    return (
      <div>
        <div className={"btn poolBtn"}>
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
          return (
            <Link
              key={question.id}
              to={"/questions/" + question.id}
              className={"poolList-link"}
            >
              <PoolListElement
                id={question.id}
                questions={question}
                authorData={this.props.users[question.author]}
              />
            </Link>
          )
        })}
      </div>
    )
  }
}

PoolList.propTypes = {
  authedUser: PropTypes.string,
  unansweredQuestions: PropTypes.array.isRequired,
  answeredQuestions: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};

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