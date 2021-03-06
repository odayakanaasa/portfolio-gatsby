import React, { Component } from 'react'
import Link from 'gatsby-link'

export default class PortfolioBlock extends Component {
  render() {

    var color = {
      color: this.props.card.frontmatter.color,
    };

    return (
      <Link className="portfolio-block" key={this.props.card.id} to={this.props.card.frontmatter.path} style={color}>
        <img className="portfolio-block__logo" src="../images/portfolio/steel-tek/steel-tek.svg" />
        <div className="portfolio-block__content">
          {this.props.card.frontmatter.title}

          {this.props.card.frontmatter.category}

          <span className="portfolio-block__link">
            Read More
          </span>
        </div>
      </Link>
    )
  }
}