import React from 'react'
import {Text,StyleSheet,TouchableOpacity,View,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {setSearch} from 'reduxStore/actions'
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')


const typologieArray = [
  {
    key : 'still',
    title : 'Still',
    icon:'still'
  },
  {
    key : 'sparkling',
    title : 'Sparkling',
    icon: 'sparkling'

  }
]

const Typologies = ({
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    disabled,
    styleContainer,
    style
  }) => {
  const typologies = useSelector(state => state.search.typologies) || []
  const dispatch = useDispatch()
  const toggleItem = (e) => {
    const index = typologies.findIndex(occ => occ === e.key)
    if (index === -1) {
      dispatch(setSearch({['typologies'] :[...typologies,e.key]}))
    } else {
      dispatch(setSearch({['typologies'] :[...typologies].filter((_,i) => i !== index)}))
    }
  }
  return (
    <>
      <Text style={styles.categoryTitle}>Style</Text>
      <View style={{
        marginVertical: 10
      }}>
      {typologieArray.map(e => {
        const isActive = typologies.findIndex(occ => occ === e.key) > -1
        const onPress = () => toggleItem(e)
        return (
          <TouchableOpacity key={e.key} style={{alignItems:'center',flexDirection:'row',marginBottom:11}} onPress={onPress}>
            <Icon width={25} height={25} name={e.icon} styleContainer={{marginRight:17}} />
            <Text style={{
              ...styles.title,
              color:isActive ? activeTextColor : textColor,
            }}>{e.title}</Text>
          </TouchableOpacity>
        )})}
      </View>
    </>

  )
}
const styles = StyleSheet.create({
  title: {
    fontSize:15,
    color:"#787882",
    fontFamily:"ProximaNova-Regular"
  },
  categoryTitle: {
    fontWeight:"600",
    fontSize:17,
    color:"#3B3B3D",
    fontFamily:"ProximaNova-Regular"
  }
});
Typologies.propTypes = {
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
Typologies.defaultProps = {
  backgroundColor:'transparent',
  activeBackgroundColor:'blue',
  textColor:'#787882',
  image:null,
  activeTextColor:'red',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default Typologies
