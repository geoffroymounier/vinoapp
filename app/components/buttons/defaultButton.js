import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity,Text,StyleSheet} from 'react-native'

const DefaultButton = ({label,backgroundColor,textColor,styleContainer,styleText,disabled,onPress}) => (
  <TouchableOpacity
    style={{
      ...styles.buttonView,
      backgroundColor,
      ...styleContainer
    }}
    disabled={disabled}
    onPress={onPress}
    >
      <Text style={{
        ...styles.buttonText,
        color : textColor,
        ...styleText
      }}>{label}</Text>
    </TouchableOpacity>
)

DefaultButton.propTypes = {
  label:PropTypes.string,
  backgroundColor:PropTypes.string,
  textColor:PropTypes.string,
  onPress:PropTypes.func,
  disabled:PropTypes.bool
}
DefaultButton.defaultProps = {
  label:'',
  backgroundColor:'#9F041B',
  textColor:'white',
  onPress:()=>{},
  disabled:false
}

const styles = StyleSheet.create({
  buttonView : {
    marginVertical:10,
    marginHorizontal:5,
    alignSelf:'center',
    justifyContent:'center',
    height:50,
    borderRadius:25,
    backgroundColor:'#9F041B'

  },
  buttonText:{
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    fontSize: 16
  },
})
export default DefaultButton
