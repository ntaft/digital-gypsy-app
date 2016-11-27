import React, { Component } from 'react';
import SearchListItem from '../SearchListItem/SearchListItem.jsx';
import style from './SearchList.css';

class SearchList extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.matches !== this.props.matches) {
      this.renderSearchResults();
    }
  }

  renderSearchResults() {
    if (this.props.matches.length > 0) {

      return this.props.matches.map((city, i) =>
        <SearchListItem
          key={i}
          id={i}
          city={city.info.city.name}
          country={city.info.country.name}
          lat={city.info.location.latitude}
          lng={city.info.location.longitude}
          nomadScore={city.scores.nomadScore}
          wifi={city.scores.free_wifi_available}
          fun={city.scores.leisure}
          safety={city.scores.safety}
          forignerFriendly={city.scores.friendly_to_foreigners}
          cost={city.cost.longTerm.USD}
          img={city.media.image['250']}
          changeSelection={this.props.changeSelection}
          formHandler={this.props.formHandler}
        />,
      );
    }
  }

  render() {
    return (

      <div className="search-list"><h2>Best Matches</h2>
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default SearchList;
