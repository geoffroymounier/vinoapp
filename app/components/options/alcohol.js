import React, { useRef, useState, useEffect } from 'react'
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, PanResponder } from 'react-native';
import Animated, { interpolate } from "react-native-reanimated";
import { State, PanGestureHandler } from 'react-native-gesture-handler'
import Svg, {
    Stop,
    LinearGradient,
    Defs,
    Polygon,
    Path,
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
    console.log(svgHeight)
    return (
        <>
            <View style={{ width, height, justifyContent: 'center', alignItems: 'center', }}>
                <PanGestureHandler
                    onHandlerStateChange={gestureEvent}
                    onGestureEvent={gestureEvent} style={{ ...styles.box, backgroundColor: 'red' }}>
                    <Animated.View style={styles.box}>
                        <Svg x="0" y="0" enableBackground="0 0 477.614 477.614" viewBox="0 0 477.614 477.614" width="350" height="350" >
                            <Defs>
                                <LinearGradient id="half" gradientTransform="rotate(90)" spreadMethod="pad">
                                    <Stop offset="0%" stopColor="white" />
                                    <Stop offset={`${svgHeight}%`} stopColor="white" />
                                    <Stop offset={`${svgHeight}%`} stopColor="blue" />
                                    <Stop offset="100%" stopColor="blue" />
                                </LinearGradient>
                            </Defs>
                            <Path d="M84.9182 2.19768L84.9184 2.1979C85.1049 2.41106 103.938 24.063 122.503 50.6424C135.204 68.8246 144.77 84.9123 151.161 98.809C157.553 112.708 160.762 124.403 160.762 133.803C160.762 155.829 152.518 174.565 136.924 187.998C122.468 200.452 102.42 207.316 80.4682 207.316C58.5183 207.316 38.4704 200.452 24.0141 187.999C8.41991 174.566 0.174099 155.83 0.174099 133.803C0.174099 124.403 3.38352 112.708 9.77543 98.809C16.1663 84.9123 25.7327 68.8246 38.4329 50.6424C56.8789 24.2337 75.5911 2.68939 76.0125 2.20412L76.0181 2.19777C77.1407 0.912158 78.763 0.174099 80.4682 0.174099C82.1735 0.174099 83.7973 0.912206 84.9182 2.19768ZM129.202 179.062L129.209 179.057L129.215 179.051C142.13 167.926 148.953 152.276 148.953 133.803C148.953 125.713 145.819 115.062 139.743 102.219C133.665 89.3724 124.634 74.3151 112.822 57.4052C100.075 39.1536 87.2238 23.3034 80.6019 15.3672L80.4682 15.207L80.3345 15.3673C73.6999 23.3208 60.8107 39.2201 48.0539 57.4923C36.2618 74.3816 27.2463 89.4207 21.1782 102.253C15.112 115.081 11.9835 125.72 11.9835 133.803C11.9835 152.276 18.8059 167.926 31.7209 179.051C44.0454 189.667 61.3588 195.506 80.4682 195.506H80.4871L80.5057 195.502C84.7134 194.575 88.4167 193.771 91.6984 193.059C102.266 190.765 108.463 189.42 113.062 187.947C119.105 186.012 122.399 183.853 129.202 179.062Z" fill="#787882" stroke="white" strokeWidth="0.348197"/>
                            <Path fill="url(#half)" d="
                                M251.385,5.277c-6.823-6.947-17.985-7.047-24.931-0.225c-0.076,0.074-0.151,0.149-0.225,0.225
                                C219.778,12.325,68.14,179.254,68.14,306.947c0,113.254,57.412,170.667,170.667,170.667s170.667-57.412,170.667-170.667
			                    C409.474,179.254,257.836,12.325,251.385,5.277z"/>
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
