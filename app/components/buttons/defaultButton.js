import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/thumbnails/icon';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const DefaultButton = ({ label, icon, roundedIcon,backgroundColor, textColor, styleIcon, styleContainer,underTitle, styleText, disabled, onPress }) => (
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
      width={roundedIcon ? 64 : 20}
      height={roundedIcon ? undefined : 20}
      styleContainer={{...(roundedIcon && styles.roundedIcon),...styleIcon.container }}
      style={{ ...styleIcon.icon }}
      name={icon} />
    }
    {underTitle ?  
      <View style={{
        color: textColor,
        ...styles.buttonText,
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
  disabled: PropTypes.bool,
  roundedIcon: PropTypes.bool
}
DefaultButton.defaultProps = {
  label: '',
  backgroundColor: '#9F041B',
  roundedIcon:false,
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
  roundedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'repeat',
    maxHeight: 20,
    maxWidth: 20,
    height: 20,
    width: 20,
    borderRadius: 20,
    overflow: 'hidden'
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    fontSize: 16
  },
})
export default DefaultButton
