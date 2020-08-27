import React, { useRef, useState, useEffect } from 'react'
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, PanResponder } from 'react-native';
import Animated, { interpolate } from "react-native-reanimated";
import { State, PanGestureHandler } from 'react-native-gesture-handler'
import Svg, {
    Stop,
    LinearGradient,
    Defs,
    Polygon,
    G
} from 'react-native-svg'
const { width, height } = Dimensions.get('window')
const { event, block, min, max, cond, eq, Value, set, add, call } = Animated;

const Alcohol = ({
}) => {
    const [state, setState] = useState(0)
    const [svgHeight, setSvgHeight] = useState('0')
    const yValue = useRef(new Value(0)).current;
    const yOffset = useRef(new Value(0)).current;

    const alcoholValue = useRef(new Value(0)).current;
    const minValue = new Value(-175)
    const maxValue = new Value(175)
    const heightValue = useRef(new Value(0)).current;
    const setValue = async ([height]) => {
        setState(height.toFixed(1))
        setSvgHeight((100 * (1 - (height / 24))).toFixed(0))
    }
    const gestureEvent = event([
        {
            nativeEvent: ({ translationX: x, translationY: y, state }) => block([
                set(yValue, min(maxValue, max(minValue, add(y, yOffset)))),
                set(heightValue, interpolate(yValue, { inputRange: [minValue, maxValue], outputRange: [350, 50] })),
                set(alcoholValue, interpolate(heightValue, { inputRange: [50, 350], outputRange: [5, 24] })),
                call([alcoholValue], setValue),
                cond(
                    eq(state, State.END),
                    [
                        set(yOffset, add(yOffset, y)),
                    ]
                )
            ])
        }
    ])
    return (
        <>
            <View style={{ width, height, justifyContent: 'center', alignItems: 'center', }}>
                <PanGestureHandler
                    onHandlerStateChange={gestureEvent}
                    onGestureEvent={gestureEvent} style={{ ...styles.box, backgroundColor: 'red' }}>
                    <Animated.View style={styles.box}
                    ><Svg height="210" width="210">
                            <Defs>
                                <LinearGradient id="half" gradientTransform="rotate(90)">
                                    <Stop offset="0%" stopColor="white" />
                                    <Stop offset={`${svgHeight}%`} stopColor="white" />
                                    <Stop offset={`${svgHeight}%`} stopColor="blue" />
                                    <Stop offset="100%" stopColor="blue" />
                                </LinearGradient>
                            </Defs>
                            <G fill="url(#half)" stroke="blue" strokeWidth="2">
                                <Polygon points="100,10 40,198 190,78 10,78 160,198" />
                                <Polygon points="100,10 40,198 190,78 10,78 160,198" stroke="none" />
                            </G>
                        </Svg>
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
        justifyContent: 'center'
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
