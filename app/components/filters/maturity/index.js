import React, {useRef,useState,useMemo} from 'react'
import {Text,ScrollView,TouchableOpacity,View,Dimensions,Image,StyleSheet,TextInput,FlatList} from 'react-native';
import Button from 'components/buttons/defaultButton';
import DefaultListItem from 'components/listItems/defaultListItem'
import Icon from 'components/thumbnails/icon';
import raw from 'components/array/raw'
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')

const subMenu = [
  {
    key : 'current',
    label : ['2020','2020'],
    title : 'Current year',
  },
  {
    key : 'nextYears',
    label : ['2021','2022'],
    title : 'Next years',
  },
  {
    key : 'outdated',
    label : ['0','2020'],
    title : 'Outdated'
  }
]

const Maturity = ({
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    onPress,
    disabled,
    styleContainer,
    style
  }) => {
  const [active,setActive] = useState([])
  const refInput = useRef()
  const onEdit = () => refInput.current.focus()
  const renderedList = useMemo(()=>{
    return raw.reduce((arr,item) => // here replace raw with wineList and find grape by color
      arr.findIndex(el => el.id === item[active.key]) > -1 ? arr
      :
      [...arr,{
          id:item[active.key],
          title:item[active.label],
          icon:<Icon name={item[active.iconKey]} width={35} height={25} styleContainer={{marginLeft:-11,marginRight:11}}/>
      }]
    ,[])
  },[active.key])
  const toggleSelect = () => {}

  const renderItem = ({item}) => (
    <DefaultListItem
      onPress={toggleSelect}
      styleTitle={{fontSize:13,color:"#787882",fontFamily:"ProximaNova-Regular"}}
      // selected={true}
      {...item}
    />
  );
  return (
    <View>
      <View style={{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
      }}
      >
      {subMenu.map(e => {
        const buttonPressed = () => setActive(e)
        return (
          <Button
            key={e.key}
            onPress={buttonPressed}
            label={e.title}
            backgroundColor={active.key === e.key ? e.backgroundActive : '#F9F6F6'}
            textColor={active.key === e.key ? e.colorActive : '#787882'}
            styleContainer={{
              maxWidth:width/3,
              marginVertical:0,
              borderRadius:14,
              borderColor:'#787882',
              borderWidth:0.4,
              padding:0,
              height:'auto',
              flex:1
            }}
            styleText={{
              paddingHorizontal:7,
              paddingVertical:7,
              fontSize:11,
            }}
          />
        )
      })}
      </View>
      <TouchableOpacity
        onPress={onEdit}
        style={{
          flexDirection : 'row',
          alignItems:'center',
          alignSelf:'center',
          marginVertical:16,
          marginHorizontal:10,
        }}
        >
        <TextInput
          ref={refInput}
          style={styles.title}
          placeholder={'20__'}
          />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize:55,
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

Maturity.propTypes = {
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
Maturity.defaultProps = {
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

export default Maturity
