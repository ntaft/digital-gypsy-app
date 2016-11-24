import React, { Component } from 'react';
import SavedListItem from '../SavedListItem/SavedListItem.jsx';

class SavedList extends Component {

  // re-render saved list if the props change
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.savedCities !== this.props.savedCities) {
      this.renderSavedList();
    }
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
        city={eachCity.info.city.name}
        country={eachCity.info.country.name}
        lat={eachCity.info.location.latitude}
        lng={eachCity.info.location.longitude}
        nomadScore={eachCity.scores.nomadScore}
        wifi={eachCity.scores.free_wifi_available}
        fun={eachCity.scores.leisure}
        safety={eachCity.scores.safety}
        forignerFriendly={eachCity.scores.friendly_to_foreigners}
        cost={eachCity.cost.longTerm.USD}
        img={eachCity.media.image['250']}
        data={this.props.savedCities}
      />
    );
  }
  render() {
    return (
      <div className="saved-list">
        {this.renderSavedList()}
      </div>
    );
  }
}

export default SavedList;
