import React, { Component } from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import SearchList from './SearchList/SearchList.jsx';
import SavedList from './SavedList/SavedList.jsx';
import style from './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
      topMatches: [],
      selected: '',
      month: '',
      type: '',
      limit: '',
      temp: '',
      cost: '',
      saved: [],
    };
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
    } else if (prevState.selected !== this.state.selected) {
      this.formHandler();
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

  // Check to see if state.cost has been updated. If it has, iterate though
  // an array of cities and push the cities that match this price range in
  // to an array. Then, reset the state of topmatches.
  filterByPrice(arr) {
    const costMatches = [];
    if (this.state.cost === '$') {
      arr.map((city) => {
        if (city.cost.longTerm.USD < 750) {
          costMatches.push(city);
        }
      });
    } else if (this.state.cost === '$$') {
      arr.map((city) => {
        if (city.cost.longTerm.USD < 1250) {
          costMatches.push(city);
        }
      });
    } else if (this.state.cost === '$$$') {
      arr.map((city) => {
        if (city.cost.longTerm.USD < 3000) {
          costMatches.push(city);
        }
      });
    } else if (this.state.cost === '$$$$') {
      arr.map((city) => {
        if (city.cost.longTerm.USD > 3000) {
          costMatches.push(city);
        }
      });
    }
    console.log('I got some new matches by price!');
    this.setState({
      topMatches: costMatches,
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
        this.filterByPrice(monthMatches);
      }
    // If a user does not pick a month, this function will filter strictly
    // by price.
    } else if (this.state.cost !== '') {
      this.filterByPrice(this.state.cities.result);
    }
  }

  // Code attributed to nyc-firehouse lab
  // https://git.generalassemb.ly/krmalewski/nyc-firehouses-1/blob/master/src/components/App.js
  // Mutator function that will selected the location to save
  // Takes in the parameter num which will point to a specific location's
  // object in the array
  changeSelection(num) {
    this.setState({
      selected: this.state.topMatches[num],
    });
  }

  formHandler() {
    console.log('form');
    const formData = {
      user_id: 1,
      city: this.state.selected.info.city.name,
      country: this.state.selected.info.country.name,
      nomadScore: this.state.selected.scores.nomadScore,
      wifi: this.state.selected.scores.free_wifi_available,
      fun: this.state.selected.scores.leisure,
      safety: this.state.selected.scores.safety,
      lat: this.state.selected.info.location.latitude,
      lng: this.state.selected.info.location.longitude,
      cost: this.state.selected.cost.longTerm.USD,
      img: this.state.selected.media.image['250'],
    };
    this.saveCity(formData);
  }

  saveCity(formInfo) {
    console.log('save city');
    fetch('/gypsy', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(formInfo),
    })
    .catch(err => console.log(err));
  }

  fetchSavedCities() {
    console.log('so fetch');
    fetch('/gypsy')
    .then(r => r.json())
    .then((saved) => {
      this.setState(
        { saved },
      );
    })
    .catch(error => console.log(error));
  }

  deleteCity(id) {
    console.log('deleting city #', id);
    fetch('/gypsy', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(id),
    })
    .catch(err => console.log(err));
  }

  modifyCity(updatedData) {
    console.log('modifying city #', id)
    fetch('/gypsy', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify(updatedData),
    })
    .catch(err => console.log(err));
  }

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
          changeSelection={this.changeSelection.bind(this)}
        />
        <SavedList
          fetchSavedCities={this.fetchSavedCities.bind(this)}
          savedCities={this.state.saved}
          deleteSaved={this.deleteCity.bind(this)}
          modifySaved={this.modifyCity.bind(this)}
        />
        <footer>Footer goes here</footer>
      </div>
    );
  }
}

export default App;
