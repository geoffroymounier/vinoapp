import React from 'react'
import {View, TouchableOpacity,Text} from 'react-native'

const ListButton = ({title}) => {
  return(
    <TouchableOpacity style={{

      borderRadius:10,
      backgroundColor:'white',
      shadowColor: "black",
      marginVertical:15,
      shadowOpacity: 0.6,
      shadowRadius: 1,
      shadowOffset: {
        height: 0,
        width:0,
      }
      }}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{
            padding:15,
            fontSize:18,
            fontFamily:"ProximaNova-Semibold",
            textTransform: 'uppercase'
          }}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ListButton
