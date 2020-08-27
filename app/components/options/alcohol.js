import React, { useRef, useState, useEffect } from 'react'
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, PanResponder } from 'react-native';
import Animated, { interpolate } from "react-native-reanimated";
import { PinchGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
const { event, block, min,max, cond, eq, Value, set, add, debug, concat, call } = Animated;

const  useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const Alcohol = ({
}) => {
    const [state,setState] = useState(0)
    const yValue = useRef(new Value(0)).current;
    const yOffset = useRef(new Value(0)).current;

    const heightComponent = useRef()
    const minValue = new Value(-175)
    const maxValue = new Value(175)
    const heightValue = useRef(new Value(0)).current;
    const setValue = async ([height]) => {
        setState(height)
    }
    const gestureEvent = event([
        {
            nativeEvent: ({ translationX: x, translationY: y, state }) => block([
                    set(yValue,min(maxValue,max(minValue,add(y,yOffset)))),
                    set(heightValue,interpolate(yValue,{inputRange:[-175,175], outputRange:[350,50]})),
                    debug('yvalue',yValue),
                    call([heightValue],setValue),
                    
                    cond(
                        eq(state, State.END), 
                    [
                        debug('end',yOffset),

                        set(yOffset, add(yOffset, y)),
                        
                    ]
                    )
                ])
            
        }
    ])


    return (
        <>
            <View style={{ width, height, justifyContent: 'center', alignItems: 'center',}}>
                <PanGestureHandler
                    onHandlerStateChange={gestureEvent}
                    onGestureEvent={gestureEvent} style={{ ...styles.box, backgroundColor: 'red' }}>
                    <Animated.View
                        style={[
                            styles.box
                        ]}
                    ><Animated.View 
                    ref={heightComponent}
                    style={{height:heightValue, backgroundColor: "red"}}/>
                    </Animated.View>
                   
                </PanGestureHandler>
                <Text>{state}</Text>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        color: "#787882",
        fontFamily: "ProximaNova-Regular"
    },
    box: {
        height: 350,
        width: 150,
        borderRadius: "back",
        // overflow:'hidden',
        borderWidth:2,
        borderRadius: 5,
        justifyContent:'flex-end'
    },
    categoryTitle: {
        fontWeight: "600",
        fontSize: 17,
        color: "#3B3B3D",
        fontFamily: "ProximaNova-Regular"
    },
    buttonIcon: {
        position: 'absolute',
        marginVertical: 0,
        borderRadius: 14,
        borderColor: '#787882',
        borderWidth: 0.4,
        padding: 0,
        height: 20,
        width: 20
    },
    buttonText: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        fontSize: 11,
    }
});

export default Alcohol
