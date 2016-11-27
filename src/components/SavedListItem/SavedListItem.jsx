import React, { Component } from 'react';
import './SavedListItem.css';

const SavedListItem = props => (
  <div className="saved-list-item">
    <h4>{props.city}, {props.country}</h4>
    <div className="image-holder">
      <img className="city-image" src={`https://nomadlist.com${props.img}`} alt=""/>
    </div>
    <p>Nomad Score: {Math.round((props.nomadscore)*10)}/10</p>
    <p>Wifi: {Math.round((props.wifi)*10)}/10</p>
    <p>Fun: {Math.round((props.fun)*10)}/10</p>
    <p>Safety: {Math.round((props.safety)*10)}/10</p>
    <p>Notes: {props.savednotes}</p>
    <div className="modify-input">
      <input
        type="text"
        placeholder="Enter notes about this destination."
        value={props.notes}
        onChange={props.updateNotes}
      />
      <button className="modify-button" onClick={() => props.updateFormHandler(props.id)}>Modify</button>
    </div>
    <button id="work-places-button" onClick={() => props.getWorkPlaces(props.slug, props.lat, props.lng)}>See a list of work places</button>
    <button className="delete-button" onClick={() => props.deleteCity(props.id)}>Remove</button>
  </div>
);

export default SavedListItem;
