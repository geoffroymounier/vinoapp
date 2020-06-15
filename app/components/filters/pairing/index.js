import React, {useRef} from 'react'
import {Text,TouchableOpacity,View,Dimensions,Image,StyleSheet,TextInput} from 'react-native';
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')

const pairing = [
  {
    key : 'appetizer',
    title : 'Appetizer',
    image:require('assets/appetizer.png'),
  },
  {
    key : 'starter',
    title : 'Starter',
    image:require('assets/starter.png'),
  },
  {
    key : 'meat',
    title : 'Meat',
    image:require('assets/meat.png'),
  },
  {
    key : 'fish',
    title : 'Fish',
    image:require('assets/fish.png'),
  },
  {
    key : 'seafood',
    title : 'Seafood',
    image:require('assets/seafood.png'),
  },
  {
    key : 'ricepasta',
    title : 'Rice & Pasta',
    image:require('assets/rice.png'),
  },
  {
    key : 'cheese',
    title : 'Cheese',
    image:require('assets/cheese.png'),
  },
  {
    key : 'dessert',
    title : 'Dessert',
    image:require('assets/dessert.png'),
  }

]

const Pairing = ({
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    onPress,
    active,
    disabled,
    styleContainer,
    style
  }) => {
  const refInput = useRef()
  const onEdit = () => refInput.current.focus()
  return (
    <View>
      <TouchableOpacity
        onPress={onEdit}
        style={{
          flexDirection : 'row',
          alignItems:'center',
          height:28,
          marginVertical:16,
          marginHorizontal:10,
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
        <TextInput
          ref={refInput}
          style={styles.title}
          placeholder={'search a pairing'}
          />
      </TouchableOpacity>
      <View style={{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center'
      }}
      >
      {pairing.map(e => {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor:active ? activeBackgroundColor : backgroundColor,
              alignItems:'center',
              borderColor:'#CACACA',
              justifyContent:'space-around',
              borderWidth:0.5,
              borderRadius:4,
              height:75,
              width:(1/3)*(width - 52),
              marginVertical:6,
              marginHorizontal:5,
              paddingHorizontal:4,
              ...styleContainer
            }} >
            <Text style={{
              color:active ? activeTextColor : textColor,
              paddingVertical:5,
              alignSelf:'flex-start',
              fontSize:11,
              color:"#787882",
              ...style
            }}>{e.title}</Text>
              <Image

                style={{height:38}}
                width={'100%'}
                source={e.image}
              />

          </TouchableOpacity>
        )
      })}
      </View>
    </View>
  )
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

Pairing.propTypes = {
  backgroundColor:PropTypes.string,
  activeBackgroundColor:PropTypes.string,
  textColor:PropTypes.string,
  activeTextColor:PropTypes.string,
  activeBorderColor:PropTypes.string,
  borderColor:PropTypes.string,
  value:PropTypes.string.isRequired,
  image:PropTypes.object,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  active:PropTypes.bool.isRequired,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
Pairing.defaultProps = {
  backgroundColor:'none',
  activeBackgroundColor:'none',
  textColor:'auto',
  image:null,
  activeTextColor:'auto',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default Pairing
