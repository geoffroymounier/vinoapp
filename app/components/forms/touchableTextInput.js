import React from 'react'
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';
import Image from 'components/forms/image'
const arrowRight = require('assets/arrow-right.png')
import PropTypes from 'prop-types'

const TouchableTextInput = ({label,placeholder,value,disabled,onPress}) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.cartoucheRight}>
      <View style={{flexDirection:'row',flexWrap:'wrap',flex:1,justifyContent:'flex-end'}}>
        <Text style={styles.textInputLabel}>{label}</Text>
        <Text style={styles.textInputPicker}>{value || placeholder}</Text>
      </View>
      <Image
        width={15}
        styleContainer={{marginLeft:10}}
        style={{tintColor:'gray'}}
        source={arrowRight} />
    </TouchableOpacity>
)
const styles = StyleSheet.create({
  cartoucheRight: {
    flexDirection:'row',flex:1,
    paddingHorizontal:5,paddingVertical:10,borderBottomWidth:1,borderColor:"#F5F5F5"
  },
  textInputLabel : {
    color:'#6D6D6D',
    fontFamily:'ProximaNova-Regular',
    fontSize:14,
    flex:1,
    alignSelf:'flex-start'
  },
  textInputPicker:{
    color:'#464646',
    fontFamily:'ProximaNova-Bold',
    textAlign:'right',
    fontSize:14,
    alignSelf:'center',
  }
});

TouchableTextInput.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool
}
TouchableTextInput.defaultProps = {
  label:'',
  placeholder:'',
  onPress:()=>{},
  disabled:false
}
export default TouchableTextInput
