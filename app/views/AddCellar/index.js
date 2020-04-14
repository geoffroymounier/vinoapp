import React, {useState,useEffect} from 'react';
import {Keyboard,Dimensions,Platform,StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import DefaultButton  from 'components/buttons/defaultButton'
import TextInput  from 'components/forms/textInput'
import Image  from 'components/forms/image'
import times  from 'assets/times.png'
import {useDispatch,useSelector} from 'react-redux';
import {saveCellar} from 'functions/api'
const { height, width } = Dimensions.get('window');

const AddCellar = ({navigation}) => {
  const dispatch = useDispatch()
  const [cellar,setCellar] = useState({})
  const triggerSaveCellar = (cellar,id) => dispatch(saveCellar(cellar,id))
  const goBack = () => navigation.goBack()
  const checkSave = () => {
      navigation.push('region')
      // triggerSaveCellar({...cellar},null)
      // navigation.goBack()
  }
  useEffect(()=>{
    navigation.setOptions({
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
      <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',flex:1,justifyContent:'center'}}>
        <KeyboardAvoidingView behavior='padding'  keyboardShouldPersistTaps="never" >
          <View style={{alignSelf:'flex-end',width,backgroundColor:'#FCF7F7',borderRadius:20}}>
            <Text style={{...styles.title,alignSelf:'center',color:'#5D5D5D'}}>Ajouter une cave</Text>
              <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                <View style={{flex:1}}>
                  <TextInput
                    label={'Nom'}
                    value={name}
                    placeholder={"Entrez un nom pour cette cave"}
                    onChange={(name)=>setCellar({name})}
                  />
                  <TextInput
                    label={'Description'}
                    value={description}
                    placeholder={"Entrez une courte description"}
                    onChange={(description)=>setCellar({description})}
                  />
                   <View style={{flexDirection:'row'}}>
                    <DefaultButton
                      label={"OK"}
                      onPress={checkSave}
                    />
                    </View>
                </View>
              </View>
          </View>
        </KeyboardAvoidingView>
        </TouchableOpacity>



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
  appelation: {
    color:'#848484',
    fontWeight:"600",
    fontSize: 16,
    alignSelf:'flex-start',
    textAlign: 'left',
    marginVertical: 3,
  },
});

export default AddCellar
