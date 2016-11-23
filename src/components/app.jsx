import React, { Component } from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import SearchList from './SearchList/SearchList.jsx';
import style from './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
      topMatches: [],
      month: '',
      type: '',
      limit: '',
      temp: '',
      cost: '',
    };

    // this.searchLocation = this.searchLocation.bind(this);
    // this.searchCity = this.searchCity.bind(this);
  }

  componentWillMount() {
    this.fetchAllCities();
  }

  // This function will hit our API route to fetch all the cities listed
  // in the nomadlist api. Then, set our cities state to this response object.
  fetchAllCities() {
    fetch('nomad/cities')
    .then(r => r.json())
    .then(cities => this.setState({
      cities: cities,
    }))
  }

  // This will check if the cities state is updated, it will fire the filterCities function
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cities !== this.state.cities) {
      this.filterCities();
    }
  }

  // This function will push the top 20 cities from the cities object into a new array
  // This reset the state of topMatches to this array of objects.
  filterCities() {
    console.log('filterCities');
    const topCities = [];
    for (let i = 0; i < 20; i++) {
      topCities.push(this.state.cities.result[i]);
    }
    this.setState({
      topMatches: topCities,
    });
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

  handleUpdateCost(e) {
    this.setState({
      cost: e.target.value,
    });
  }

  // This function will check to see if state.month has been reset and
  // will iterate through the cities array and find cities that
  // match with the month that the user selected.
  searchByParams() {
    if (this.state.month !== '') {
      const monthMatches = [];
      this.state.cities.result.map((city) => {
        if (city.info.monthsToVisit.includes(parseInt(this.state.month))) {
          monthMatches.push(city);
        }
      });
      console.log('got some new matches by month!');
      this.setState({
        topMatches: monthMatches,
      });

      // Then check to see if the state.cost has been updated
      // If it has, iterate through the cities that match the month to see
      // which results match this additional search parameter.
      if (this.state.cost !== '') {
        const costMatches = [];
        if (this.state.cost === '$') {
          monthMatches.map((city) => {
            if (city.cost.longTerm.USD < 750) {
              costMatches.push(city);
            }
          });
        } else if (this.state.cost === '$$') {
          monthMatches.map((city) => {
            if (city.cost.longTerm.USD < 1250) {
              costMatches.push(city);
            }
          });
        } else if (this.state.cost === '$$$') {
          monthMatches.map((city) => {
            if (city.cost.longTerm.USD < 3000) {
              costMatches.push(city);
            }
          });
        } else if (this.state.cost === '$$$$') {
          monthMatches.map((city) => {
            if (city.cost.longTerm.USD > 3000) {
              costMatches.push(city);
            }
          });
        }
        console.log('I got some new matches by month and cost!');
        this.setState({
          topMatches: costMatches,
        });
      }
    }
  }

  formHandler() {
    console.log('form');
    const formData = {
      user_id: 'some user until we figure this out'
      city: this.
    }
  }

    user_id VARCHAR REFERENCES users(id),
  city VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  nomadScore NUMERIC(3, 2),
  wifi NUMERIC(3, 2),
  fun NUMERIC(3, 2),
  safety NUMERIC(3, 2),
  lat NUMERIC(10, 7),
  lng NUMERIC(10, 7),
  cost INT,
  img VARCHAR (64),


  // This function will use the state set by user input to handle the
  // route to our exteral API to searchByParameters.
  // Cities that match search results will be returned in an array.
  // Reset the state of cities to the array of cities matching the filers.
  // searchLocation() {
  //   console.log('search locations');
  //   fetch(`/nomad/${this.state.month}/${this.state.type}/${this.state.limit}/${this.state.temp}`)
  //   .then(r => r.json())
  //   .then((nomadData) => {
  //     this.setState({
  //       cities: nomadData,
  //     });
  //   })
  //   // .catch(err => console.log(err));
  // }


  // This function will check if the searchLocation function has run and
  // reset the state of cities. Once the cities state has been reset, the searchCity
  // function will fire.
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.cities !== this.state.cities) {
  //     this.searchCity();
  //   }
  // }

  // This function will iterate through the cities state and make another
  // fetch request that will get information for each specific city.
  // Each fetch request will return an object with information on that city
  // which will be pushed into the cityData array.
  // Each iteration will increment a count and check to see if it has reached the laat item.
  // Then, the cityInfo state will be updated to match this array.
  // We limit the number of responses to 20 to increase speed and reduce the
  // number of fetch calls
  // searchCity() {
  //   console.log('search city');
  //   const cityData = [];
  //   let i = 0;
  //   // const count = this.state.cities.length;
  //   for (let j = 0; j < 20; j++) {
  //     fetch(`/nomad/city/${this.state.cities[j]}`)
  //     .then(r => r.json())
  //     .then(data => cityData.push(data.result))
  //     .then(() => {
  //       if (i === 19) {
  //         console.log('last city');
  //         this.setState({
  //           cityInfo: cityData,
  //         });
  //       } else {
  //         i+=1;
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }


  render() {
    return (
      <div className="App">
        <header>Header goes here</header>
        <SearchForm
          month={this.state.month}
          handleUpdateMonth={event => this.handleUpdateMonth(event)}
          handleUpdateWeather={event => this.handleUpdateWeather(event)}
          handleUpdateCost={event => this.handleUpdateCost(event)}
          searchByParams={this.searchByParams.bind(this)}
        />
        <SearchList
          matches={this.state.topMatches}
        />
        <footer>Footer goes here</footer>
      </div>
    );
  }
}

export default App;
