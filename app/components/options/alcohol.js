import React, { useRef, useState, useLayoutEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Animated from "react-native-reanimated";
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
import { State, PanGestureHandler } from 'react-native-gesture-handler'
import Svg, {
    Stop,
    LinearGradient,
    Defs,
    Path,
} from 'react-native-svg'
const { width, height } = Dimensions.get('window')
const { event, block, min, max, cond, eq, Value, set, add, call, interpolate } = Animated;

const Alcohol = ({route, navigation}) => {
    const HEIGHT = 300;
    const DEG_MAX = 24;
    const DEG_MIN = 5;
    const COLOR= "#FFFB97";
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
        setSvgHeight((100 * (1 - (0.8 * height / DEG_MAX))).toFixed(0))
    }

    const savePress = () => {
        navigation.navigate(route.params.previousScreen || 'edit_wine_default', {wine : {alcohol:state}})
      }
      useLayoutEffect(() => {
        navigation.setParams({ savePress });
      }, [navigation]);
      // trim the data array regarding the switch tab updatedData
  
      
    const gestureEvent = event([
        {
            nativeEvent: ({ translationX: x, translationY: y, state }) => block([
                set(yValue, min(maxValue, max(minValue, add(y, yOffset)))),
                set(heightValue, interpolate(yValue, { inputRange: [minValue, maxValue], outputRange: [350, 50] })),
                set(alcoholValue, interpolate(heightValue, { inputRange: [50, 350], outputRange: [DEG_MIN, DEG_MAX] })),
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
        <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 24
                }}>
                <Icon name={'alcohol_3'} width={64} height={64} />
                <Text style={styles.centeredText}>Alcohol Degree</Text>
            </View>
            
            <Separator transparent />
            <PanGestureHandler
                onHandlerStateChange={gestureEvent}
                onGestureEvent={gestureEvent} style={{ ...styles.box, backgroundColor: 'red' }}>
                <Animated.View style={{ ...styles.box, height: HEIGHT }}>
                    <Svg viewBox="0 -20 512 552" width="350" height={HEIGHT} >
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="white" />
                                <Stop offset={`${svgHeight}%`} stopColor="white" />
                                <Stop offset={`${svgHeight}%`} stopColor={COLOR} />
                                <Stop offset="100%" stopColor={COLOR} />
                            </LinearGradient>
                        </Defs>
                        <Path
                            fill="url(#grad)"
                            stroke="#787882"
                            strokeWidth="20"
                            d="M349.414,130.314c-40.321-62.959-81.228-114.885-81.636-115.403L255.999,0l-11.778,14.912
		                    	c-0.408,0.517-41.315,52.443-81.636,115.403C107.413,216.46,79.44,281.687,79.44,324.184C79.44,427.746,158.644,512,256,512
                                s176.56-84.254,176.56-187.816C432.559,281.687,404.586,216.46,349.414,130.314z"
                        />
                    </Svg>
                    <Animated.View style={{
                        position: 'absolute',
                        top: `${(287 / 300) * svgHeight}%`,
                        transform: [{ translateY: 15 }]
                    }}>
                        <Text style={styles.text}>{`${state} %`}</Text>
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
             </ScrollView>
             )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        color: "#787882",
        fontFamily: "ProximaNova-Regular"
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        color: '#787882',
        fontFamily: "ProximaNova-Bold",
        fontSize: 20,
    },
    centeredText: {
        marginTop:5,
        fontSize: 15,
        alignSelf: 'center',
        color: '#B2B2B8',
        fontFamily: 'ProximaNova-Semibold'
      },
});

export default Alcohol
