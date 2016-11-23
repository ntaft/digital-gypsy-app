import React, { Component } from 'react';
import SavedListItem from '../SavedListItem/SavedListItem';

class SaveList extends Component {

  // re-render saved list if the props change
  renderSavedList () {
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.savedCities !== this.props.savedCities) {
        this.renderSavedCities();
      }
    };
  // returns the saved list props to create a list of saved items
  if (this.props.savedCities === []) {
    return (
      <div className="no-saved">
        No saved items in your profile. Add some cities!
      </div>
    )
  } else {
    return this.props.savedCities.map(eachCity => {
        <SaveListItem
          key={i}
          id={i}
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
        />
    });
  }
}

  return (
    <div className="save-list">
      {this.renderSavedList()}
    </div>
  )
}
