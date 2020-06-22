import React, {useRef, useState,useMemo, Fragment} from 'react'
import {Text,TouchableOpacity,View,Dimensions,Image,StyleSheet,TextInput} from 'react-native';
import Icon from 'components/thumbnails/icon';
import ImageComponent from 'components/forms/image'
import Button from 'components/buttons/defaultButton';
import {useDispatch,useSelector} from 'react-redux'
import {setSearch} from 'reduxStore/actions'
import PropTypes from 'prop-types'
import pairingArray from './pairing.js'
const {width,height} = Dimensions.get('window')

const Pairing = ({
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
  const dispatch = useDispatch()
  const pairings = useSelector(state => state.search.pairings) || []
  const refInput = useRef()
  const [selectedCategory, setSelectedCategory] = useState(null)

  const toggleItem = (items,eraseAllInCategory = false) => { // eraseAllInCategory is true if clicking on 'all' being already ticked => deselect all
    const isMultiple = items.length > 1 // isMultiple is true when we click on "all", not being already ticket => select all
    let newPairing = [...pairings] // avoid mutable
    items.map((item) => {
      const index = newPairing.findIndex(pairing => pairing === item)
      if ((!isMultiple || eraseAllInCategory) && index > -1) { // provided 1. already in redux AND (we call only a single change OR we deselect all)
        newPairing.splice(index,1) // remove the entry
      }
      else newPairing = [...newPairing,item] // otherwise add it
    })
    dispatch(setSearch({['pairings']:[...new Set([...newPairing])]})) // remove doublons
  }

  const unNestArray = (item) => { // create an array of all the categories we are coming from => recursive
    const matchItem = pairingArray.find(e => e.key === item) || {}
    if (!!matchItem.type) {
      return [...unNestArray(matchItem.referrer[0]),matchItem]
    } else if (matchItem.title) {
      return [matchItem]
    } else {
      return []
    }

  }
  const onEdit = () => refInput.current.focus()

  const selectedItem = pairingArray.find(p => p.key === selectedCategory)
  const filteredPairingArray = useMemo(() => {
    return pairingArray.filter(p => !selectedCategory ? !p.referrer : (p.referrer || []).includes(selectedCategory))
  },[selectedCategory])
  const subMenu = selectedCategory ? [...unNestArray(selectedCategory),filteredPairingArray[0]] : []
  const subString = subMenu.map(el => el.key).slice(0,-1).join(' - ').toLowerCase()
  const isAllSelected = pairings.filter(p => new RegExp(subString).test(p)).length === filteredPairingArray.length

  return (
    <View>
      <TouchableOpacity
        onPress={onEdit}
        style={{
          flexDirection : 'row',
          alignItems:'center',
          height:28,
          marginVertical:16,
          marginHorizontal:10,
          borderWidth: 0.4,
          borderColor: "#787882",
          borderRadius:15
        }}
        >
          <Icon
            height={20}
            width={20}
            styleContainer={{
              marginHorizontal:11
            }}
            name={'search'}
          />
          <TextInput
            ref={refInput}
            style={styles.title}
            placeholder={'search a pairing'}
          />
        </TouchableOpacity>
        <View style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'flex-start',
            alignItems:'center'
          }}
          >
          {subMenu.map((e,i) => {
              const isLast = i === subMenu.length - 1

              const buttonPressed = () => {
                return !isLast ? setSelectedCategory(i === 0 ? null : subMenu[i-1].key) : void 0
              }
              return (
                <Fragment key={e.key}>
                  <Button
                    onPress={buttonPressed}
                    disabled={isLast}
                    label={isLast ? e.type : e.title}
                    backgroundColor={isLast ? '#787882' : '#F9F6F6'}
                    textColor={isLast ? 'white' : '#787882'}
                    styleContainer={{
                      marginVertical:0,
                      borderRadius:14,
                      borderColor:'#787882',
                      borderWidth:0.4,
                      padding:0,
                      height:'auto',
                      flex:1/3
                    }}
                    styleText={{
                      textTransform:'capitalize',
                      paddingHorizontal:7,
                      paddingVertical:7,
                      fontSize:11,
                    }}
                  />
                </Fragment>
              )
            })}
          </View>
          <View style={{
              flexDirection:'row',
              flexWrap:'wrap',
              justifyContent:'center',
              alignItems:'center'
            }}
            >
              {(selectedCategory ? [{
                "key":'all',
                "title":'Select All',
                "image": require("assets/meat.png")
              },...filteredPairingArray] : filteredPairingArray).map(e => {
                const onPress = () => {
                  if (e.key === 'all') {
                    toggleItem(filteredPairingArray.reduce((arr,item) => {
                      return [...arr,`${subString} - ${item.key}`]
                    },[]), isAllSelected)
                  } else if (pairingArray.findIndex(p => (p.referrer || []).includes(e.key)) > -1) {
                    setSelectedCategory(e.key)
                  } else {
                    toggleItem([`${subString} - ${e.key}`])
                  }
                }
                const isActive = isAllSelected || pairings.findIndex(p => (new RegExp(subString ? `${subString} - ${e.key}` : e.key)).test(p) ) > -1
                return (
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      backgroundColor:isActive ? activeBackgroundColor : backgroundColor,
                      alignItems:'center',
                      borderColor:'#CACACA',
                      justifyContent:'space-around',
                      borderWidth:0.5,
                      borderRadius:4,
                      height:75,
                      width:(1/3)*(width - 52),
                      marginVertical:6,
                      marginHorizontal:5,
                      paddingHorizontal:4,
                      ...styleContainer
                    }} >
                    <Text style={{
                        color:active ? activeTextColor : textColor,
                        paddingVertical:5,
                        alignSelf:'flex-start',
                        fontSize:11,
                        color:"#787882",
                        ...style
                      }}>{e.title}</Text>
                      <Image
                        style={{height:38}}
                        width={'100%'}
                        source={e.image}
                      />

                    </TouchableOpacity>
                  )
              })}
          </View>
        </View>
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

Pairing.propTypes = {
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
Pairing.defaultProps = {
  backgroundColor:'white',
  activeBackgroundColor:'blue',
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

export default Pairing
