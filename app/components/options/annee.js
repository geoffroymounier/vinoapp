import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import {getRegions} from 'functions/api';
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
import TextInput from 'components/forms/textInput';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import HorizontalCarousel from '../listItems/horizontalCarousel';
const { width, height } = Dimensions.get('window')

const filterArray = [
  {
    key: 'year',
    value: 'One specific year',
    color: 'white',
    backgroundColor: '#787882'
  },
  {
    key: 'range',
    value: 'Time Period',
    color: 'white',
    backgroundColor: '#787882'
  }
]
const Annee = ({ selected }) => {
  const START_VALUE = 1990
  const [valueMin, setValueMin] = useState(0)
  const [valueMax, setValueMax] = useState(0)
  const [filters, setFilters] = useState('year')
  const toggleFilter = (key) => {
    setFilters(key)
    if (key === 'year') setValueMax(valueMin)
  }
  let data = [...Array(30).keys()].map(year => ({ "key": (START_VALUE + year).toString() }))
  useEffect(()=>{
    const getData = async () => {
      const response = await getRegions({country:'fr'})
      console.log(response)
    }
    getData()
   
  },[])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 45 }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 24
        }}>
        <Icon name={'best_moment_3'} width={85} height={85} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

        {filterArray.map(({ key, value, backgroundColor, color, underTitle }) => {
          const itemPressed = () => toggleFilter(key);
          
          const selected = filters === key

          return (
            <DefaultButton
              key={key}
              onPress={itemPressed}
              label={value}
              underTitle={underTitle && <Text style={styles.buttonUnderTitle}>{underTitle}</Text>}
              styleContainer={{
                ...styles.buttonContainer,
                ...(selected && { backgroundColor })
              }}
              styleText={{
                ...styles.buttonText,
                ...(selected && { fontWeight: '600', color })
              }}
            />
          )

        })}

      </View>
      {filters === 'year' ?
        <View style={{ ...styles.choiceContainer }}>
          <Separator transparent />
          <Text style={styles.mainText}> </Text>
          <Separator transparent />
          <HorizontalCarousel
            listenToScrollMomentum
            scrollEventThrottle={300}
            defaultValue={valueMin}
            data={data}
            onChange={(value) => {
              setValueMin(value)
              setValueMax(value)
            }} />
        </View>
        :
        <View style={{ ...styles.choiceContainer }}>
          <Separator transparent />
          <Text style={styles.mainText}>Start</Text>
          <Separator transparent />
          <HorizontalCarousel
            listenToScrollMomentum
            scrollEventThrottle={300}
            defaultValue={valueMin}
            data={data}
            onChange={(value) => setValueMin(value)} />
          <Separator transparent />
          <Text style={styles.mainText}>End</Text>
          <Separator transparent />
          <HorizontalCarousel
            listenToScrollMomentum
            scrollEventThrottle={200}
            defaultValue={Math.max(valueMin, valueMax)}
            data={data}
            onChange={(value) => setValueMax(Math.max(valueMin, value))} />
        </View>
      }
      <View style={styles.bottomContainer}>
        <View style={styles.choiceContainer}><Text style={styles.labelText}>Best moment to drink</Text></View>
        <View style={styles.choiceContainer}><Text style={{ ...styles.label }}>{valueMin >= valueMax ? START_VALUE + valueMin : `${START_VALUE + valueMin} - ${START_VALUE + valueMax}`}</Text></View>
      </View>
    </View >
  );
}


const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#3B3B3D',
    fontFamily: 'ProximaNova-Semibold'
  },
  labelText: {
    fontSize: 15,
    flex: 1,
    color: '#787882',
    fontFamily: 'ProximaNova-Regular'
  },
  mainText: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#787882',
    fontFamily: 'ProximaNova-Semibold'
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 75
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
    width: '40%',
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
  }
});

export default Annee;
