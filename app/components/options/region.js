import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import { getRegions } from 'functions/api';
import { getCountryByCode } from 'components/array/country_code'
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
import TextInput from 'components/forms/textInput';
import DefaultListItem from 'components/listItems/defaultListItem';
const { width, height } = Dimensions.get('window')
const filterArray = [
  {
    key: 'old',
    value: 'Old World',
    underTitle: 'Main countries',
    backgroundColor: '#787882',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF',
    subItems: ['fr', 'it', 'es', 'de', 'pt']
  },
  {
    key: 'new',
    value: 'New world',
    underTitle: 'Main countries',
    backgroundColor: '#787882',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF',
    subItems: ['us', 'ar', 'au', 'cl', 'za', 'nz']
  },
  {
    key: 'other',
    value: 'Other countries',
    underTitle: null,
    backgroundColor: '#787882',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF',
    subItems: []
  }
]
const Region = ({ route, navigation }) => {
  const [updatedData, setUpdatedData] = useState({ ...route.params })
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(filterArray.find(f => f.subItems.findIndex(item => item === updatedData.country_id) > -1) || {})
  const [countries, setCountries] = useState(updatedData.country_id ? [updatedData.country_id] : [])
  const [modal, setModal] = useState(null)
  const toggleCountries = (key) => {
    const index = countries.findIndex(f => f === key)
    if (index > -1) setCountries(countries.filter(f => f !== key))
    else setCountries([...countries.filter(c => filter.subItems.findIndex(item => item === c) === -1), key])
  }
  const onToggleItem = ({ region_FR, region_id, country_id }) => {
    setUpdatedData({ region_FR, region_id, country_id })
  }
  const toggleFilter = (item) => {
    setFilter(item.key === filter.key ? {} : item)
  }
  const keyExtractor = (item) => item.key.toString();
  useEffect(() => {
    if (!countries.length) {
      return setData([]) // if we deselect all, just clear the data list
    }
    const getData = async () => {
      const response = await getRegions({ countries: countries.join(',') })
      const data = response.map(r => ({ key: r.region_id, label: r.region_FR, country: r.country_id }))
      setData(data)
    }
    getData()
  }, [countries])
  const savePress = () => {
    navigation.navigate('edit_wine_default', { updatedData })
  }
  useLayoutEffect(() => {
    navigation.setParams({ savePress });
  }, [navigation, updatedData]);
  // trim the data array regarding the switch tab updatedData
  
  
  const renderItem = ({ item }) => {
    const onPressItem = () => onToggleItem({ region_FR: item.label, region_id: item.key, country_id: item.country })
    return (
      <DefaultListItem
        id={item.key}
        onPressItem={onPressItem}
        selected={updatedData.region_id === item.key}
        title={item.label}
      />
    )
  };

  const filteredData = useMemo(() => data.filter(d => filter.subItems.findIndex(item => item === d.country) > -1), [filter, data])
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 24
        }}>
        <Icon name={'region'} width={64} height={64} />
      </View>
      <Text style={styles.label}>Manual Selection</Text>
      <TextInput
        styleContainer={{ marginVertical: 10 }}
        onChange={() => { }}
        icon='search'
        placeholder={'Search a Wine'}
      />
      <Separator transparent />
      <Text style={styles.label}>Data-Driven Research</Text>
      <Separator transparent />
      <Text style={styles.centeredText}>Geographical zones</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        {filterArray.map(({ key, value, backgroundColor, color, question, underTitle }, idx) => {
          const itemPressed = () => toggleFilter(filterArray[idx]);
          const questionPressed = () => setModal(question);
          const isSelected = filter.key === key
          return (
            <View key={key} style={styles.choiceContainer}>
              <DefaultButton
                onPress={itemPressed}
                label={value}
                underTitle={underTitle && <Text style={{ ...styles.buttonUnderTitle, ...(isSelected && { color }) }}>{underTitle}</Text>}
                styleContainer={{
                  ...styles.buttonContainer,
                  ...(isSelected && { backgroundColor })
                }}
                styleText={{
                  ...styles.buttonText,
                  ...(isSelected && { fontWeight: '600', color })
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
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginVertical: 10 }}>
        {(filter.subItems || []).map(e => {
          const { Country: country } = getCountryByCode(e)
          const isActive = countries.findIndex(country => country === e) > -1
          const onPress = () => toggleCountries(e)
          return (
            <TouchableOpacity
              key={e}
              onPress={onPress}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 75,
                width: 0.25 * width - 5,
              }} >
              {isActive && <Icon styleContainer={{ zIndex: 2, position: 'absolute', right: 15, top: 5 }} name={'checked'} width={14} height={14} />}
              {e && <View style={{
                height: 24,
                width: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name={e} width={64} styleContainer={styles.roundedIcon} /></View>
              }
              <Text style={{ ...styles.textCountry, ...(isActive && styles.textCountrySelected) }}>{country}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Separator transparent />
      <Text style={styles.mainText}>Region</Text>
      <FlatList
        data={filteredData}
        keyboardShouldPersistTaps={'always'}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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
    marginHorizontal: 5
  },
  buttonContainer: {
    marginVertical: 0,
    borderRadius: 14,
    borderColor: '#787882',
    borderWidth: 0.4,
    flexWrap: 'wrap',
    padding: 0,
    height: 50,
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
    justifyContent: 'center',
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
  },
  roundedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    resizeMode: 'repeat',
    maxHeight: 24,
    maxWidth: 24,
    marginVertical: 8,
    height: 24,
    width: 24,
    borderRadius: 24,
    overflow: 'hidden'
  },
  textCountry: {
    marginVertical: 5,
    paddingVertical: 5,
    fontFamily: 'ProximaNova-regular',
    textAlign: 'center',
    fontSize: 14,
    color: "#787882",
  },
  textCountrySelected: {
    color: "#3B3B3D",
    fontFamily: 'ProximaNova-Semibold'
  }
});
export default Region;
