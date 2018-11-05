import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router';

class NotFound extends Component {
  handleBackToHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <Fragment>
        <h2>Resource not found</h2>
        <p>Unfortunately the resource you where looking cannot be found.</p>

        <div className={"btn"}>
          <span onClick={this.handleBackToHome}>Go back to home</span>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(NotFound);