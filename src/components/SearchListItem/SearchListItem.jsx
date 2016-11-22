import React from 'react';
import './SearchListItem.css';

const SearchListItem = props => (
  <div className="search-list-item">
    <h4>{props.city}, {props.country}</h4>
    <p>Nomad Score: {props.nomadScore}</p>
    <p>Wifi: {props.wifi}</p>
  </div>
);

export default SearchListItem;
