import React, { useState } from 'react';
import { View, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'components/thumbnails/icon';
import TextInput from 'components/forms/textInput';

const Quantity = ({ defaultValue }) => {
    const [value, setValue] = useState(defaultValue)

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, paddingBottom: 0 }}>
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 65
                        }}>
                        <Icon name={'quantity_4'} width={64} height={64} />
                    </View>
                    <View style={{
                        alignSelf: 'center',
                    }}>
                        <TextInput
                            autoFocus={true}
                            placeholder={'0'}
                            placeholderTextColor={'#CACACA'}
                            keyboardType={'number-pad'}
                            value={value}
                            styleText={{ fontSize: 50, textAlign: 'center', color: value ? '#787882' : '#CACACA' }}
                            styleContainer={{
                                borderWidth: 0,
                                minWidth: 200,
                                // width: '100%',
                                borderBottomWidth: 1,
                                borderBottomColor: '#CACACA',
                                paddingBottom: 17,
                            }}
                            onChange={(value) => {
                                setValue(value)
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View >
    );
}


const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: '#3B3B3D',
        fontWeight: '300',
        fontFamily: 'ProximaNova-Regular'
    },
    textCurrency: {
        color: "#787882",
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'ProximaNova-Regular'
    },
    centeredText: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#B2B2B8',
        fontFamily: 'ProximaNova-Regular'
    },
    currencyItemContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 10,

    },
    roundedIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        resizeMode: 'repeat',
        maxHeight: 32,
        maxWidth: 32,
        marginVertical: 8,
        height: 32,
        width: 32,
        borderRadius: 32,
        overflow: 'hidden'
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

export default Quantity;
