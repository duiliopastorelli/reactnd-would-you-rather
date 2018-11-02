import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'

function Welcome() {
  return (
    <Fragment>
      <p>Welcome! For access the App's functionalities please log in:&nbsp;
        <Link to={'/login'}>Login</Link></p>
    </Fragment>
  )
}

export default Welcome;