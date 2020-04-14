import React, {useState,useEffect} from 'react';
import {Keyboard,SafeAreaView,Dimensions,Platform,StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import DefaultButton  from 'components/buttons/defaultButton'
import TextInput  from 'components/forms/textInput'
import Image  from 'components/forms/image'
import { BlurView } from "@react-native-community/blur";
const { height, width } = Dimensions.get('window');

const Slide_1 = ({navigation}) => {
  const nextSlide = () => {
      navigation.push('step_2')
  }
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
                  onPress={nextSlide}
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

export default Slide_1
