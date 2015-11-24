import React, { Component, PropTypes } from 'react'
import questions from './questions.json'
import matches from './matches.json'

const ITEMS = Object.keys(questions)

export default class App extends Component {

  render() {
    return (
      <div className="app">
        { ITEMS.map(this.renderQuestions.bind(this)) }
      </div>
    )
  }

  renderQuestions(item) {
    return (
      <div>
        <p>{ questions[ item ].question }</p>
        <ul>
          { questions[ item ].choices.map(this.renderChoices.bind(this, item)) }
        </ul>
      </div>
    )
  }

  renderChoices(item, letter) {
    let letters = Object.keys(questions[ item ].choices)
    console.log(questions[ item ].choices[letter])
    return (
      <li>
        <span>{ letters[letter] }</span>
        { questions[ item ].choices[letter] }
      </li>
    )
  }

}
