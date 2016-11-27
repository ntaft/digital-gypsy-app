import React, { Component } from 'react';
import SavedListItem from '../SavedListItem/SavedListItem.jsx';
import './SavedList.css';

class SavedList extends Component {

  componentWillMount() {
    this.props.fetchSavedCities();
  }

  // returns the saved list
  renderSavedList() {
    if (this.props.savedCities.length === 0) {
      return (
        <div className="no-saved">
          <p>No saved items in your profile. Add some cities!</p>
        </div>
      );
    }

    return this.props.savedCities.map((eachCity, i) =>
      <SavedListItem
        key={i}
        id={eachCity.id}
        city={eachCity.city}
        country={eachCity.country}
        slug={eachCity.slug}
        lat={eachCity.lat}
        lng={eachCity.lng}
        nomadscore={eachCity.nomadscore}
        wifi={eachCity.wifi}
        fun={eachCity.fun}
        safety={eachCity.safety}
        // forignerFriendly={eachCity.scores.friendly_to_foreigners}
        cost={eachCity.cost}
        img={eachCity.img}
        savednotes={eachCity.notes}
        data={this.props.savedCities}
        deleteCity={this.props.deleteCity}
        notes={this.props.notes}
        updateNotes={this.props.updateNotes}
        updateFormHandler={this.props.updateFormHandler}
        getWorkPlaces={this.props.getWorkPlaces}
      />,
    );
  }
  render() {
    return (
      <div className="saved-list"><h2>Saved Destinations</h2>
        {this.renderSavedList()}
      </div>
    );
  }
}

export default SavedList;
