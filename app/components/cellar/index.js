import React, {useRef} from 'react'
import {Text,StyleSheet,ScrollView,TouchableOpacity,View,Dimensions} from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import { PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler'
import {setSearch} from 'reduxStore/actions'
import Animated from "react-native-reanimated";
import Icon from 'components/thumbnails/icon';
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')


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
  const VELOCITY_THRESHOLD = 0.5;
  const POSITION_THRESHOLD = 0.5;
  const VELOCITY = 50;
  const rowArray = [
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
    [
      {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ]
  ]
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
  console.log(transX.current)
  return (
    <>
    <View style={{ width, height : 400, justifyContent: 'center', alignItems: 'center',backgroundColor:'green' }}>
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
        {rowArray.map((row,line) => {
        return (
            <View horizontal key={line} style={{flexDirection:'row'}}>
            {row.map((item,col) => (
              <View key={col} style={{width:50,height:50,backgroundColor:'red',borderColor:'blue',borderWidth:1}}/>
            ))}
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
  }
});

export default Cellar
