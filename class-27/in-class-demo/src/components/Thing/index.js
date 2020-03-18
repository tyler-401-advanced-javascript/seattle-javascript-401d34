import React from 'react'
import './Thing.scss'

class Thing extends React.Component {
  constructor () {
    super()
    this.state = {
      stuff: true
    }
  }

  handleChange = e => {
    this.setState({
      stuff: !this.state.stuff
    })
  }

  render () {
    return (
      <section className="Thing">
        <p>My wonderful component</p>
        <span>Stuff: {this.state.stuff.toString()}</span>
        <button id="myButton" onClick={this.handleChange}>Clicky</button>
      </section>
    )
  }
}

export default Thing
