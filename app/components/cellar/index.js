import React, {useRef,useState} from 'react'
import {Text,StyleSheet,ScrollView,TouchableOpacity,View,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import { PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler'
import {setSearch} from 'reduxStore/actions'
import Animated from "react-native-reanimated";
import Icon from 'components/thumbnails/icon';
import Button from 'components/buttons/defaultButton';
import CrossBox from 'components/cellar/box/crossBox';
import PropTypes from 'prop-types'
import { getStoredState } from 'redux-persist';
const {width,height} = Dimensions.get('window')


const LineButtons = () => {

}

const Cellar = ({
    backgroundColor,
    activeBackgroundColor,
    activeBorderColor,
    textColor,
    borderColor,
    activeTextColor,
    disabled,
    styleContainer,
    style
  }) => {
  const [vSeparate,setVSeparate] = useState([])
  const [hSeparate,setHSeparate] = useState([])
  const VELOCITY_THRESHOLD = 0.5;
  const POSITION_THRESHOLD = 0.5;
  const VELOCITY = 50;
  const [cellarStructure,setCellarStructure] = useState({
    winePerBlock:39,
    blockType:'cross',
    vSplit:[[true,true,true],[true,false,true],[true,false,true],[true,false,true]],
    hSplit:[[true,false,true],[true,false,true]],
    vWrap:[[false,false],[false,false],[false,false],[false,false]],
    hWrap:[[false,false],[false,false]]
  })
  const {
    event,
    Value,
    Clock,
    lessThan,
    greaterThan,
    divide,
    diff,
    abs,
    startClock,
    stopClock,
    cond,
    add,
    max,
    min,
    multiply,
    eq,
    set,
  } = Animated;
  const minX = new Value(-50*10)
  const minY = new Value(-50*3)
  const maxX = new Value(50)

  const minScale = new Value(0.5)
  const maxScale = new Value(3.5)
  const dragX = new Value(0);
  const dragY = new Value(0);

  const pinchScale = new Value(1);
  const baseScale = new Value(1);

  const offsetX = new Value(0);
  const offsetY = new Value(0);
  const gestureState = new Value(-1);
  const pinchState = new Value(-1);

  const transX = useRef()
  const transY = useRef()
  const scale = useRef()

  const onPinchGestureEvent = event([
    {
      nativeEvent: {
        scale: pinchScale,
        state: pinchState
      }
    }
  ]);

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        translationY: dragY,
        state: gestureState,
      },
    },
  ]);

  scale.current = cond(
    eq(pinchState, State.ACTIVE),
    min(maxScale,max(minScale,multiply(baseScale, pinchScale))),
    set(baseScale, min(maxScale,max(minScale,multiply(baseScale, pinchScale))))
  )
  transX.current = cond(
    eq(gestureState, State.ACTIVE),
    min(maxX,max(minX,add(offsetX, dragX))),
    set(offsetX, min(maxX,max(minX,add(offsetX, dragX))))
  );

  transY.current = cond(
    eq(gestureState, State.ACTIVE),
    min(maxX,max(minY,add(offsetY, dragY))),
    set(offsetY, min(maxX,max(minY,add(offsetY, dragY))))
  );

  const lineArray = [...Array(1).keys()];
  const colArray = [...Array(2).keys()];
  return (
    <>
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center',backgroundColor:'green' }}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchGestureEvent}
        >

        <Animated.View
          style={{
            width: width,
            transform: [{ scale: scale.current }]
          }}
        >
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
          >
        <Animated.View
        style={{
          width: width,
          transform:[
            {
                translateY : transY.current
            },
            {
                translateX : transX.current
            }
          ]
        }}
        >
        {cellarStructure.hSplit.map((hSplit,line) => {
          
          return (
            <View horizontal key={line.toString} style={{flexDirection:'row'}}>
              {cellarStructure.vSplit.map((vSplit,col) => {
                const vWrap = cellarStructure.vWrap[col]

                const setFirstSeparator = () => {
                  if (!col) return
                  const newVsplit = [!vSplit[0],vSplit[1],vSplit[2]]
                  const newVSplitArray = [...cellarStructure.vSplit]
                  newVSplitArray[col] = newVsplit
                  newVSplitArray[col-1] = [newVSplitArray[col-1][0],newVSplitArray[col-1][1],!newVSplitArray[col-1][2]]
                  setCellarStructure({...cellarStructure,vSplit:newVSplitArray})
                }
                const setMidSeparator = () => {
                  const newVsplit = [vSplit[0],!vSplit[1],vSplit[2]]
                  const newVSplitArray = [...cellarStructure.vSplit]
                  newVSplitArray[col] = newVsplit
                  setCellarStructure({...cellarStructure,vSplit:newVSplitArray})
                }
                const setFirstWrap = () => {
                  const newVWrap= [!vWrap[0],vWrap[1]]
                  const newVWrapArray = [...cellarStructure.vWrap]
                  newVWrapArray[col] = newVWrap
                  setCellarStructure({...cellarStructure,vWrap:newVWrapArray})
                }

                const setLastWrap = () => {
                  const newVWrap= [vWrap[0],!vWrap[1]]
                  const newVWrapArray = [...cellarStructure.vWrap]
                  newVWrapArray[col] = newVWrap
                  setCellarStructure({...cellarStructure,vWrap:newVWrapArray})
                }
                  console.log(vSplit[1],col)
                return (
                <View key={col.toString()} style={{position:'relative'}}>
                  {!line && 
                  <View 
                    style={{flexDirection:'row',backgroundColor:'yellow',position:'absolute',top:-30,width:'100%'
                  }}>
                        <View
                          style={{flex:0,backgroundColor:'red',position:'relative'}}
                        >
                        <Button
                          onPress={setFirstSeparator}
                          styleContainer={{...styles.buttonIcon,opacity: !col ? 0 : vSplit[0] ? 1 : 0.5}}
                          styleText={styles.buttonText}
                          label={'|'} />
                        </View>
                        {!vWrap[1] && 
                        <View
                          style={{flex:1,backgroundColor:'blue'}}
                        >
                          <Button
                          onPress={setFirstWrap}
                          styleContainer={{...styles.buttonIcon,opacity:!vWrap[0] ? 1 : 0.5}}
                          styleText={styles.buttonText}
                          label={'>'} />
                        </View>
                        }
                        {!vWrap[1] && !vWrap[0] &&
                        <View
                          style={{flex:0,backgroundColor:'orange'}}
                        >
                          <Button
                          onPress={setMidSeparator}
                          styleContainer={{...styles.buttonIcon,opacity:vSplit[1] === true ? 1 : 0.5}}
                          styleText={styles.buttonText}
                          label={'|'} />
                        </View>}
                        {!vWrap[0] && 
                        <View
                          style={{flex:1,backgroundColor:'black'}}
                        >
                          <Button
                          onPress={setLastWrap}
                          styleContainer={{...styles.buttonIcon,opacity:!vWrap[1] ? 1 : 0.5}}
                          styleText={styles.buttonText}
                          label={'<'} />
                        </View>}
                      </View> 
}
                      <CrossBox 
                      vSplit={vSplit}
                      hSplit={hSplit}
                      vWrap={vWrap}
                      hWrap={cellarStructure.hWrap[line]}
                      nbBottles={cellarStructure.winePerBlock}
                      />
                </View>
               )})}
            </View>
        )})}
        </Animated.View>
        </PanGestureHandler>
        </Animated.View>
        </PinchGestureHandler>
      </View>
    </>

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
  },
  buttonIcon: {
    position:'absolute',
    marginVertical:0,
    borderRadius:14,
    borderColor:'#787882',
    borderWidth:0.4,
    padding:0,
    height:20,
    width:20
  },
  buttonText:{
    paddingHorizontal:0,
    paddingVertical:0,
    fontSize:11,
  }
});

export default Cellar
