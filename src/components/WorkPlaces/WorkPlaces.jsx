import React, { Component } from 'react';
import WorkPlaceItem from '../WorkPlaceItem/WorkPlaceItem.jsx';
import './WorkPlaces.css';

class WorkPlaces extends Component {

  // returns the saved list
  renderWorkPlaces() {
    if (this.props.work.length === 0) {
      return (
        <div className="no-saved">
            <p>Check out places to work in one of your saved destintations.</p>
        </div>
      );
    }

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';

    return this.props.work.map((work, i) =>
      <WorkPlaceItem
        key={i}
        name={work.name}
        price={work.price_per_day_in_usd}
        type={work.type}
        url={work.url}
        label={labels[i]}
      />,
    );
  }
  render() {
    return (
      <div className="workplace-list"><h2>Place to Work</h2>
        {this.renderWorkPlaces()}
      </div>
    );
  }
}

export default WorkPlaces;
