import React, {Component} from 'react';
import {connect} from 'react-redux';
import {_saveQuestion} from "../utils/_DATA";
import serialize from 'form-serialize';
import {handleNotLoggedUserRedirection} from "../utils/helpers";
import {addQuestion} from "../actions/questions";

class Add extends Component {

  state = {
    isSubmitBtnDisabled: false,
    errorMessage: false
  };

  componentDidMount() {
    //Redirects the user to the login if is not logged in
    handleNotLoggedUserRedirection(this.props);
  };

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
          //Redirects to the root
          this.props.history.push("/");
        });
    } else {
      this.setState({
        errorMessage: true,
      });
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

export default connect()(Add);