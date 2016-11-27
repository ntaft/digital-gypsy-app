import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class WorkPlacesMap extends Component {


  render() {
    const mapContainer = <div style={{height: '100%', width: '100%'}}></div>

    // Iterate through the markers prop and return a marker with the lat and lng
    // of each saved city to render to the world map
    const markers = this.props.markers.map((venue, i) => {

      const marker = {
        position: {
          lat: venue.location.latitude,
          lng: venue.location.longitude,
        },
      };

      return (
        <Marker
          key={i}
          {...marker}
        />
      );
    });

    if (this.props.center !== '') {
      return (
        <GoogleMapLoader
          containerElement={mapContainer}
          googleMapElement={
            <GoogleMap
              defaultZoom={13}
              defaultCenter={this.props.center}
              options={{ streetViewControl: false, mapTypeContro: false }}
            >
              { markers }
            </GoogleMap>
          }
        />
      );
    } else {
      return <div />;
    }
  }
}

export default WorkPlacesMap;
