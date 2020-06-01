import React, {useState,useEffect} from 'react';
import {Keyboard,SafeAreaView,FlatList,Dimensions,Platform,StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import DefaultButton  from 'components/buttons/defaultButton'
import TextInput  from 'components/forms/textInput'
import DefaultListItem from 'components/listItems/defaultListItem'
import Image  from 'components/forms/image'
import { BlurView } from "@react-native-community/blur";
import times  from 'assets/times.png'
import {useDispatch,useSelector} from 'react-redux';
import {textSearch} from 'functions/api'
import axios from 'axios'
const { height, width } = Dimensions.get('window');

function searchWineBase(wine) {

    const URL = "http://api.globalwinescore.com/globalwinescores/latest?wine=Sainte%20"
    axios(URL, {
      method : 'GET',
      credentials: 'same-origin',
      headers: {
        "Accept" : "application/json",
        "Authorization": "Token db8794b625ac276302a401f7d826d57b169721c1"
      }
    }).then(async function (res){
      console.log({res})
        const result = await res.json()
        console.log(result)
    }).catch(e => console.log({e}))
  // })

}

const SearchDb = ({navigation}) => {
  const [data,setData] = useState([])
  const goBack = () => {
    navigation.popToTop();
    navigation.goBack(null);
  }
  const checkSave = () => {
    navigation.popToTop();
    navigation.goBack(null);
  }

  const keyExtractor = (item) => item._id

  const onPressItem = (id) => {
    Keyboard.dismiss()
    let newWine = {
      appelation : (id == -1) ? null : this.props.appelations[id].appelation
    }
    if (id != -1 ) {
      newWine.region = this.props.appelations[id].region
      newWine.country = this.props.appelations[id].country_code
    }

    this.props.search ? this.props.setSearch(newWine) : this.props.setWine(newWine)
    this.props.navigation.goBack()
  };

  const renderItem = ({item}) => (
    <DefaultListItem
      id={item._id}
      onPressItem={onPressItem}
      title={`${item.appelation}`}
      styleContainer={{backgroundColor:"white"}}
    />
  );
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <DefaultButton
          label={<Image source={times} height={20} width={20} style={{tintColor:'white'}}/>}
          backgroundColor={'transparent'}
          textColor={'white'}
          styleContainer={{position:"absolute",top:5,right:15,width:20,height:20}}
          onPress={goBack}
        />
      )
    })
  },[])
  const searchValueChanged = async (e) => {
    if (e.length < 2) return
    try {
      const regexp = new RegExp(e,'gi')
      const results = await textSearch({search:e})
      setData(results.filter(r => regexp.test(r.text)).sort())

    } catch (e) {
      console.log(e)
    }


    // console.log(results)
  }

    return (
      <SafeAreaView style={{flex:1,justifyContent:'center'}}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={{flex:1,justifyContent:'center'}}>

          <View style={{justifyContent:'center',flex:1,width,borderRadius:20}}>
            <Text style={{...styles.title,alignSelf:'center',color:'white'}}>{"Add Wine"}</Text>

                <TextInput
                  onChange={searchValueChanged}
                />
                <FlatList
                  data={data}
                  keyboardShouldPersistTaps={'always'}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}

                />
                <DefaultButton
                  label={"Add a Wine from scratch"}
                  onPress={checkSave}
                  styleContainer={{width:"80%",height:50}}
                />



          </View>

        </TouchableOpacity>
        </SafeAreaView>



    );

}


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    alignSelf:'flex-start',
    textAlign: 'left',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

});

export default SearchDb
