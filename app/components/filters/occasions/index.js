import React from 'react'
import {Text,TouchableOpacity,View,Dimensions} from 'react-native';
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')

const occasions = [
  {
    key : 'party',
    title : 'Party',
    icon:'party',
  },
  {
    key : 'aperitif',
    title : 'Aperitif',
    icon:'appetizer',

  },
  {
    key : 'barbecue',
    title : 'Barbecue',
    icon:'bbq',

  },
  {
    key : 'business',
    title : 'Business',
    icon:'business',

  },
  {
    key : 'fireplace',
    title : 'Fireplace',
    icon:'fireplace',

  },
  {
    key : 'romance',
    title : 'Romance',
    icon:'romantic',

  },
  {
    key : 'summer',
    title : 'Summer',
    icon:'summer',

  },
  {
    key : 'pairing',
    title : 'Food Pairing',
    icon:'meal',

  }

]

const Occasions = ({
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    onPress,
    active,
    disabled,
    styleContainer,
    style
  }) => {
  return (
    <View style={{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-start',
      alignItems:'center',
      marginVertical: 15
    }}
    >
    {occasions.map(e => {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor:active ? activeBackgroundColor : backgroundColor,
            alignItems:'center',
            height:75,
            width:0.20*width - 5,
            marginVertical:6,
            ...styleContainer
          }} >
            {e.icon && <View style={{
              height:43,
              width:43,
              borderWidth:0.9,
              alignItems:'center',
              justifyContent:'center',
              borderRadius:200,
              borderColor:active ? '#CACACA' : "#CACACA",
            }}><Icon name={e.icon} width={35} height={25} /></View>
            }
            <Text style={{
              color:active ? activeTextColor : textColor,
              paddingVertical:5,
              textAlign:'center',
              fontSize:12,
              color:"#787882",
              ...style
            }}>{e.title}</Text>
        </TouchableOpacity>
      )
    })}
    </View>
  )
}

Occasions.propTypes = {
  backgroundColor:PropTypes.string,
  activeBackgroundColor:PropTypes.string,
  textColor:PropTypes.string,
  activeTextColor:PropTypes.string,
  activeBorderColor:PropTypes.string,
  borderColor:PropTypes.string,
  value:PropTypes.string.isRequired,
  image:PropTypes.object,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  active:PropTypes.bool.isRequired,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
Occasions.defaultProps = {
  backgroundColor:'none',
  activeBackgroundColor:'none',
  textColor:'auto',
  image:null,
  activeTextColor:'auto',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default Occasions
