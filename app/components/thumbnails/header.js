import React, { useState } from 'react'
import { StyleSheet,Dimensions,View,Text } from 'react-native';
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const { width, height } = Dimensions.get('window')

const ImageComponent = ({ children,text, hidden, showHide, styleContainer, styleHeaderTitle, styleIconContainer, icon }) => {
  const [showChildren,setShowChildren] = useState(true)
  const onPress = () => setShowChildren(!showChildren);
  return (
    <>
    <View style={{ ...styles.headerSection, ...styleContainer }}>
      <Text style={{ ...styles.headerTitle, ...styleHeaderTitle }}>{text}</Text>
      <View style={{ ...styles.hideIcon, ...styleIconContainer }}>
        {showHide && <Icon disabled={false} onPress={onPress} {...icon} name={hidden ? 'hide' : 'hide'} height={20} width={20} />}
      </View>
    </View>
    {showChildren && children}
    </>
  )
}
ImageComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  showHide: PropTypes.bool,
  styleContainer: PropTypes.obj,
  styleHeaderTitle: PropTypes.obj,
  styleIcon: PropTypes.obj,
  icon: PropTypes.icon
}
ImageComponent.defaultProps = {
  onPress: () => { },
  style: {},
  styleContainer: {},
  styleHeaderTitle: {},
  styleIconContainer: {},
  icon: {}
}
const styles = StyleSheet.create({
  headerSection: {
    width,
    backgroundColor: '#CACACA',
    paddingHorizontal: 7,
    paddingVertical: 8,
  },
  headerTitle: {
    width,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular'
  },
  hideIcon: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  }
})
export default ImageComponent
