import React from 'react';
import './App.css';

import Header from './Header'
import Footer from './Footer'

class App extends React.Component {
  constructor () {
    super()
    const params = new URL(document.location).searchParams
    this.state = {
      words: params.get('words').split(',')
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleNewWord = this.handleNewWord.bind(this)
  }

  traditionalClassMethod () {
    // you'll need to .bind(this) in the constructor so you get
    // "this" to refer to the right place
  }

  arrowFunctionClassMethod = () => {
    // you DON'T need to .bind(this) in the constructor, because arrow functions
    // have lexically scoped "this"
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      newWord: event.target.value
    });
  }

  handleNewWord = event => {
    event.preventDefault();
    this.setState({
      words: [...this.state.words, this.state.newWord]
    })
  }

  render () {
    return (
      <>
        <Header />
        <div className="App">
          <form onSubmit={this.handleNewWord}>
            <input onChange={this.handleChange} placeholder="enter a new word here" />
            <input type="submit" value="Enter new word" />
          </form>
          <ul>
            {this.state.words.map(word => {
              return <li>{word}</li>
            })}
          </ul>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
