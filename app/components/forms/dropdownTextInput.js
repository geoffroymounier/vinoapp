import React, {useRef} from 'react'
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';
import Image from 'components/forms/image'
import RNPickerSelect from 'react-native-picker-select';
const arrowRight = require('assets/arrow-right.png')
import PropTypes from 'prop-types'

const DropDownTextInput = ({
  label,
  items,
  placeholder,
  value,
  disabled,
  onChange
}) => {
  const dropdownRef = useRef()
  const onValueChange = (value) => onChange(value)
  const setFocus = () => dropdownRef.current.setState({showPicker:true})

  return (
    <>
    <TouchableOpacity
      onPress={setFocus}
      disabled={disabled} style={styles.cartoucheRight}>
      <View style={{flexDirection:'row',flexWrap:'wrap',flex:1,justifyContent:'flex-end'}}>
        <Text style={styles.textInputLabel}>{label}</Text>
        <Text style={styles.textInputPicker}>{(items[value]||{}).label || placeholder}</Text>
      </View>

      <Image
        width={15}
        styleContainer={{marginLeft:10,marginRight:0}}
        style={{tintColor:'gray'}}
        source={arrowRight} />
    </TouchableOpacity>
    <RNPickerSelect
       placeholder={{label,value: placeholder}}
       textInputProps={{height:0}}
       ref={dropdownRef}
       doneText={'OK'}
       items={items}
       onValueChange={onValueChange}
       value={value}
    />
  </>
)}
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

DropDownTextInput.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  items:PropTypes.array,
  onChange:PropTypes.func,
  disabled:PropTypes.bool
}
DropDownTextInput.defaultProps = {
  label:'',
  items:[],
  placeholder:'',
  onChange:()=>{},
  disabled:false
}

export default DropDownTextInput
