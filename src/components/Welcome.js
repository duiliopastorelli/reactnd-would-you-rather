import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'

function Welcome() {
  return (
    <Fragment>
      <p>Welcome! For access the App's functionalities please log in.</p>
      <Link to={'/login'}>Login</Link>
    </Fragment>
  )
}

export default Welcome;