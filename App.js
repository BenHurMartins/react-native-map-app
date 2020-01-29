/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      myPosition: {latitude: 0, longitude: 0},
      markers: [],
    };
  }

  onRegionChange(newRegion) {
    this.setState({region: newRegion});
  }

  handleMarker(marker) {
    return <MapView.Marker coordinate={marker.coordinate} />;
  }

  componentDidMount() {
    this._asyncSetRegion = Geolocation.getCurrentPosition(info => {
      this._asyncSetRegion = null;
      this.setState({
        region: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    });

    setInterval(() => {
      this._asyncGetLocation = Geolocation.getCurrentPosition(info => {
        this._asyncGetLocation = null;
        this.setState({myPosition: info.coords});
      });
    }, 5000);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          onLongPress={e => {
            const newMarker = e.nativeEvent;
            this.setState({markers: [...this.state.markers, newMarker]});
          }}
          style={styles.map}
          region={this.state.region}
          onRegionChange={newRegion => this.onRegionChange(newRegion)}>
          <MapView.Marker coordinate={this.state.myPosition}>
            <Image
              style={{width: 55, height: 55}}
              source={require('./assets/myLocation.png')}
            />
          </MapView.Marker>
          {this.state.markers.map(marker => {
            return this.handleMarker(marker);
          })}
        </MapView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
