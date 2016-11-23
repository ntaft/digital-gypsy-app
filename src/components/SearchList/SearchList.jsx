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
    console.log('render search results');
    if (this.props.matches.length > 0) {
      console.log(this.props.matches[1]);

      return this.props.matches.map((city, i) =>
        <SearchListItem
          key={i}
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
        />,
      );
    }
  }

  render() {
    return (
      <div id="search-list">Search List
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default SearchList;
