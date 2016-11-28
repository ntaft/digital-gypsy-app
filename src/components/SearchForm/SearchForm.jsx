import React from 'react';
import './SearchForm.css';

const SearchForm = props => (
  <div className="search-container">
    <div id="month-container"><h2>Travel Month?</h2>
      <button value="1" className='' ref={props.class} onClick={props.handleUpdateMonth}>January</button>
      <button value="2" className='' ref={props.class} onClick={props.handleUpdateMonth}>February</button>
      <button value="3" className='' ref={props.class} onClick={props.handleUpdateMonth}>March</button>
      <button value="4" className='' ref={props.class} onClick={props.handleUpdateMonth}>April</button>
      <button value="5" className='' ref={props.class} onClick={props.handleUpdateMonth}>May</button>
      <button value="6" className='' ref={props.class} onClick={props.handleUpdateMonth}>June</button><br />
      <button value="7" className='' ref={props.class} onClick={props.handleUpdateMonth}>July</button>
      <button value="8" className='' ref={props.class} onClick={props.handleUpdateMonth}>August</button>
      <button value="9" className='' ref={props.class} onClick={props.handleUpdateMonth}>September</button>
      <button value="10" className='' ref={props.class} onClick={props.handleUpdateMonth}>October</button>
      <button value="11" className='' ref={props.class} onClick={props.handleUpdateMonth}>November</button>
      <button value="12" className='' ref={props.class} onClick={props.handleUpdateMonth}>December</button>
    </div>
    <div id="cost-container"><h2>Budget?</h2>
      <button value="$" onClick={props.handleUpdateCost}>$</button>
      <button value="$$" onClick={props.handleUpdateCost}>$$</button>
      <button value="$$$" onClick={props.handleUpdateCost}>$$$</button>
      <button value="$$$$" onClick={props.handleUpdateCost}>$$$$</button>
    </div>
    <div><h2>Go!</h2>
    <button
      id="search-button"
      onClick={() => props.searchByParams()}
    >Search</button>
    </div>
  </div>
);

export default SearchForm;
