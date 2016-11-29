import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class SavedMap extends Component {

  render() {
    const mapContainer = <div style={{ height: '100%', width: '100%' }} />;

    const center = this.props.center;

    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Iterate through the markers prop and return a marker with the lat and lng
    // of each saved city to render to the world map
    const markers = this.props.markers.map((city, i) => {

      const marker = {
        position: {
          lat: parseFloat(city.lat),
          lng: parseFloat(city.lng),
        },
        label: labels[i],
      };

      return (
        <Marker
          key={i}
          {...marker}
        />
      );
    });

    return (
      <GoogleMapLoader
        containerElement={mapContainer}
        googleMapElement={
          <GoogleMap
            defaultZoom={1}
            defaultCenter={center}
            options={{ streetViewControl: false, mapTypeContro: false }}
          >
            { markers }
          </GoogleMap>
        }
      />
    );
  }
}

export default SavedMap;
