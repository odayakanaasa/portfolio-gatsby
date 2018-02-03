import React, { Component } from 'react'
import Link from 'gatsby-link'
import SVG  from 'react-inlinesvg';

export default class Logo extends Component {
  render() {
    return (
      <Link className="link"
        className="header__logo" 
        to="/">
          <SVG src="../images/svgs/logo.svg" />
        </Link>
    )
  }
}