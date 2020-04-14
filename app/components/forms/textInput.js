import React, {useRef} from 'react'
import {TouchableOpacity,View,Text,StyleSheet,TextInput} from 'react-native';
import Image from 'components/forms/image'
const arrowRight = require('assets/arrow-right.png')
import PropTypes from 'prop-types'

const TextInputComponent = ({icon,label,placeholder,value,disabled,onChange}) => {
  const inputRef = useRef()
  const onChangeText = (text) => onChangeText(text)
  return (
    <TouchableOpacity disabled={disabled} onPress={()=>inputRef.focus()} style={styles.touchableOpacity}>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',flexWrap:'wrap',flex:1,alignItems:'center'}}>
          {icon && <Image
            width={15}
            height={15}
            styleContainer={{marginLeft:10}}
            style={{tintColor:'gray'}}
            source={icon} /> }
          <Text
          style={styles.label}>{label}</Text>
        </View>
        <TextInput
          ref={inputRef}
          placeholderTextColor = "#515151"
          placeholder={placeholder}
          style={styles.title}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableOpacity>
)}
const styles = StyleSheet.create({
  touchableOpacity : {
    flexDirection:'row',
    // flex:1,

    backgroundColor:"red",
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:5,
    marginVertical:4,
    paddingHorizontal:10,
    backgroundColor:'white'
  },
  label:{
    color: "#454545",
    fontSize: 14,
    marginVertical:5,
    fontFamily:'ProximaNova-Semibold',
    flex:1

  },
  title: {
    color: "#454545",
    fontSize: 19,
    fontFamily:"ProximaNova-Bold",
    alignSelf:'flex-start',
    textAlign: 'left',
    marginVertical: 3,
  },
});

TextInputComponent.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool
}
TextInputComponent.defaultProps = {
  label:'',
  placeholder:'',
  onPress:()=>{},
  disabled:false
}
export default TextInputComponent
