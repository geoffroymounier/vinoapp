import React from 'react';
import {Platform,StyleSheet, Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

const DefaultListItem = ({onPress,id,title,subtitle,styleContainer,styleTitle,styleSubtitle}) => {
  const onPressItem = () => onPress(id)
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container,...styleContainer}}>
        <Text style={{...styles.title,...styleTitle}}>{title}</Text>
        {subtitle && <Text style={{...styles.subtitle,...styleSubtitle}}>{subtitle}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container : {
    borderColor:"lightgray",
    borderBottomWidth:1,
    paddingVertical:10,
    paddingHorizontal:10,
    flex:1,
  },
  title: {
    fontSize:18,
    fontFamily:"ProximaNova-Regular"
  },
  subtitle: {
    fontSize:16,
    fontFamily:"ProximaNova-Regular"
  }
});
DefaultListItem.propTypes = {
  subtitle:PropTypes.string,
  onPress:PropTypes.func,
  styleContainer:PropTypes.object,
  styleTitle:PropTypes.object,
  styleSubtitle:PropTypes.object,
  title:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired
}
DefaultListItem.defaultProps = {
  subtitle:null,
  onPress:()=>{},
  styleTitle:{},
  styleSubtitle:{},
  styleContainer:{}
}

export default DefaultListItem
