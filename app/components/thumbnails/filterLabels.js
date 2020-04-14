import React from 'react'
import {Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

const FilterLabels = ({
  backgroundColor,
  activeBackgroundColor,
  activeBorderColor,
  textColor,
  borderColor,
  activeTextColor,
  value,
  onPress,
  active,
  disabled,
  styleContainer,
  style
}) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor:active ? activeBackgroundColor : backgroundColor,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:active ? activeBorderColor : borderColor,
        margin:3,
        ...styleContainer
      }} >
        <Text style={{
          color:active ? activeTextColor : textColor,
          paddingVertical:5,
          paddingHorizontal:10,
          ...style
        }}>{value}</Text>
    </TouchableOpacity>
)

FilterLabels.propTypes = {
  backgroundColor:PropTypes.string,
  activeBackgroundColor:PropTypes.string,
  textColor:PropTypes.string,
  activeTextColor:PropTypes.string,
  activeBorderColor:PropTypes.string,
  borderColor:PropTypes.string,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  active:PropTypes.bool.isRequired,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
FilterLabels.defaultProps = {
  backgroundColor:'none',
  activeBackgroundColor:'gray',
  textColor:'auto',
  activeTextColor:'auto',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default FilterLabels
