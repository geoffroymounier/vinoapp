import React, {useState,useEffect} from 'react';
import {Keyboard,SafeAreaView,Dimensions,Platform,StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import DefaultButton  from 'components/buttons/defaultButton'
import TextInput  from 'components/forms/textInput'
import Image  from 'components/forms/image'
import { BlurView } from "@react-native-community/blur";
import times  from 'assets/times.png'
import {useDispatch,useSelector} from 'react-redux';
import {saveCellar} from 'functions/api'
const { height, width } = Dimensions.get('window');

const AddCellar = ({navigation}) => {
  const dispatch = useDispatch()
  const [cellar,setCellar] = useState({})
  const triggerSaveCellar = (cellar,id) => dispatch(saveCellar(cellar,id))
  const goBack = () => {
    // navigation.popToTop();
    navigation.goBack('wines');
  }
  const scanLabel = () => navigation.push('scan_method')
  const searchLabel = () => navigation.push('search_db')
  useEffect(()=>{
    navigation.setOptions({
    //   header :() => (
    //     <View>
    //
    //
    //     <BlurView
    //       style={styles.absolute}
    //       blurType="regular"
    //       reducedTransparencyFallbackColor="white"
    //     />
    //     <Text>cioucio</Text>
    //     </View>
    // ),
      headerRight: () => (
      <DefaultButton
        label={<Image source={times} height={20} width={20} style={{tintColor:'white'}}/>}
        backgroundColor={'transparent'}
        textColor={'white'}
        styleContainer={{position:"absolute",top:5,right:15,width:20,height:20}}
        onPress={goBack}
      />)
    })
  },[])
  const {name,description,commentaire} = cellar
    return (
      <SafeAreaView style={{flex:1,justifyContent:'center'}}>
      <BlurView
        style={styles.absolute}
        blurType="regular"
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={{flex:1,justifyContent:'center'}}>

          <View style={{justifyContent:'center',flex:1,width,borderRadius:20}}>
            <Text style={{...styles.title,alignSelf:'center',color:'white'}}>{"Add Wine"}</Text>

                <DefaultButton
                  label={"New Wine From Database"}
                  onPress={searchLabel}
                  styleContainer={{width:"80%",height:50}}
                />
                <DefaultButton
                  label={"New Wine From Label Scan"}
                  onPress={scanLabel}
                  styleContainer={{width:"80%",height:50}}
                />
                <DefaultButton
                  label={"Add a tasting note"}
                  onPress={searchLabel}
                  styleContainer={{width:"80%",height:50}}
                />



          </View>
          <DefaultButton
            label={"Annuler"}
            backgroundColor={'transparent'}
            textColor={'black'}
            styleContainer={{width:"80%",maxHeight:50,borderColor:'black',borderWidth:1}}
            onPress={goBack}
          />
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

export default AddCellar
