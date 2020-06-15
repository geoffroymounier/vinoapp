import React, {useRef,useMemo, useState} from 'react';
import PropTypes from 'prop-types'
import {View,StyleSheet,Text,ScrollView,Animated,TouchableOpacity,Dimensions} from 'react-native';
import Filters from 'components/filters';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from 'components/markers/customMarker'
import ActiveComponent from 'components/forms/image'
import Image from 'components/forms/image';
import Icon from 'components/thumbnails/icon';
const search = require('assets/search.png');
const times = require('assets/times.png');
const {width,height} = Dimensions.get('window')

const WineSearchBar = ({onPress,value,placeholder,onClear,active}) => {
  const [openOtherFilters,setOpenOtherFilters] = useState(-1);
  const heightValue = useRef(new Animated.Value(500)).current;
  const heightOpen = useRef(new Animated.Value(500)).current;

  const showView = () => {
    Animated.timing(heightValue,{
      toValue:500,
      duration:500,
    }).start()
  }
  const wrapView = (index) => {
    setOpenOtherFilters(index)
    Animated.timing(heightOpen,{
      toValue:0,
      duration:500,
    }).start()

  }
  const unWrapView = () => {
    setOpenOtherFilters(-1)
    Animated.timing(heightOpen,{
      toValue:500,
      duration:500,
    }).start()

  }
  const hideView = () => {
    Animated.timing(heightValue,{
      toValue:0,
      duration:500,
    }).start()
  }

  const changeOpenFilter = (index) => {
    if (index === -1) {
      unWrapView()
    } else {
      wrapView(index)
    }
  }
  const clearSearch = () => onClear()

  useMemo(()=> active ? showView() : hideView() ,[active])

  return (
    <Animated.View style={{overflow:'hidden',width,maxHeight:heightValue,position:'absolute',backgroundColor:'white',zIndex:10}}>
    <Animated.View style={{overflow:'hidden',maxHeight:heightOpen}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection : 'row',
          alignItems:'center',
          height:28,
          marginTop:11,
          marginHorizontal:10,
          marginBottom:15,
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
        <Text
          style={styles.title}
          >{value || placeholder}
        </Text>
        {!!value  &&
            <Image
              onPress={clearSearch}
              height={16}
              width={16}
              disabled={false}
              source={times}
            />
          }
      </TouchableOpacity>
    </Animated.View>
    <ScrollView style={{marginBottom:50}} nestedScrollEnabled={true}>
      <Animated.View style={{overflow:'hidden',maxHeight:heightOpen}}>
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:10
          }}>
          <View style={{flex:1,maxWidth:0.45*width}}>
            <Text style={styles.categoryTitle}>Color</Text>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              marginHorizontal: 8,
              marginVertical: 10
            }}>
              <TouchableOpacity style={{alignItems:'center'}}>
                <View style={{backgroundColor:'#DC0101', width:25,height:25,borderRadius:25,marginBottom:5}}/>
                <Text style={styles.title}>Red</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems:'center'}}>
                <View style={{backgroundColor:'#FF8C85', width:25,height:25,borderRadius:25,marginBottom:5}}/>
                <Text style={styles.title}>Rosé</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems:'center'}}>
                <View style={{backgroundColor:'#FFFB97', width:25,height:25,borderRadius:25,marginBottom:5}}/>
                <Text style={styles.title}>White</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginRight:30}}>
            <Text style={styles.categoryTitle}>Style</Text>
            <View style={{
              marginVertical: 10
            }}>
              <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}}>
                <Icon width={25} height={25} name={'still'} styleContainer={{marginRight:17}} />
                <Text style={styles.title}>Still</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center',flexDirection:'row',marginTop:11}}>
                <Icon width={25} height={25} name={'sparkling'} styleContainer={{marginRight:17}} />
                <Text style={styles.title}>Sparkling</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection:'row',
            justifyContent:'space-between',
            marginHorizontal:10
          }}>
          <View style={{flex:1}}>
            <Text style={styles.categoryTitle}>Price</Text>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              marginHorizontal: 8,
              marginVertical: 5
            }}>
              <Text style={styles.title}>0 €</Text>
              <MultiSlider
                min={0}
                values={[0,500]}
                enabledOne
                enabledTwo
                selectedStyle = {{backgroundColor:'#3B3B3D'}}
                isMarkersSeparated
                sliderLength={width-130}
                customMarkerLeft={(e) => <CustomMarker
                  active
                 currentValue={e.currentValue}/>
                 }
                 customMarkerRight={(e) => <CustomMarker
                    active
                    currentValue={e.currentValue}/>
                }
                max={500}
                // onValuesChangeFinish={(e)=>triggerSetSearch({minPrice:e[0],maxPrice:e[1]})}
              />
              <Text style={styles.title}>+500 €</Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <View
        style={{
          marginHorizontal:10
        }}>
        {openOtherFilters === -1 && <Text style={styles.categoryTitle}>Other filters</Text>}
        <Filters open={openOtherFilters} onTouch={changeOpenFilter}/>
      </View>
    </ScrollView>
  </Animated.View>

);
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
WineSearchBar.propTypes = {
  placeholder:PropTypes.string,
  value:PropTypes.string.isRequired,
  onPress:PropTypes.func,
  onClear:PropTypes.func,
  active:PropTypes.bool.isRequired
}
WineSearchBar.defaultProps = {
  value:'',
  placeholder:'Search a wine',
  onPress:()=>{},
  onClear:()=>{}
}
export default WineSearchBar;
