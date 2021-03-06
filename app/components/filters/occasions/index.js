import React from 'react'
import {Text,TouchableOpacity,View,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {setSearch} from 'reduxStore/actions'
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')

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
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    onPress,
    disabled,
    styleContainer,
    style
  }) => {
  const occasions = useSelector(state => state.search.occasions) || []
  const dispatch = useDispatch()
  const toggleItem = (e) => {
    const index = occasions.findIndex(occ => occ === e.key)
    if (index === -1) {
      dispatch(setSearch({['occasions'] :[...occasions,e.key]}))
    } else {
      dispatch(setSearch({['occasions'] :[...occasions].filter((_,i) => i !== index)}))
    }
  }
  return (<Occasions 
    backgroundColor={backgroundColor}
    activeBackgroundColor={activeBackgroundColor}
    occasions={occasions}
    textColor={textColor}
    toggleItem={toggleItem}
    activeTextColor={activeTextColor}
    styleContainer={styleContainer}
    style={style}
  />)
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
