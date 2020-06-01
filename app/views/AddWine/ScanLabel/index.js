import React, {useState,useEffect,useRef} from 'react';
import {Keyboard,SafeAreaView,Dimensions,Platform,StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import DefaultButton  from 'components/buttons/defaultButton'
import TextInput  from 'components/forms/textInput'
import Image  from 'components/forms/image'
import { BlurView } from "@react-native-community/blur";
import {RNCamera} from 'react-native-camera';
import times  from 'assets/times.png'
import {useDispatch,useSelector} from 'react-redux';
import {saveCellar} from 'functions/api'
const { height, width } = Dimensions.get('window');

const maskRowHeight = Math.round((height - 0) / 20);
const maskColWidth = (width - 300) / 2;

const AddCellar = ({navigation}) => {
  const dispatch = useDispatch()
  const arrayLabel = useRef([])
  const incrementalMatch = useRef(0)
  const [cellar,setCellar] = useState({})
  const triggerSaveCellar = (cellar,id) => dispatch(saveCellar(cellar,id))
  const goBack = () => {
    navigation.popToTop();
    navigation.goBack(null);
  }
  const checkSave = () => {
    navigation.popToTop();
    navigation.goBack(null);

      // triggerSaveCellar({...cellar},null)
      //
  }
  // const readLabel = (e) => {
  //   if (incrementalMatch.current >= 1) return
  //   const {textBlocks} = e
  //   const array = textBlocks.map(_ => _.value)
  //   let match = 0
  //   let matchingArray = []
  //   array.map((e,i) => {
  //     if (e === arrayLabel.current[i]) {
  //       matchingArray.push(e)
  //       match++
  //     }
  //   })
  //   console.log(matchingArray)
  //   if ((match/arrayLabel.current.length) > 0.7) {
  //     incrementalMatch.current++
  //   }
  //
  //   arrayLabel.current = array
  //   if (incrementalMatch.current === 1) {
  //     console.log(array)
  //     alert('found match')
  //   }
  // }
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
      <SafeAreaView style={{flex:1,justifyContent:'center'}}>
      <BlurView
        style={styles.absolute}
        blurType="regular"
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity activeOpacity={1} onPress={()=>Keyboard.dismiss()} style={{flex:1,justifyContent:'center'}}>
          <View style={{justifyContent:'center',flex:1,width,borderRadius:20}}>
            <Text style={{...styles.title,alignSelf:'center',color:'white'}}>{"Add Wine"}</Text>

            <RNCamera
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              // onTextRecognized={readLabel}
            >
            <View style={styles.maskOutter}>
              <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
               <View style={[{ flex: 30 }, styles.maskCenter]}>
               <View style={[{ width: maskColWidth }, styles.maskFrame]} />
               <View style={styles.maskInner} />
               <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              </View>
              <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
            </View>
            </RNCamera>



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
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },

});

export default AddCellar
