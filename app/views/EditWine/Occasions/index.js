import React from 'react'
import {Text,TouchableOpacity,View,Dimensions} from 'react-native';
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width} = Dimensions.get('window')

const occasionsArray = [
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
    occasions,
    textColor,
    toggleItem,
    activeTextColor,
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
    {occasionsArray.map(e => {

      const isActive = occasions.findIndex(occ => occ === e.key) > -1
      const onPress = () => toggleItem(e)

      return (
        <TouchableOpacity
          key={e.key}
          onPress={onPress}
          style={{
            backgroundColor:!!isActive ? activeBackgroundColor : backgroundColor,
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
              borderColor:isActive ? '#CACACA' : "#CACACA",
            }}><Icon name={e.icon} width={35} height={25} /></View>
            }
            <Text style={{
              color:isActive ? activeTextColor : textColor,
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
  backgroundColor:'transparent',
  activeBackgroundColor:'blue',
  textColor:'auto',
  image:null,
  activeTextColor:'red',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default Occasions
