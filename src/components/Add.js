import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {_saveQuestion} from "../utils/_DATA";
import serialize from 'form-serialize';
import {handleNotLoggedUserRedirection} from "../utils/helpers";
import {addQuestion} from "../actions/questions";
import {addUserQuestions} from "../actions/users";

class Add extends Component {

  state = {
    isSubmitBtnDisabled: false,
    errorMessage: false
  };

  componentDidMount() {
    //Redirects the user to the login if is not logged in
    handleNotLoggedUserRedirection(this.props);
  };

  //Functionality for the "back" button
  handleBack = () => {
    this.props.history.push("/");
  };

  /**
   * Handle the form submit functionality
   *
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();

    //Store the form info and serialise them
    let form = document.querySelector("#addForm");
    let serialisedForm = serialize(form, {hash: true});

    if (!this.state.isSubmitBtnDisabled &&
      Object.keys(serialisedForm).length === 2
    ) {
      //Convert the btn state to disabled
      this.setState({
        isSubmitBtnDisabled: true,
      });

      //Create the result object for the DB API
      let result = {};
      result.optionOneText = serialisedForm.optionOne;
      result.optionTwoText = serialisedForm.optionTwo;
      result.author = localStorage.loggedUser;

      //Persist the question in the DB
      _saveQuestion(result)
        .then(res => {
          //Update the Store and UI
          this.props.dispatch(addQuestion(res));
          this.props.dispatch(addUserQuestions({
            author: this.props.authedUser,
            newQuestion: res.id,
          }));
          //Redirects to the root
          this.props.history.push("/");
        });
    } else {
      //Display the error message
      this.setState({
        errorMessage: true,
      });
      //Remove the error message after 4s
      setTimeout(() => {
        this.setState({
          errorMessage: false,
        })
      }, 4000)
    }
  };

  render() {
    return (
      <div>
        <h1>Would you Rather</h1>

        <div className="btn backBtn">
          <span onClick={this.handleBack}>Back</span>
        </div>

        <form id={"addForm"}>
          <label htmlFor="optionOne">Option 1:</label>
          <input
            id={"optionOne"}
            type="text"
            name={"optionOne"}
            placeholder={"Please enter the 1st option"}/>

          <label htmlFor="optionTwo">Option 2:</label>
          <input
            id={"optionTwo"}
            type="text"
            name={"optionTwo"}
            placeholder={"Please enter the 2nd option"}/>

          <div
            className={"btn" +
            (this.state.isSubmitBtnDisabled ? " btn--disabled" : "")}>
            <span onClick={this.handleSubmit}>Submit</span>
          </div>
        </form>

        <p
          className={(this.state.errorMessage ? "" : "hidden ") + "errorMessage"}>
          Error! Input fields must be both populated with a sentence!</p>
      </div>
    )
  }
}

Add.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({authedUser}){
  return {
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(Add));