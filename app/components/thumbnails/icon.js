import React from 'react'
import {Image,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import svgs from 'assets/svgs'

const ImageComponent = ({width,height,source,resizeMode,disabled,style,styleContainer,onPress,name}) => {
  const SvgFile = svgs[name]
  return (
    !svgs[name] ? null :
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        height,
        width,
        ...styleContainer
      }}
      >
      <SvgFile
        width={width}
        height={height}
      />
    </TouchableOpacity>
)}
ImageComponent.propTypes = {
  width:PropTypes.number,
  height:PropTypes.number,
  source:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  resizeMode:PropTypes.string,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
ImageComponent.defaultProps = {
  width:'100%',
  height:'100%',
  resizeMode:'contain',
  onPress:()=>{},
  disabled:true,
  style:{},
  styleContainer:{}
}
export default ImageComponent
