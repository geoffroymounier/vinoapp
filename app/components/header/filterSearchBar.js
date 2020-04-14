import React, {useRef,useMemo} from 'react';
import {View,StyleSheet,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native';
import FilterLabels from 'components/thumbnails/filterLabels';
import Image from 'components/forms/image';
const search = require('assets/search.png');
const times = require('assets/times.png');


const SearchView = ({navigation,value,placeholder,onClear,active}) => {

  const heightValue = useRef(new Animated.Value(120)).current;
  const showView = () => {
    Animated.timing(heightValue,{
      toValue:120,
      duration:500,
    }).start()
  }
  const hideView = () => {
    Animated.timing(heightValue,{
      toValue:0,
      duration:500,
    }).start()
  }
  const clearSearch = () => onClear()

  useMemo(()=> active ? showView() : hideView() ,[active])

  return (
    <Animated.View style={{overflow:'hidden',maxHeight:heightValue}}>
    <TouchableOpacity
      onPress={()=>navigation.push('filter')}
      style={{
        flexDirection : 'row',
        alignItems:'center',
        paddingVertical:20,
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
        style={styles.title}
        >{value || placeholder}
      </Text>
      {!!value  ?
          <Image
            onPress={clearSearch}
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
    <ScrollView horizontal style={{maxHeight:50}}>
    {(['Tous','En Stock','Degusté','Sortis','Wish-Listé']).map((e,i) => (
      <FilterLabels
        key={i.toString()}
        value={e}
        disabled={false}
        active={false}
        backgroundColor={'transparent'}
        borderColor={'gray'}
        activeBackgroundColor={'gray'}
        textColor={'black'}
        styleContainer={{height:40,borderRadius:5}}
      />
    )
  )}
  </ScrollView>
    </Animated.View>

);
}

const styles = StyleSheet.create({
  title: {
    fontSize:18,
    flex:1,
    fontFamily:"ProximaNova-Regular"
  }
});

export default SearchView;
