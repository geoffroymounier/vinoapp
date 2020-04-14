import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';
import Image from 'components/forms/image'
import MomentPastille from 'components/thumbnails/moment'
const arrowRight = require('assets/arrow-right.png')

const TouchableTitleText = ({icon,label,placeholder,value,disabled,onPress,styleIcon}) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.touchableOpacity}>
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',flexWrap:'wrap',flex:1,alignSelf:'center',alignItems:'flex-end'}}>
          {icon && <Image
            width={22}
            styleContainer={{marginHorizontal:8}}
            style={{tintColor:'gray',...styleIcon}}
            source={icon} /> }
          <Text style={styles.label}>{label}</Text>
        </View>
        { typeof value === 'object' && !!value.length ?
          <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',alignItems:'center'}}>
            {(value || []).map((e,i) => (
              <MomentPastille
                key={i.toString()}
                value={e}
                backgroundColor={'transparent'}
                textColor={'#515151'}
                styleContainer={{borderWidth:1,borderColor:'gray'}}
              />
            ))}
          </View>
          : ((!!value && !!value.length) || !!placeholder) ?
          <Text style={styles.title}>{value || placeholder}</Text>
          : null}
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-end'}}>
      {/* <Image
        width={15}
        height={15}
        styleContainer={{marginRight:5}}
        style={{tintColor:'gray'}}
        source={arrowRight} /> */}
      </View>
    </TouchableOpacity>
)
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
    marginVertical:10,
    fontFamily:'ProximaNova-Semibold',
    flex:1
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

TouchableTitleText.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  styleIcon:{}
}
TouchableTitleText.defaultProps = {
  label:'',
  placeholder:'',
  onPress:()=>{},
  styleIcon:{},
  disabled:false
}
export default TouchableTitleText
