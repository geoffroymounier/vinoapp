import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types'
import {Animated,Dimensions,InteractionManager,Easing,StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Checkbox from '../markers/checkbox';
import Image from 'components/forms/image'
import MomentPastille from 'components/thumbnails/moment';
const heartFull = require('../../assets/heart-full.png')
const glassWine = require('../../assets/glass-wine.png')
const bottle = require('../../assets/bottle.png')
import countryFlags from '../../assets/countries/index.js'
import {colors,cepageValues} from '../array/description'
const { height, width } = Dimensions.get('window');

const WineItem = ({
  _id,
  cepage,
  annee,
  favorite,
  pastilles = [],
  activeSelection,
  toggleSelect,
  onPressItem,
  onLongPressItem,
  color,
  region,
  country,
  domain,
  appelation,
  price,
  stock,
  selected
}) => {

  const [widthValue,setWidthValue] = useState(new Animated.Value(0))
  const [opacityValue,setOpacityValue] = useState(new Animated.Value(0))
  const [opacityText,setOpacityText] = useState(new Animated.Value(0))
  const [translateYValue,setTranslateYValue] = useState(new Animated.Value(-0.1*height))
  useEffect(()=>{
    start()
  },[])

  const onPress = () => {

    selectIt(1,()=>{
      selectIt(0,()=> void 0)
      activeSelection ? toggleSelect(_id) : onPressItem(_id)
      selectIt(0,()=> void 0)
    })
  };
  const onLongPress = () => {
    activeSelection ? toggleSelect(_id) : onLongPressItem(_id)
  }
  const selectIt = (value,callback) => {
    Animated.timing(widthValue,{
      toValue: value,
      duration: 150,
      easing : Easing.linear
    }).start(()=>callback())
  }
  const start = () => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1, // Animate to final value of 1
        duration:150,
        useNativeDriver:true,
        delay:300
      }),
      Animated.timing(opacityText, {
        toValue: 1, // Animate to final value of 1
        duration:150,
        useNativeDriver:true,
        delay:0
      }),
      Animated.timing(translateYValue, {
        toValue: 0,
        duration:200,
        useNativeDriver:true,
        delay:300
      }),
    ]).start();
  }
  const animatedStyle = {
    opacity: opacityValue,
    transform: [{ translateY: translateYValue }],
  };
  const animatedText = {
    opacity: opacityText
  };
  const width = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  })
    selectIt(0, ()=> void 0)
    const backgroundColor = (colors[color]||{}).color || '#e6e6e6'
    const textColor = (colors[color]||{}).color == '#FFC401' ? "#262626" : 'white'
    console.log({country})
    return (

      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={{borderColor:"lightgray",borderBottomWidth:1,paddingVertical:5}}
          activeOpacity={1}
          onPressIn={()=>selectIt(1,()=> void 0)}
          onLongPress={onLongPress}
          onPress={onPress}
          >
          <Animated.View style={{position:'absolute',zIndex:10,backgroundColor: 'lightgray', opacity: 0.2, height:"100%", width: width }}/>
        <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:5,height:80}}>
          <View style={{flexDirection:'row',alignItems:'center',flex:6}}>
            {!activeSelection ?
              <Image
                width={50}
                source={glassWine} />
            :
              <Checkbox
               onPress={onPress}
               checked={selected}
              />
            }
            <View style={{paddingHorizontal:10,flex:1}}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.title}>{appelation}</Text>
                {favorite ?
                  <Image
                    height={20}
                    source={heartFull} />
                : void 0}
              </View>
              <View style={{flexDirection:'row',height:30,justifyContent:'flex-start'}}>
                <Image
                  width={18}
                  source={countryFlags[country.toLowerCase()]} />
                <Text style={styles.domain}>{region || ''}</Text>
              </View>
              {annee && <Text style={{...styles.domain,alignSelf:'flex-start'}}>{annee || ''}</Text> }
              {!!domain && <Text style={styles.domain}>{domain} </Text>}
            </View>


            <View style={{alignItems:'flex-end',alignSelf:'flex-start'}}>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}>
                <Text style={{fontSize:18,alignSelf:'flex-end',textAlign:'right'}}>{price ? price + '€':''}</Text>
              </View>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}>
                <Text style={{alignSelf:'center',alignItems:'flex-end',fontSize:18,flexWrap: "wrap",textAlign:'right'}}>{stock}</Text>
                <View>
                  <Image
                    height={32}
                    width={20}
                    source={bottle} />
                </View>
              </View>
          </View>
          </View>
          </View>
          <View style={{...styles.pastilleView,flexWrap:'wrap',justifyContent:'flex-start'}}>
            {(pastilles||[]).map((e,i) => (
              <MomentPastille
                key={i.toString()}
                value={e}
                backgroundColor={backgroundColor}
                textColor={textColor}
              />
              ))}
          </View>

        </TouchableOpacity>
      </Animated.View>
    );
}
export default WineItem
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  pastilleView : {
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',alignItems:'center',
    paddingHorizontal:6
  },
  label:{
    alignSelf:'center',
    fontSize: 20,
    textAlign: 'left',
    marginRight:20,
  },

  chip:{
    margin:5,
  },
  title: {
    fontSize: 20,
    fontFamily:"ProximaNova-Regular",
    alignSelf:'flex-start',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  domain: {
    fontSize: 16,
    fontFamily:"ProximaNova-Regular",
    alignSelf:'center',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  appelation: {
    color:"#262626",
    fontWeight:"800",
    fontSize: 24,
    alignSelf:'flex-start',
    textAlign: 'left',
    margin: 10,
  },
  undertitle: {
    fontSize: 16,
    alignSelf:'flex-start',
    textAlign: 'left',
    marginHorizontal: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
