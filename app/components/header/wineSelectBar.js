import React, {useRef,useMemo} from 'react';
import PropTypes from 'prop-types'
import {Animated,TouchableOpacity,View,Text,StyleSheet} from 'react-native'
import Checkbox from '../markers/checkbox';
import Image from 'components/forms/image';
const times = require('assets/times.png');

const WineSelectBar = ({allSelect,onPress,active,leaveSelect}) => {
  const heightValue = useRef(new Animated.Value(0)).current;
  const showView = () => {
    Animated.timing(heightValue,{
      toValue:70,
      duration:300,
    }).start()
  }
  const hideView = () => {
    Animated.timing(heightValue,{
      toValue:0,
      duration:300,
    }).start()
  }
    useMemo(()=> active ? showView() : hideView() ,[active])
    return(
      <Animated.View style={{overflow:'hidden',maxHeight:heightValue}}>
      <TouchableOpacity
        style={{
          flexDirection : 'row',
          alignItems:'center',
          paddingVertical:20,
          paddingLeft:5,
          paddingRight:15,
          backgroundColor:'white',
          shadowBottomColor: "black",
          shadowOpacity: 0.6,
          shadowRadius: 2,
          shadowOffset: {
            height: 0,
            width:0,
          }
        }}
        onPress={onPress} >
          <Checkbox
           onPress={onPress}
           checked={allSelect}
         />
          <Text style={styles.title}>Tout Selectionner</Text>
          <Image
            height={16}
            width={16}
            disabled={false}
            source={times}
            onPress={leaveSelect}
          />
      </TouchableOpacity>
      </Animated.View>
    )

}

const styles = StyleSheet.create({
  title: {
    paddingLeft:10,
    fontSize:18,
    flex:1,
    fontFamily:"ProximaNova-Regular"
  }
});
WineSelectBar.propTypes = {
  onPress:PropTypes.func,
  leaveSelect:PropTypes.func,
  active:PropTypes.bool.isRequired,
  allSelect:PropTypes.bool.isRequired
}
WineSelectBar.defaultProps = {
  value:'',
  placeholder:'Rechercher',
  onPress:()=>{},
  leaveSelect:()=>{}
}
export default WineSelectBar
