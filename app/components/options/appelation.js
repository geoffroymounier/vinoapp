import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import { useFocusEffect } from '@react-navigation/native';
import { sanitizeWine } from 'functions/api'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'components/thumbnails/icon';
import { getAppelations } from 'functions/api';
import Separator from 'components/forms/separator';
import TouchableTextInput from 'components/forms/touchableTextInput'
import TextInput from 'components/forms/textInput';
import DefaultListItem from 'components/listItems/defaultListItem.js';

const filterArray = [
  {
    key: 'aoc',
    value: 'AOP',
    backgroundColor: '#787882',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'igp',
    value: 'IGP',
    backgroundColor: '#787882',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'vsig',
    value: 'VSIG',
    color: 'white',
    backgroundColor: '#787882',
    question: 'CIYHHKJVBCKJHEF'
  }
]
const Appelation = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const storeValue = useSelector((state) => ({
    region: state.wine.region,
    country: state.wine.country,
    appelation: state.wine.appelation,
  }))
  const [updatedData, setUpdatedData] = useState({ ...storeValue })


  const [typeOfAppelation, setTypeOfAppelation] = useState([])
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const [modal, setModal] = useState(null)
  const toggleType = (key) => {
    const index = typeOfAppelation.findIndex(f => f === key)
    if (index > -1) setTypeOfAppelation(typeOfAppelation.filter(f => f !== key))
    else setTypeOfAppelation([...typeOfAppelation, key])
  }
  const _keyExtractor = (item, index) => item.key.toString();

  const onPressItem = ({ key, label, type }) => {
    setUpdatedData({ ...updatedData, appelation: key, appelation: label, appelation_type: type })
  }


  const resetStoreValue = useCallback(() => {
      setUpdatedData({ ...storeValue })
    },
    [storeValue.region],
  )

  useFocusEffect(resetStoreValue)

  useEffect(() => {
    const getData = async () => {
      const response = await getAppelations({
        region: updatedData.region,
        search: `%${search}%`,
        typeOfAppelation: typeOfAppelation.length ? typeOfAppelation.join(',') : ''
      })
      const data = response.map(r => ({ key: r.appelation, label: r.appelation, type: r.type }))
      setData(data)
    }
    getData()
  }, [typeOfAppelation, updatedData.region, search])

  const savePress = () => {
    dispatch(sanitizeWine('appelation',{...storeValue,...updatedData}))
    navigation.navigate(route.params.previousScreen || 'edit_wine_default')
  }
  useLayoutEffect(() => {
    navigation.setParams({ savePress });
  }, [navigation, updatedData]);

  const _renderItem = ({ item }) => {
    const didPress = () => onPressItem(item)
    return (
      <DefaultListItem
        id={item.key}
        onPressItem={didPress}
        selected={updatedData.appelation == item.key}
        title={item.label}
      />
    )
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 24
        }}>
        <Icon name={'appelation'} width={64} height={64} />
      </View>
      <Text style={styles.label}>Data-Driven Research</Text>
      <TextInput
        styleContainer={{ marginVertical: 10 }}
        onChange={(text) => setSearch(text)}
        icon='search'
        placeholder={'Search a Wine'}
      />
      <Separator transparent />
      <Text style={styles.label}>Data-Driven Research</Text>
      <TouchableTextInput
        value={updatedData.region}
        icon={<Icon
          disabled
          height={20}
          width={20}
          name={updatedData.country}
        />}
        placeholder={'Region'}
        onPress={() => navigation.push('region', {
          previousScreen: 'appelation',
          wine: {
            country: updatedData.country,
            region: updatedData.region,
          }
        })}
      />
      <Separator transparent />
      <Text style={styles.centeredText}>Wine Color</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

        {filterArray.map(({ key, value, backgroundColor, color, question }) => {
          const itemPressed = () => toggleType(key);
          const questionPressed = () => setModal(question);
          const selected = typeOfAppelation.findIndex(f => f === key) > -1;

          return (
            <View key={key} style={styles.choiceContainer}>
              <DefaultButton
                onPress={itemPressed}
                label={value}
                styleContainer={{
                  ...styles.buttonContainer,
                  ...(selected && { backgroundColor })
                }}
                styleText={{
                  ...styles.buttonText,
                  ...(selected && { fontWeight: '600', color })
                }}
              />
              <DefaultButton
                onPress={questionPressed}
                label={'?'}
                styleContainer={styles.questionContainer}
                styleText={styles.questionText}
              />
            </View>
          )

        })}

      </View>
      <Separator transparent />
      <Text style={styles.mainText}>Appelation</Text>
      <FlatList
        data={data}
        keyboardShouldPersistTaps={'always'}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </ScrollView >
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
    marginHorizontal: 10
  },
  buttonContainer: {
    marginVertical: 0,
    borderRadius: 14,
    borderColor: '#787882',
    borderWidth: 0.4,
    padding: 0,
    width: '100%',
    height: 32,
    alignItems: 'center',
    backgroundColor: '#F9F6F6'
  },
  buttonText: {
    fontSize: 13,
    padding: 0,
    fontWeight: 'normal',
    color: '#787882',
    fontFamily: 'ProximaNova-regular'
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

export default Appelation;
