import React from 'react';
import './SearchForm.css';

const SearchForm = props => (
  <div id="search-container">
    <div id="month-container"><p>select month</p>
      <button value="1" onClick={props.handleUpdateMonth}>January</button>
      <button value="2" onClick={props.handleUpdateMonth}>February</button>
      <button value="3" onClick={props.handleUpdateMonth}>March</button>
      <button value="4" onClick={props.handleUpdateMonth}>April</button>
      <button value="5" onClick={props.handleUpdateMonth}>May</button>
      <button value="6" onClick={props.handleUpdateMonth}>June</button><br />
      <button value="7" onClick={props.handleUpdateMonth}>July</button>
      <button value="8" onClick={props.handleUpdateMonth}>August</button>
      <button value="9" onClick={props.handleUpdateMonth}>September</button>
      <button value="10" onClick={props.handleUpdateMonth}>October</button>
      <button value="11" onClick={props.handleUpdateMonth}>November</button>
      <button value="12" onClick={props.handleUpdateMonth}>December</button>
    </div>
    <div id="cost-container"><p>select budget</p>
      <button value="$" onClick={props.handleUpdateCost}>$</button>
      <button value="$$" onClick={props.handleUpdateCost}>$$</button>
      <button value="$$$" onClick={props.handleUpdateCost}>$$$</button>
      <button value="$$$$" onClick={props.handleUpdateCost}>$$$$</button>
    </div>
    <div><p>get results</p>
    <button
      id="search-button"
      onClick={() => props.searchByParams()}
    >Search</button>
    </div>
  </div>
);

export default SearchForm;
