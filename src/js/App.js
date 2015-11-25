import React, { Component, PropTypes } from 'react'
import classNames from "classnames"
import questions from './questions.json'
import matches from './matches.json'
import Profile from './Profile'

const ITEMS = Object.keys(questions)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item1: null,
      item2: null,
      item3: null,
      item4: null,
      item5: null,
      item6: null,
      item7: null,
      item8: null,
      item9: null,
      profile: null
    }
  }

  handleClick(letter, item, e) {
    e.preventDefault()
    let newState = {}
    newState[item] = letter.toString()
    this.setState( newState )
  }

  handleResultClick(e) {
    e.preventDefault()
    let keys = Object.keys(this.state).slice(0, 9)
    let values = keys.map((key) => this.state[key])
    let combinations = []
    let nullAnswer = values.find((value) => value === null)
    var instanceCounter = {}

    if (nullAnswer === null) {
      return
    }

    keys.map((key) => {
      let letter = this.state[key]
      let numbers = matches[key].map((obj) => {
        letter === Object.keys(obj).toString() ? Array.prototype.push.apply(combinations, obj[letter]) : null
      })
    })

    combinations.sort().forEach((item, i) => {
       if (instanceCounter[item] === undefined) {
         instanceCounter[item] = 1
       } else {
         instanceCounter[item] += 1
       }
    });

    let instanceKeys = Object.keys(instanceCounter)
    const max = instanceKeys.reduce((prevValue, currentValue) => {
      if(instanceCounter[currentValue] >= instanceCounter[prevValue]) {
        return currentValue
      } else {
        return prevValue
      }
    }, instanceKeys[0])

    this.setState({ profile: max })
  }

  render() {
    return (
      <div className="app">
        { this.state.profile === null && (
          <div
            className="app__quiz"
            >
          { ITEMS.map(this.renderQuestions.bind(this)) }
          <div
            className="app__quiz__button"
            onClick={ this.handleResultClick.bind(this) }
            >
            profile!
          </div>
          </div>
        ) }
        { this.state.profile && (
          <Profile profile={ this.state.profile } />
        ) }
      </div>


    )
  }

  renderQuestions(item) {
    return (
      <div
        key={item}
        className="app__quiz__item"
        >
        <div
          className="app__quiz__item__question"
          >
          { questions[ item ].question }
        </div>
        <ul
          className="app__quiz__item__choices"
          >
          { questions[ item ].choices.map(this.renderChoices.bind(this, item)) }
        </ul>
      </div>
    )
  }

  renderChoices(item, answer, i) {
    let letter = Object.keys(answer)
    let quizChoicesItem = classNames(
      "app__quiz__item__choices__input",
      {"app__quiz__item__choices__input--active": letter.toString() === this.state[item]}
    )

    return (
      <a
        href="#"
        key={answer[ letter ]}
        className={ quizChoicesItem }
        onClick={ this.handleClick.bind(this, letter, item) }
        >

        { answer[ letter ]  }
      </a>
    )
  }

}

// <span className="app__quiz__item__choices__input--letter">{ letter }. </span>
