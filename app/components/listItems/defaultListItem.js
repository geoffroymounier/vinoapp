import React from 'react';
import {Platform,StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'

const DefaultListItem = ({onPress,id,icon,title,subtitle,styleContainer,styleTitle,styleSubtitle,selected}) => {
  const onPressItem = () => onPress(id)

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container,...styleContainer}}>
        <View style={{flexDirection:'row',alignItems:'center',}}>
          {icon && icon}
          <View>
            <Text style={{...styles.title,...styleTitle}}>{title}</Text>
            {subtitle && <Text style={{...styles.subtitle,...styleSubtitle}}>{subtitle}</Text>}
          </View>
        </View>
        {selected && <Icon name={'checked'} width={20} height={20} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container : {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
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
  selected:PropTypes.bool,
  styleContainer:PropTypes.object,
  icon:PropTypes.object,
  styleTitle:PropTypes.object,
  styleSubtitle:PropTypes.object,
  title:PropTypes.string.isRequired,
  id:PropTypes.string.isRequired
}
DefaultListItem.defaultProps = {
  subtitle:null,
  selected:false,
  icon:null,
  onPress:()=>{},
  styleTitle:{},
  styleSubtitle:{},
  styleContainer:{}
}

export default DefaultListItem
