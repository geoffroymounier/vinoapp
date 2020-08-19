import React, { useRef } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Image from 'components/forms/image'
import Icon from 'components/thumbnails/icon';
const arrowRight = require('assets/arrow-right.png')
import PropTypes from 'prop-types'

const TextInputComponent = ({ icon, label, placeholder, value, disabled, onChange,styleContainer }) => {
  const inputRef = useRef()
  const onChangeText = (text) => onChange(text)
  return (
    <TouchableOpacity disabled={disabled} onPress={() => inputRef.current.focus()} style={{...styles.touchableOpacity,...styleContainer}}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {icon && <Icon
            width={20}
            height={20}
            styleContainer={{ margin: 7, marginLeft: 11}}
            style={{ tintColor: 'gray' }}
            name={icon} />}
        {label ? <Text style={styles.label}>{label}</Text> : null}
        </View>
        <TextInput
          ref={inputRef}
          placeholderTextColor="#515151"
          placeholder={placeholder}
          style={styles.title}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  touchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.4,
    borderColor: '#787882',
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 4,
  },
  label: {
    color: "#454545",
    fontSize: 14,
    marginRight: 7,
    fontFamily: 'ProximaNova-Semibold',
  },
  title: {
    color: "#787882",
    fontSize: 14,
    flex: 1,
    fontFamily: "ProximaNova-Regular",
    textAlign: 'left',
  },
});

TextInputComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  styleContainer:PropTypes.object
}
TextInputComponent.defaultProps = {
  label: '',
  placeholder: '',
  onPress: () => { },
  styleContainer:{},
  disabled: false
}
export default TextInputComponent
