import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'
import { FlatList, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')

const HorizontalCarousel = ({ nbColumns, data, defaultValue, onChange, listenToScroll, listenToScrollMomentum, scrollEventThrottle }) => {
    const offsetWidth = width / nbColumns
    const scrollView = useRef()
    const [value, setValue] = useState(0)
    const throttleValue = useMemo(() => defaultValue, [defaultValue])

    useEffect(() => {
        scrollView.current.scrollTo({ x: offsetWidth * (defaultValue), y: 0, animated: true })
    }, [defaultValue, value])
    useEffect(() => {
        console.log('should scroll View to ' + defaultValue)
        scrollView.current.scrollTo({ x: offsetWidth * (defaultValue), y: 0, animated: true })
        setValue(defaultValue)
    }, [])
    
    const _keyExtractor = (item) => item.key.toString();

    const _renderItem = ({ item, index }) => {
        const scrollToItem = () => scrollView.current.scrollTo({ x: offsetWidth * (index), y: 10, animated: true })

        return (
            <TouchableWithoutFeedback
                onPress={scrollToItem}
                style={{ ...styles.horizontalItem, width: offsetWidth }}
            >
                <Text style={{ ...styles.itemText, ...(throttleValue === index && styles.selectedItemText) }}>
                    {item.key}
                </Text>
            </TouchableWithoutFeedback>
        )
    };
    const didScroll = (e) => {
        const newValue = parseInt(e.nativeEvent.contentOffset.x / offsetWidth)
        onChange(newValue)
        setValue(newValue)
    }
    return (
        <View>
            <View style={{ ...styles.centerView, width: offsetWidth, left: 2 * offsetWidth }}>
            </View>
            <ScrollView
                ref={scrollView}
                horizontal
                scrollEventThrottle={scrollEventThrottle}
                onMomentumScrollEnd={(e) => listenToScrollMomentum && didScroll(e)}
                onScroll={(e) => listenToScroll && didScroll(e)}
                centerContent
                decelerationRate={'fast'}
                alwaysBounceHorizontal={false}
                snapToAlignment="center"
                snapToInterval={offsetWidth}
                style={{ ...styles.horizontalScrollView }}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    data={data}
                    horizontal
                    style={{ paddingHorizontal: 2 * offsetWidth }}
                    keyboardShouldPersistTaps={'always'}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </ScrollView>
        </View>
    );
}

HorizontalCarousel.propTypes = {
    nbColumns: PropTypes.number,
    defaultValue: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    onChange: PropTypes.func,
    listenToScroll: PropTypes.bool,
    listenToScrollMomentum: PropTypes.bool,
    data: PropTypes.array.isRequired,
    styleSelectedItem: PropTypes.object,
    styleContainer: PropTypes.object,
    styleSelectedItem: PropTypes.object,
    styleSelectedText: PropTypes.object
}
HorizontalCarousel.defaultProps = {
    nbColumns: 5,
    scrollEventThrottle: 16,
    defaultValue: 0,
    listenToScroll: false,
    listenToScrollMomentum: false,
    onChange: () => { },
    styleContainer: {},
    styleSelectedItem: {},
    styleText: {},
    styleSelectedText: {}
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: '#3B3B3D',
        fontWeight: '300',
        fontFamily: 'ProximaNova-Regular'
    },
    centerView: {
        position: 'absolute',
        zIndex: 1,
        borderColor: 'black',
        borderWidth: 2,
        marginLeft: -10,
        height: 30
    },
    horizontalItem: {
        backgroundColor: '#F9F6F6',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalScrollView: {
        marginHorizontal: -10,
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'ProximaNova-Regular',
        color: '#787882'
    },
    selectedItemText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3B3B3D'
    },
    centeredText: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#B2B2B8',
        fontFamily: 'ProximaNova-Regular'
    },
    mainText: {
        fontSize: 17,
        alignSelf: 'flex-start',
        color: '#787882',
        fontFamily: 'ProximaNova-Semibold'
    },
    choiceContainer: {
        flex: 1,
        marginHorizontal: 5
    },
    buttonContainer: {
        marginVertical: 0,
        borderRadius: 14,
        borderColor: '#787882',
        borderWidth: 0.4,
        flexWrap: 'wrap',
        padding: 0,
        height: 'auto',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F9F6F6'
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#787882',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'ProximaNova-regular'
    },
    buttonUnderTitle: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: '#3B3B3D',
        fontWeight: '300',
        fontFamily: 'ProximaNova-Regular'
    },
    questionContainer: {
        width: 20,
        height: 20,
        padding: 0,
        backgroundColor: '#F9F6F6'
    },
    questionText: {
        fontWeight: 'normal',
        color: '#787882',
        fontFamily: 'ProximaNova-regular',
        padding: 0,
        fontSize: 10
    }
});

export default HorizontalCarousel;
