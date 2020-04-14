import React from 'react'
import {Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

const MomentPastille = ({
  backgroundColor,
  textColor,
  value,
  onPress,
  disabled,
  styleContainer,
  style
}) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor:backgroundColor,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:100,
        margin:3,
        ...styleContainer
      }} >
        <Text style={{
          color:textColor,
          paddingVertical:5,
          paddingHorizontal:10,
          ...style
        }}>{value}</Text>
    </TouchableOpacity>
)

MomentPastille.propTypes = {
  backgroundColor:PropTypes.number,
  textColor:PropTypes.number,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
MomentPastille.defaultProps = {
  backgroundColor:'none',
  textColor:'auto',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default MomentPastille
