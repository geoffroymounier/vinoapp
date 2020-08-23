import React from 'react'
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';
import Image from 'components/forms/image'
const arrowRight = require('assets/arrow-right.png')
import PropTypes from 'prop-types'

const TouchableTextInput = ({label,icon,placeholder,value,rightArrow,disabled,onPress}) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.cartoucheRight}>
       {label && <View style={{...styles.bottomBorder}}><Text style={{...styles.textInputLabel}}>{label}</Text></View>}
       {icon && <View style={styles.iconLabel}>{icon}</View>}
       <View style={{...styles.valueContainer,...styles.bottomBorder,...(label && styles.textInputWrapped)}}>
        <Text style={styles.textInputPicker}>{value || placeholder}</Text>
       </View>
      {rightArrow && <Image
        width={15}
        styleContainer={{marginLeft:10}}
        style={{tintColor:'gray'}}
        source={arrowRight} />
      }
    </TouchableOpacity>
)
const styles = StyleSheet.create({
  cartoucheRight: {
    flexDirection:'row',flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  bottomBorder: {
    paddingHorizontal:5,paddingVertical:8,borderBottomWidth:1,borderColor:"#F5F5F5"
  },
  valueContainer: {
    flex:1,
    paddingHorizontal:5,paddingVertical:8,
  },
  textInputLabel : {
    color:'#6D6D6D',
    fontFamily:'ProximaNova-Regular',
    fontSize:14,
    // alignSelf:'center'
  },
  iconLabel : {
    paddingRight:10,
    paddingVertical:0,
    justifyContent:'center',
  },
  textInputWrapped : {
    flexDirection:'row',flexWrap:'wrap',flex:1,justifyContent:'flex-end'
  },
  textInputPicker:{
    color:'#3B3B3D',
    fontWeight:'400',
    fontFamily:'ProximaNova-Regular',
    fontSize:14,
  }
});

TouchableTextInput.propTypes = {
  label:PropTypes.string,
  icon:PropTypes.object,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool
}
TouchableTextInput.defaultProps = {
  label:null,
  icon:null,
  placeholder:'',
  onPress:()=>{},
  disabled:false
}
export default TouchableTextInput
