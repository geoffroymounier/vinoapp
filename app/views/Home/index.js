import React from 'react'
import CardItem from './CardItem'
import ListButton from './ListButton'
import AddButton from './AddButton'
import {View, TouchableOpacity,Text} from 'react-native'

const Home = ({navigation}) => {
  const routeUser = (route) => {
    navigation.push(route)
  }
  return(
    <View style={{
      flex:1,

      justifyContent:'center'
    }}>
      <View style={{
        height:'60%',
        justifyContent:'space-between',

      }}>
        <View style={{
          width:'80%',
          alignSelf:'center',
          flexDirection:'row',
          justifyContent:'center'
        }}>
          <CardItem title={'mes vins en cave'} route={'wines'} routeUser={routeUser}/>
          <CardItem title={'mes vins degustes'} route={'wines'} routeUser={routeUser}/>
          <CardItem title={'ma wish list'} route={'wines'} routeUser={routeUser}/>
        </View>
        <View style={{alignSelf:'center'}}>
          <AddButton />
        </View>
        <View style={{width:'90%',alignSelf:'center'}}>
          <ListButton title={'chercher'}/>
          <ListButton title={'mes caves'}/>
        </View>
      </View>
    </View>
  )
}

export default Home
