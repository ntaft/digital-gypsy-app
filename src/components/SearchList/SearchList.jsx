import React, { Component } from 'react';
import SearchListItem from '../SearchListItem/SearchListItem.jsx';
import style from './SearchList.css';

class SearchList extends Component {

  renderSearchResults() {
    // this.props.cityInfo.forEach((city) => {
    //   console.log(city;

    // return this.props.cityInfo.map((city, i) =>
    //   <SearchListItem
    //     key={i}
    //     city={city.info.city.name}
    //   />,
    // );
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
