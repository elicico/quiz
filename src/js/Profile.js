import React, { Component, PropTypes } from 'react'
import classNames from "classnames"
import profiles from './profiles.json'

export default class Profile extends Component {
  render() {
    return (
      <div
        className="profile"
        >
        { profiles[this.props.profile] }
      </div>
    )
  }
}
