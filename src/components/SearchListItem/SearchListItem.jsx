import React from 'react';
import './SearchListItem.css';

const SearchListItem = props => (
  <div className="search-list-item">
    <h4>{props.city}</h4>
  </div>
);

export default SearchListItem;
