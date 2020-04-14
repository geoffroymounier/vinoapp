import React from 'react'
import {View, TouchableOpacity,Text,Dimensions} from 'react-native'
const {width,height} = Dimensions.get('window')
const CardItem = ({title,route,routeUser}) => {
  const didPress = () => routeUser(route)
  return(
    <View style={{flex:1,alignItems:'center',width:0.3*width,height:0.3*width,margin:5}}>
        <View style={{flex:1,justifyContent:'center'}}>
          <TouchableOpacity
            onPress={didPress}
            style={{
            borderRadius:10,
            padding:5,
            backgroundColor:'white',
            justifyContent:'center',
            width:0.2*width,
            height:0.2*width,
            shadowColor: "black",
            shadowOpacity: 0.6,
            shadowRadius: 5,
            shadowOffset: {
              height: 0,
              width:0,
            }
          }}>
          <View>
            <Text style={{
              textAlign:'center',

            }}>{title}</Text>
          </View>

          </TouchableOpacity>
        </View>
        <View style={{height:24,marginTop:16,justifyContent:'center'}}>
          <Text style={{
            textAlign:'center',
            fontSize: 12,
            fontFamily:"ProximaNova-Semibold",
            textTransform: 'uppercase',
            color:"#434343",}}>{title}</Text>
        </View>
    </View>
  )
}

export default CardItem
