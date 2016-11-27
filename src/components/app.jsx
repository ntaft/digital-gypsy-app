import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import SearchList from './SearchList/SearchList.jsx';
import SavedList from './SavedList/SavedList.jsx';
import SavedMap from './MapContainer/MapContainer.jsx';
import Login from './auth/Login/Login.jsx';
import SignUp from './auth/SignUp/SignUp.jsx';
import Logout from './auth/Logout/Logout.jsx';
import WorkPlaces from './WorkPlaces/WorkPlaces.jsx';
import WorkPlacesMap from './WorkPlacesMap/WorkPlacesMap.jsx';
import style from './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
      topMatches: [],
      selected: '',
      month: '',
      temp: '',
      cost: '',
      saved: [],
      markers: [],
      notes: '',
      work: [],
      map: '',
      loginName: '',
      loginPass: '',
      loggedIn: false,
      signupName: '',
      signupPass: '',
      userID: 1,
      workCenter: '',
    };
  }

  componentWillMount() {
    // fetch call to authenticate the user here
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
      slug: this.state.selected.info.city.slug,
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

  // Get all saved cities from database and save then into the saved state.
  fetchSavedCities() {
    fetch('/gypsy')
    .then(r => r.json())
    .then((saved) => {
      this.setState(
        { saved },
      );
    });
  }

  // Save city to DB then fetchSavedCities to reset the state of saved and update the savedList
  saveCity(formInfo) {
    console.log('save city');
    fetch('/gypsy', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(formInfo),
    })

    .then(this.fetchSavedCities());
  }

  // This function will delete a specific city from the savedcities DB
  deleteCity(id) {
    console.log('deleting city #', id);
    fetch(`/gypsy/${id}`, {
      method: 'delete',
    })
    .then(this.filterSavedCities(id))
    .catch(err => console.log(err));
  }

  // Rather than refetching all saved cities from the DB, filter through
  // the saved cities and keep all cities except for the one with the id
  // matching the deleted city.
  filterSavedCities(id) {
    const saved = this.state.saved.filter((city) => {
      return city.id !== id;
    });
    this.setState({ saved });
  }

  updateNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  modifyCity(updatedData) {
    console.log('modifying city');
    fetch('/gypsy', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify(updatedData),
    })
    .then(this.fetchSavedCities())
    .catch(err => console.log(err));
  }

  updateFormHandler(id) {
    console.log('update form');
    const updatedData = {
      user_id: 1,
      id: id,
      notes: this.state.notes,
    };
    this.modifyCity(updatedData);
    this.setState({
      notes: '',
    });
  }

  // updates all of the login/signup forms, filters by name.
  updateAuthForms(e) {
    const value = e.target.value;
    console.log(e.target.name, value);
    switch (e.target.name) {
      case 'loginName':
        this.setState({ loginName: value });
        break;
      case 'loginPass':
        this.setState({ loginPass: value });
        break;
      case 'signupName':
        this.setState({ signupName: value });
        break;
      case 'signupPass':
        this.setState({ signupPass: value });
        break;
      default:
        break;
    }
  }

  // passes the login data to the api
  // authenticates data with server
  // response with login and user ID
  handleLogin() {
    fetch('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginName,
        password: this.state.loginPass,
      }),
    })
    .then(r => r.json())
    // note: check to see if encrypt/decrypt is needed
    .then((loginObj) => {
      if (loginObj.valid === true) {
        this.setState({
          loggedIn: true,
          userID: loginObj.id,
        });
      }
    })
    .then(this.setState({
      loginName: '',
      loginPass: ''
    }))
    .then(console.log('logging in...'))
    .catch(err => console.log(err));
  }
  // sends the signup data to the api server
  // encrypts new user data and saves in db
  // authenticates the response and returns the user id
  handleSignup() {
    fetch('/auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.loginName,
        password: this.state.loginPass,
      }),
    })
    .then(r => r.json())
    // check to see if decrypt is needed
    .then((loginObj) => {
      if (loginObj.valid === true) {
        this.setState({
          loggedIn: true,
          userID: loginObj.id,
        })
      }
    })
    .then(this.setState({
      signupName: '',
      signupPass: '',
    }))
    .then(console.log('signup successful'))
    .catch(err => console.log(err));
  }
  // handles logout of the user, will revert to login state
  handleLogout() {
    this.setState({ loggedIn: false });
    console.log('logging out');
    // ** need a fetch request here to server to destroy login cookie **
  }

  // This function will fetch places to work in a particular city from the nomadlist api
  // Then, reset the state of the workCenter to the lat and lng of the city selected
  getWorkPlaces(slug, lat, lng) {
    console.log('get work places');
    fetch(`/nomad/work/${slug}`)
    .then(r => r.json())
    .then(work => this.setState(
      { work },
    ))
    .then(this.setMapCenter(lat, lng));
  }

  // Reset the state of the workCenter to an object with lat and lng
  setMapCenter(lat, lng) {
    this.setState({
      workCenter: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    });
  }

  render() {
    const location = {
      lat: 0,
      lng: 0,
    };

    return (

      <div className="App">
        <Header />
        <Login
          updateAuthForms={event => this.updateAuthForms(event)}
          handleLogin={this.handleLogin.bind(this)}
          loginName={this.state.loginName}
          loginPass={this.state.loginPass}
        />
        <SignUp
          updateAuthForms={event => this.updateAuthForms(event)}
          handleSignup={this.handleSignup.bind(this)}
          signupName={this.state.signupName}
          signupPass={this.state.signupPass}
        />
        <Logout
          handleLogout={this.handleLogout.bind(this)}
        />
          <SearchForm
            month={this.state.month}
            handleUpdateMonth={event => this.handleUpdateMonth(event)}
            handleUpdateWeather={event => this.handleUpdateWeather(event)}
            handleUpdateCost={event => this.handleUpdateCost(event)}
            searchByParams={this.searchByParams.bind(this)}
          />
        <div className="main-container">
          <div className="search-form-container">
            <SearchList
              matches={this.state.topMatches}
              changeSelection={this.changeSelection.bind(this)}
            />
          </div>
          <div className="saved-cities-container">
            <SavedList
              fetchSavedCities={this.fetchSavedCities.bind(this)}
              savedCities={this.state.saved}
              deleteCity={this.deleteCity.bind(this)}
              notes={this.state.notes}
              updateNotes={event => this.updateNotes(event)}
              updateFormHandler={this.updateFormHandler.bind(this)}
              getWorkPlaces={this.getWorkPlaces.bind(this)}
            />
            <div style={{ width: '100%', height: '46%' }}>
            <SavedMap
              center={location}
              markers={this.state.saved}
            />
            </div>
          </div>
          <div className="workplaces-container">
            <WorkPlaces
              work={this.state.work}
            />
              <div style={{ width: '100%', height: '46%' }}>
                <WorkPlacesMap
                  center={this.state.workCenter}
                  markers={this.state.work}
                />
              </div>
            </div>
          </div>
         <Footer />
      </div>
    );
  }
}

export default App;
