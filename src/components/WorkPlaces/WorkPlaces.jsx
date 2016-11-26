import React, { Component } from 'react';
import WorkPlaceItem from '../WorkPlaceItem/WorkPlaceItem.jsx';

class WorkPlaces extends Component {

  // returns the saved list
  renderWorkPlaces() {
    if (this.props.work.length === 0) {
      return (
        <div className="no-saved">
          <p>Save a city to view work places</p>
        </div>
      );
    }

    return this.props.work.map((work, i) =>
      <WorkPlaceItem
        key={i}
        name={work.name}
        price={work.price_per_day_in_usd}
        type={work.type}
        url={work.url}
      />,
    );
  }
  render() {
    return (
      <div className="saved-list">
        {this.renderWorkPlaces()}
      </div>
    );
  }
}

export default WorkPlaces;
