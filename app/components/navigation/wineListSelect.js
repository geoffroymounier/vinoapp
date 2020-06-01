import React, {useRef,useMemo} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Animated} from 'react-native'
import Layout from './layout'
import SearchView from 'components/header/wineSearchBar';
import TouchableTitleText  from 'components/forms/touchableTitleText'
import Image  from 'components/forms/image'
const search = require('assets/search.png');
import times  from 'assets/times.png'
import arrow from 'assets/arrow-right.png'

const WineListSelect = ({value,onDeselectAll,navigation,params = {}}) => {
  const {activeSelection,selected} = params
  const opacityValue = useRef(new Animated.Value(0)).current;
  const showView = () => {
    Animated.timing(opacityValue,{
      toValue:1,
      duration:200,
      useNativeDriver:true
    }).start()
  }
  const hideView = () => {
    Animated.timing(opacityValue,{
      toValue:0,
      duration:200,
      useNativeDriver:true
    }).start()
  }
  useMemo(()=> activeSelection ? showView() : hideView() ,[activeSelection])
  return (
    <Layout>

      <View style={{...styles.container}}>
        {/* <View style={{...styles.container,flex:1}}>

        <TouchableOpacity
          // onPress={onPress}
          style={{
            flex:1,
            flexDirection : 'row',
            borderRadius:5,
            alignItems:'center',
            paddingVertical:5,
            paddingHorizontal:15,
            backgroundColor:'white',
            shadowBottomColor: "black",
            shadowOpacity: 0.6,
            shadowRadius: 2,
            shadowOffset: {
              height: 0,
              width:0,
            }
          }}
        >
          <Text
            style={styles.search}
            >{'Rechercher'}
          </Text>
          {!!value  ?
              <Image
                // onPress={clearSearch}
                height={16}
                width={16}
                disabled={false}
                source={times}
              />
          :
          <Image
            height={16}
            width={16}
            source={search}
          />
          }
        </TouchableOpacity>
      </View> */}
        {/* <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.setParams({activeSelection:false})}
          >
          <Image
            source={arrow} height={14} width={14}
            styleContainer={{marginRight:10}}
            style={{tintColor:'white',transform: [{ rotate: '180deg'}]}}
          />
            <Text style={styles.title}>{'COUfdfU'}</Text>
        </TouchableOpacity> */}

        <View style={styles.container}>
          <Image source={times} height={24} width={24}
            styleContainer={{alignSelf:'center',borderColor:'white',borderWidth:1,padding:5,borderRadius:5}}
            style={{tintColor:'white'}}/>
          <Image source={times} height={24} width={24}
            disabled={false}
            styleContainer={{marginLeft:10,borderColor:'white',borderWidth:1,padding:5,borderRadius:5}}
            style={{tintColor:'white'}}/>
            <Image source={times} height={24} width={24}
              disabled={false}
              styleContainer={{marginLeft:10,borderColor:'white',borderWidth:1,padding:5,borderRadius:5}}
              style={{tintColor:'white'}}/>
        </View>


        <Animated.View style={{...styles.overlay,opacity:opacityValue}}>
          <TouchableOpacity
             onPress={onDeselectAll}
             style={{...styles.container,flex:1}}>
            <Image
              source={arrow} height={14} width={14}
              styleContainer={{marginRight:10}}
              style={{tintColor:'white',transform: [{ rotate: '180deg'}]}}
            />
            <Text
              style={styles.title}
              >{selected}
            </Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Image source={times} height={24} width={24}
              styleContainer={{alignSelf:'center',borderColor:'white',borderWidth:1,padding:5,borderRadius:5}}
              style={{tintColor:'white'}}/>
            <Image source={times} height={24} width={24}
              disabled={false}
              styleContainer={{marginLeft:10,borderColor:'white',borderWidth:1,padding:5,borderRadius:5}}
              style={{tintColor:'white'}}/>

          </View>
        </Animated.View>
      </View>


    </Layout>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    flex:1,
    color: 'white',
  },
  search: {
    fontSize:18,
    flex:1,
    fontFamily:"ProximaNova-Regular"
  },
  container : {
    paddingHorizontal:5,
    paddingVertical:5,
    alignItems:'center',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  overlay : {

    // left : 0,
    // top:-0,
    position:'absolute',
    height:'100%',
    width:'100%',
    backgroundColor:'#9F041B',
    // opacity:1,



    alignItems:'center',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

export default WineListSelect
