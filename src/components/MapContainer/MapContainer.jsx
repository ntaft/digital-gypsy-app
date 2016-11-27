import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class SavedMap extends Component {
  render() {
    const mapContainer = <div style={{height: '100%', width: '100%'}}></div>

    const markers = this.props.markers.map((city, i) => {

      const marker = {
        position: {
          lat: city.location.lat,
          lng: city.location.lng,
        },
      };

      return <Marker key={i} {...marker} />;
    });

    return (
      <GoogleMapLoader
        containerElement={mapContainer}
        googleMapElement ={
          <GoogleMap
            defaultZoom={1}
            defaultCenter={this.props.center}
            options={{streetViewControl: false, mapTypeContro: false}}>
            { markers }
          </GoogleMap>
        }
      />
    );
  }
}

export default SavedMap;
