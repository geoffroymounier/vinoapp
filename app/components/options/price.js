import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, Text, Keyboard, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
import TextInput from 'components/forms/textInput';
import { getCountryByCode } from 'components/array/country_code'
import DefaultListItem from 'components/listItems/defaultListItem.js';
import { TextInputMask } from 'react-native-masked-text'

const Price = ({ }) => {
  const inputRef = useRef()
  const [price, setPrice] = useState({ unit: 'EUR', value: '', symbol: '€' })
  useEffect(() => {
    console.log(inputRef.current)
  }, [])
  const { value, symbol, unit } = price
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={66} behavior='height' style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingBottom: 0 }}>
          <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
            <View
              style={{
                alignItems: "center",
                marginBottom: 65
              }}>
              <Icon name={'price_1'} width={64} height={64} />
            </View>
            <View style={{
              alignSelf: 'center',
              borderBottomWidth: 1,
              flexDirection: 'row',
              borderBottomColor: '#CACACA',
              paddingBottom: 17
            }}>
              <TextInputMask
                ref={inputRef}
                autoFocus={true}
                placeholder={'0,00'}
                placeholderTextColor={'#CACACA'}
                keyboardType={'decimal-pad'}
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: ' ',
                  unit: '',
                  suffixUnit: ''
                }}
                value={value}
                style={{ fontSize: 50, textAlign: 'left', minWidth: 200, color: value ? '#787882' : '#CACACA' }}
                onChangeText={(value) => {
                  setPrice({ ...price, value })
                }}
              />
              <Text style={{ fontSize: 50, textAlign: 'center', color: value ? '#787882' : '#CACACA' }}>{symbol}</Text>
            </View>
          </View >
          <View style={{ flex: 0 }}>
            <ScrollView keyboardShouldPersistTaps='always' horizontal>
              {["eu", "us", "gb", "ch", , "nz", "au"].map(country => {
                const { Code: code, symbol: symbolRaw } = getCountryByCode(country)

                const match = (symbolRaw.match(/&#(\d+);/g))
                const symbol = () => <>{match.map(s => String.fromCharCode(s.replace(/&|#|;/g, '')))}</>
                const changeUnit = () => setPrice({ ...price, unit: code, symbol: symbol() })

                const selected = code === unit
                return (
                  <TouchableOpacity key={country} onPress={changeUnit} style={styles.currencyItemContainer}>
                    <Text style={{ ...styles.textCurrency, ...(selected && { fontFamily: 'ProximaNova-Bold' }) }}>{code}</Text>
                    <Icon name={country} width={64} styleContainer={styles.roundedIcon} />
                    <View style={{ opacity: selected ? 1 : 0, height: 2.5, borderRadius: 2, width: '100%', backgroundColor: '#3B3B3D' }}></View>
                  </TouchableOpacity>

                )
              })}

            </ScrollView>

          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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

export default Price;
