import React from 'react'
import {Text,StyleSheet,TouchableOpacity,View,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {setSearch} from 'reduxStore/actions'
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')


const colorArray = [
  {
    key : 'red',
    title : 'Red',
    color:'#DC0101'
  },
  {
    key : 'rose',
    title : 'Rose',
    color:'#FF8C85'

  },
  {
    key : 'white',
    title : 'White',
    color:'#FFFB97'

  }
]

const Colors = ({
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
  const colors = useSelector(state => state.search.colors) || []
  const dispatch = useDispatch()
  const toggleItem = (e) => {
    const index = colors.findIndex(occ => occ === e.key)
    if (index === -1) {
      dispatch(setSearch({['colors'] :[...colors,e.key]}))
    } else {
      dispatch(setSearch({['colors'] :[...colors].filter((_,i) => i !== index)}))
    }
  }
  return (
    <>
      <Text style={styles.categoryTitle}>Color</Text>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal: 8,
        marginVertical: 10
      }}>
      {colorArray.map(e => {
        const isActive = colors.findIndex(occ => occ === e.key) > -1
        const onPress = () => toggleItem(e)
        return (
          <TouchableOpacity key={e.key} style={{alignItems:'center'}} onPress={onPress}>
            <View style={{backgroundColor:e.color, width:25,height:25,borderRadius:25,marginBottom:5}}/>
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
Colors.propTypes = {
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
Colors.defaultProps = {
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

export default Colors
