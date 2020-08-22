import React from 'react'
import { View } from 'react-native';
import PropTypes from 'prop-types'

const Separator = ({ horinzontal = true, thickness, length, backgroundColor, styleContainer, transparent }) => {
  return (
    <View style={{
      alignSelf: 'center',
      width: horinzontal ? length : thickness,
      height: horinzontal ? thickness : length,
      backgroundColor : transparent ? 'transparent' : backgroundColor,
      marginVertical: horinzontal ? 10 : 0,
      marginHorizontal: horinzontal ? 0 : 10,
      ...styleContainer
    }}>
    </View>
  )
}


Separator.propTypes = {
  length: PropTypes.string,
  thickness: PropTypes.number,
  backgroundColor: PropTypes.string,
  horizontal: PropTypes.bool,
  transparent: PropTypes.bool,
  styleContainer: PropTypes.object
}
Separator.defaultProps = {
  length: 300,
  horizontal: true,
  transparent:false,
  thickness: 2,
  backgroundColor: '#B2B2B8',
  styleContainer: {}
}
export default Separator
