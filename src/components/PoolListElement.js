import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {checkIfAlreadyVoted} from "../utils/helpers";
import {saveAnswer} from "../actions/shared";

class PoolListElement extends Component {
  componentDidMount() {

    this.isUserInQuestionsPath();

    //Checks if the current question has already been voted
    this.setState(() => ({
      //Assign true if either the 1st or the 2nd question got the authedUser
      // vote
      isVoted:
        checkIfAlreadyVoted(
          this.props.questions.optionOne, this.props.authedUser
        ) ||
        checkIfAlreadyVoted(
          this.props.questions.optionTwo, this.props.authedUser
        )
    }));
  }

  handleVoting = (answer) => {
    console.log(answer);
    //Checks if the voting button is enabled
    if (!this.state.isVotingDisabled) {
      let authedUser = this.props.authedUser;
      let qid = this.props.id;

      //Makes the voting button disabled
      this.setState({
        isVotingDisabled: true,
      });

      //Persist the new info on the DB
      this.props.dispatch(saveAnswer(
        {
          authedUser: authedUser,
          qid: qid,
          answer: answer,
        }))
      //Update the UI
        .then(() => {
            this.setState({
              isVoted: true,
            });
          }
        );
    }
  };

  isUserInQuestionsPath = () => {
    return this.props.location.pathname.indexOf('/questions/') !== -1;
  };

  state = {
    isVoted: null,
    isVotingDisabled: false
  };

  render() {
    const {optionOne, optionTwo} = this.props.questions;
    const {authorData} = this.props;

    return (
      <div className={"poolList-element"}>
        <div className={"poolList-element__wrapper"}>
          <div
            className={"poolList-element__question" +
            (checkIfAlreadyVoted(
              this.props.questions.optionOne, this.props.authedUser) ?
              " poolList-element__question--selected" : "")}
          >
            <span>Option 1: {optionOne.text}</span>

            {this.isUserInQuestionsPath() &&
            this.state.isVoted &&
            this.props.stats[this.props.id] &&
            <span>
              <span className={"votersNumber"}>
                # of voters: {this.props.stats[this.props.id].optionOne.votersNumber}
              </span>
              <span>
              {this.props.stats[this.props.id].optionOne.votersPercent} %
            </span>
            </span>
            }

            {!this.state.isVoted &&
            this.props.votingSection &&
            <div className={
              "poolBtn" +
              (this.state.isVotingDisabled ? " poolBtn--disabled" : "")
            }>
              <span onClick={() => this.handleVoting("optionOne")}>Vote</span>
            </div>
            }
          </div>

          <hr/>

          <div className={"poolList-element__question" +
          (checkIfAlreadyVoted(
            this.props.questions.optionTwo, this.props.authedUser) ?
            " poolList-element__question--selected" : "")}>
            <span>Option 2: {optionTwo.text}</span>

            {this.isUserInQuestionsPath() &&
            this.state.isVoted &&
            this.props.stats[this.props.id] &&
            <span>
              <span className={"votersNumber"}>
              # of voters: {this.props.stats[this.props.id].optionTwo.votersNumber}
              </span>
              <span>
              {this.props.stats[this.props.id].optionTwo.votersPercent} %
            </span>
            </span>
            }

            {!this.state.isVoted &&
            this.props.votingSection &&
            <div className={
              "poolBtn" +
              (this.state.isVotingDisabled ? " poolBtn--disabled" : "")
            }>
              <span onClick={() => this.handleVoting("optionTwo")}>Vote</span>
            </div>
            }
          </div>
        </div>

        <div className={"poolList-element__author"}>
          <span className={"poolList-element__author"}>Created by:&nbsp;
            {authorData.name}
        </span>
          <img className={"avatar"} src={authorData.avatarURL}
               alt={authorData.name + "'s" +
               " Avatar"}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, stats}) {
  return {
    authedUser,
    stats,
  };
}

PoolListElement.propTypes = {
  id: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
  authorData: PropTypes.object.isRequired,
  votingSection: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps)(PoolListElement));