
import React from 'react';
import { StyleSheet, Image,Text,View } from 'react-native';

class CustomMarker extends React.Component {
  render() {
    return (
      <View
        style={{...styles.bigEllipse}}
      >
      <View
        style={{...styles.smallEllipse}}
      ></View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  bigEllipse: {
    height: 13,
    width: 13,
    borderRadius:13,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#C4C4C4'
  },
  smallEllipse: {
    height: 5,
    width: 5,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3B3B3D'
  },
});

export default CustomMarker;
