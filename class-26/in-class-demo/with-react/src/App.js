import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      count: 0
    };
  }

  render () {
    return (
      <div className="App center">
        <h1>My Awesome Website!</h1>
        <h2>You won't believe how awesome it is</h2>
        <div class="count">
          Current count: <span id="number">{this.state.count}</span>
        <button id="increment" onClick={() => this.setState({
            count: this.state.count + 1
          })}>Increment</button>
        <button id="decrement" onClick={() => this.setState({
            count: this.state.count - 1
          })}>Decrement</button>
        </div>
      </div>
    );
  }
}

export default App;
