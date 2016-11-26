import React from 'react';
import './SearchListItem.css';

// const imagePath = 'https://nomadlist.com';

const SearchListItem = props => (
  <div className="search-list-item">
    <h4>{props.city}, {props.country}</h4>
    <div className="image-holder">
      <img className="city-image" src={`https://nomadlist.com${props.img}`} alt=""/>
    </div>
    <p>Nomad Score: {Math.round((props.nomadScore)*100)/10}/10</p>
    <p>Wifi: {Math.round((props.wifi)*100)/10}/10</p>
    <p>Fun: {Math.round((props.fun)*100)/10}/10</p>
    <p>Safety: {Math.round((props.safety)*100)/10}/10</p>
    <button className="save" onClick={() => props.changeSelection(props.id)}>Save</button>
  </div>
);

export default SearchListItem;
