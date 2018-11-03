import React, {Component} from 'react';

class PoolListElement extends Component {
  render(){
    const {optionOne, optionTwo} = this.props.questions;
    const {author} = this.props;

    return(
      <div className={"poolList-element"}>
        <div className={"poolList-element__wrapper"}>
          <div>
            <span>Option 1: {optionOne.text}</span>
          </div>

          <hr/>

          <div>
            <span>Option 2: {optionTwo.text}</span>
          </div>
        </div>

        <span className={"poolList-element__author"}>created by:&nbsp;
          {author}
        </span>
      </div>
    )
  }
}

export default PoolListElement;