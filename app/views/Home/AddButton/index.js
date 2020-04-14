import React from 'react'
import {View, TouchableOpacity,Text} from 'react-native'

const AddButton = () => {
  return(
    <TouchableOpacity style={{

      borderRadius:50,
      width:70,
      height:70,
      backgroundColor:'green',
      shadowColor: "black",
      shadowOpacity: 0.6,
      shadowRadius: 5,
      shadowOffset: {
        height: 0,
        width:0,
      }
      }}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:30}}>+</Text>
        </View>
    </TouchableOpacity>
  )
}

export default AddButton
