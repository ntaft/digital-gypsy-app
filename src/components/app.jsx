import React, { Component } from 'react';
import style from '.App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
    }
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
      </div>
    )
  }
}

export default App;
