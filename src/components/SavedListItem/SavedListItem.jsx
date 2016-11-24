import React, { Component } from 'react';
import './SavedListItem.css';

const SavedListItem = props => (
  <div className="saved-list-item">
    <h4>{props.city}, {props.country}</h4>
    <div className="image-holder">
      <img src={`https://nomadlist.com${props.img}`} alt=""/>
    </div>
    <p>Nomad Score: {Math.round((props.nomadScore)*10)}/10</p>
    <p>Wifi: {Math.round((props.wifi)*10)}/10</p>
    <p>Fun: {Math.round((props.fun)*10)}/10</p>
    <p>Safety: {Math.round((props.safety)*10)}/10</p>
    <button className="delete-button" onClick={() => props.deleteSaved(props.id)}>Remove</button>
    <button className="modify-button" onClick={() => props.modifySaved(props.data)}>Modify</button>
  </div>
);

export default SavedListItem;
