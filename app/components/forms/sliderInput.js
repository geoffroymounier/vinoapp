import React, {useRef} from 'react'
import {TouchableOpacity,View,Text,StyleSheet,TextInput} from 'react-native';
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from 'components/markers/customMarker'

const SliderInput = ({min,max,color,label,items,suffix,placeholder,value,disabled,onChange}) => {
  const pickerRef = useRef()
  const onValueChange = (value) => onChange(value)
  const onValuesChangeFinish = (e) => onChange(e[0])
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={()=>pickerRef.current.setState({showPicker:true})}
      style={styles.touchableOpacity}
      >
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
         placeholder={{label,value: ''}}
         textInputProps={{display:'none'}}
         style={{...styles.title}}
         doneText={'OK'}
         ref={pickerRef}
         items={items}
         style={{viewContainer:{alignSelf:'center'}}}
         items={items}
         onValueChange={onValueChange}
         value={value}
       />
      <MultiSlider
          min={min}
          containerStyle={{marginLeft:0,alignItems:'center'}}
          selectedStyle={{backgroundColor:color}}
          trackStyle={{backgroundColor:'#e6e6e6'}}
          values={[value||placeholder]}
          enabledOne={true}
          isMarkersSeparated={true}
          customMarkerLeft={(e) => (<CustomMarker
            active = {true}
            suffix={suffix}
            currentValue={e.currentValue}
            />
          )}
          max={max}
          onValuesChangeFinish={onValuesChangeFinish}

        />
      </TouchableOpacity>
)}
const styles = StyleSheet.create({
  touchableOpacity : {
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal:5,
    marginVertical:4,
    paddingHorizontal:10,
    backgroundColor:'white'
  },
  label:{
    color: "#454545",
    fontSize: 14,
    width:100,
    marginHorizontal:5,
    fontFamily:'ProximaNova-Semibold'
  },
  title: {
    color: "#454545",
    fontSize: 19,
    fontFamily:"ProximaNova-Bold",
    alignSelf:'flex-start',
    textAlign: 'left',
    marginVertical: 3,
  },
});

SliderInput.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  disabled:PropTypes.bool,
  onChange:PropTypes.func,
  color:PropTypes.string,
  suffix:PropTypes.string,
  max:PropTypes.number,
  min:PropTypes.number
}
SliderInput.defaultProps = {
  label:'',
  placeholder:'',
  onPress:()=>{},
  disabled:false,
  color:'#e6e6e6',
  suffix:'',
  min:0,
  max:100
}
export default SliderInput
