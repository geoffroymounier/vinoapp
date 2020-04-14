import React, {useRef,useMemo} from 'react';
import {Animated,TouchableOpacity,View,Text,StyleSheet} from 'react-native'
import Checkbox from '../markers/checkbox';

const SelectBar = ({allSelect,onPress,active}) => {
  const heightValue = useRef(new Animated.Value(0)).current;
  const showView = () => {
    Animated.timing(heightValue,{
      toValue:300,
      duration:500,
      delay:500
    }).start()
  }
  const hideView = () => {
    Animated.timing(heightValue,{
      toValue:0,
      duration:500,

    }).start()
  }
    useMemo(()=> active ? showView() : hideView() ,[active])
    return(
      <Animated.View style={{overflow:'hidden',maxHeight:heightValue}}>
      <TouchableOpacity onPress={onPress} >
        <View style={styles.selectView}>
          <Text style={styles.selectTitle}>Tout Selectionner</Text>
          <Checkbox
           onPress={onPress}
           checked={allSelect}
         />
        </View>
      </TouchableOpacity>
      </Animated.View>
    )

}

const styles = StyleSheet.create({
  selectTitle: {
    paddingHorizontal:10,fontSize:18,flex:1
  },
  selectView: {
    flexDirection:'row',
    borderColor:"lightgray",
    borderBottomWidth:1,padding:10
  }
});
export default SelectBar
