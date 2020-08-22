import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/thumbnails/icon';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const DefaultButton = ({ label, icon, backgroundColor, textColor, styleIcon, styleContainer,underTitle, styleText, disabled, onPress }) => (
  <TouchableOpacity
    style={{
      ...styles.buttonView,
      backgroundColor,
      ...styleContainer
    }}
    disabled={disabled}
    onPress={onPress}
  >
    {icon && <Icon
      width={20}
      height={20}
      styleContainer={{ ...styleIcon.container }}
      style={{ ...styleIcon.icon }}
      name={icon} />
    }
    {underTitle ?  
      <View style={{
        ...styles.buttonText,
        color: textColor,
        ...styleText,
        flexDirection:'column',
      }}>
      <Text style={{...styleText}}>{label}
      </Text>
      {underTitle}
    </View>
    : 
    <Text style={{...styles.buttonText,
      color: textColor,
      ...styleText}}>{label}
      </Text>
    }
    
    
    
    
  </TouchableOpacity>
)

DefaultButton.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  underTitle:PropTypes.object,
  onPress: PropTypes.func,
  disabled: PropTypes.bool
}
DefaultButton.defaultProps = {
  label: '',
  backgroundColor: '#9F041B',
  styleIcon: {},
  underTitle:null,
  textColor: 'white',
  onPress: () => { },
  disabled: false
}

const styles = StyleSheet.create({
  buttonView: {
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9F041B'

  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    fontSize: 16
  },
})
export default DefaultButton
