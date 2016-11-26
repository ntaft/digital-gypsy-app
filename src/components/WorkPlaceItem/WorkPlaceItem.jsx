import React, { Component } from 'react';
import './WorkPlaceItem.css';

const WorkPlaceItem = props => (
  <div className="work-place-item">
    <h4>{props.name}</h4>
    <p>Price Per Day in USD: {props.price}</p>
    <p>Type: {props.type}</p>
    <a href={props.url}>More Info</a>
  </div>
);

export default WorkPlaceItem;
