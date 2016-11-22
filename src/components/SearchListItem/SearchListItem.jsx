import React from 'react';
import './SearchListItem.css';

const SearchListItem = props => (
  <div className="search-list-item">
    <h4>{props.city}, {props.country}</h4>
    <div className="image-holder">
      <img src={`../../..${props.img}`} alt={props.city}/>
    </div>
    <p>Nomad Score: {Math.round((props.nomadScore)*100)/10}/10</p>
    <p>Wifi: {Math.round((props.wifi)*100)/10}/10</p>
    <p>Fun: {Math.round((props.fun)*100)/10}/10</p>
    <p>Safety: {Math.round((props.safety)*100)/10}/10</p>
    <button className="save">Save</button>
  </div>
);

export default SearchListItem;
