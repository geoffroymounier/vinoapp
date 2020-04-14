import React from 'react'
import {Image,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

const ImageComponent = ({width,height,source,resizeMode,disabled,style,styleContainer,onPress}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        height,
        width,
        ...styleContainer
      }}
      >
        <Image
          resizeMode={'contain'}
          style={{
            width:'100%',
            height:"100%",
            ...style
          }}
          source={source} />
    </TouchableOpacity>
)}

ImageComponent.propTypes = {
  width:PropTypes.number,
  height:PropTypes.number,
  source:PropTypes.string.isRequired,
  resizeMode:PropTypes.string,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
ImageComponent.defaultProps = {
  width:'auto',
  height:'100%',
  resizeMode:'contain',
  onPress:()=>{},
  disabled:true,
  style:{},
  styleContainer:{}
}
export default ImageComponent
