import React, { Component } from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import style from './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
      month: '',
      type: '',
      limit: '',
      temp: '',
    };
  }

  // This function will reset the state of month when a user selects a
  // month in the SearchForm component by grabbing the value stored in the button.
  handleUpdateMonth(e) {
    this.setState({
      month: e.target.value,
    });
  }

  // This function will check the value stored in the weather button and reset
  // the state of the weather parameters accordingly.
  handleUpdateWeather(e) {
    if (e.target.value === 'cold') {
      this.setState({
        type: 'lt',
        limit: 'max',
        temp: 50,
      });
    } else if (e.target.value === 'warm') {
      this.setState({
        type: 'gt',
        limit: 'min',
        temp: 65,
      });
    } else {
      this.setState({
        type: 'gt',
        limit: 'min',
        temp: 86,
      });
    }
  }

  // This function will use the state set by user input to handle the
  // route to our exteral API to searchByParameters.
  // Cities that match search results will be returned in an array.
  // Reset the state of cities to the array of cities matching the filers.
  searchLocation() {
    console.log('search locations');
    fetch(`/nomad/${this.state.month}/${this.state.type}/${this.state.limit}/${this.state.temp}`)
    .then(r => r.json())
    .then((nomadData) => {
      this.setState({
        cities: nomadData,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header>Header goes here</header>
        <SearchForm
          month={this.state.month}
          handleUpdateMonth={event => this.handleUpdateMonth(event)}
          handleUpdateWeather={event => this.handleUpdateWeather(event)}
          searchLocation={this.searchLocation.bind(this)}
        />
        <footer>Footer goes here</footer>
      </div>
    );
  }
}

export default App;
