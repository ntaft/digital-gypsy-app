import React, { Component } from 'react';
import SearchListItem from '../SearchListItem/SearchListItem.jsx';
import style from './SearchList.css';

class SearchList extends Component {

  renderSearchResults() {
    console.log('render')
    if (this.props.cityInfo.length > 0 ) {
      // console.log(this.props.cityInfo[1][0].cost.longTerm.USD);
      console.log(this.props.cityInfo[1][0].media.image['250']);
    }

    return this.props.cityInfo.map((city, i) =>
      <SearchListItem
        key={i}
        city={city[0].info.city.name}
        country={city[0].info.country.name}
        lat={city[0].info.location.latitude}
        lng={city[0].info.location.longitude}
        nomadScore={city[0].scores.nomadScore}
        wifi={city[0].scores.free_wifi_available}
        fun={city[0].scores.leisure}
        safety={city[0].scores.safety}
        cost={city[0].cost.longTerm.USD}
        img={city[0].media.image['250']}
      />,
    );
  }

  render() {
    return (
      <div>Search List
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default SearchList;
