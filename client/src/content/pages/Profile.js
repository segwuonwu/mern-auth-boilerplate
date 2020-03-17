import React from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  if (!props.user) {
    return <Redirect to="/" />
  }
  
  return (
    <div>
      <h2>Profile STUB {props.user.firstname}</h2>
    </div>
  )
}

export default Profile
