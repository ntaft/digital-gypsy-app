import React, { Component } from 'react';
import SearchListItem from '../SearchListItem/SearchListItem.jsx';
import style from './SearchList.css';

class SearchList extends Component {

  renderSearchResults() {
    console.log('render')
    if (this.props.cityInfo.length > 0 ) {
      console.log(this.props.cityInfo[1][0].info.city.name);
      console.log(this.props.cityInfo[1][0].info.country.name);
    }

    return this.props.cityInfo.map((city, i) =>
      <SearchListItem
        key={i}
        city={city[0].info.city.name}
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
