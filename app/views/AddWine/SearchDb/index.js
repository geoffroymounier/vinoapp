import React, { useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, FlatList, Dimensions, StyleSheet, Text, View } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import TextInput from 'components/forms/textInput';
import DefaultListItem from 'components/listItems/defaultListItem';
import Separator from 'components/forms/separator';
import { getCountryByCode } from 'components/array/country_code'
import { colors as getColor } from 'components/array/description';
import {  searchWineByRegionOrAppelation } from 'functions/api';;
const { width } = Dimensions.get('window');

const SearchDb = ({ navigation }) => {
  const [countries, setCountries] = useState([])
  const [colors, setColors] = useState([])
  const [data, setData] = useState([])
  const keyExtractor = (item) => item.appelation_id


  const toggleColors = (key) => {
    const index = colors.findIndex(f => f === key)
    if (index > -1) setColors(colors.filter(f => f !== key))
    else setColors([...colors, key])
  }

  const toggleCountries = (key) => {
    const index = countries.findIndex(f => f === key)
    if (index > -1) setCountries(countries.filter(f => f !== key))
    else setCountries([...countries, key])
  }

  const onPressItem = (wineId) => {
    Keyboard.dismiss()

    const wine = data.find(w => w.appelation_id === wineId)
    navigation.push('edit_wine',
      {
        screen: 'edit_wine_default',
        params: { wine },
      });
  };

  const renderItem = ({ item }) => (
    <DefaultListItem
      id={item.appelation_id}
      onPressItem={onPressItem}
      title={`${item.appelation_name} - ${item.region_FR}`}
      styleContainer={{ backgroundColor: "white" }}
    />
  );

  const searchValueChanged = async (search) => {
    if (search.length < 2) return
    try {
      const results = await searchWineByRegionOrAppelation({ search: `%${search}%` })
      setData(results)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView keyboardDismissMode={'on-drag'} style={{ flex: 1 }}>
        <View style={{ justifyContent: 'center', flex: 1, width, borderRadius: 20 }}>
          <Text style={styles.title}>Pre-filter</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

            {['red', 'white'].map((e) => {
              const { label, color, textColor, textActive } = getColor[e]
              const onPressColor = () => toggleColors(e)
              const isSelected = colors.find(c => c === e)
              return (

                <DefaultButton
                  key={e}
                  onPress={onPressColor}
                  label={label}
                  styleContainer={{
                    marginVertical: 0,
                    borderRadius: 14,
                    borderColor: '#787882',
                    borderWidth: 0.4,
                    padding: 0,
                    height: 'auto',
                    flex: 0.3,
                    backgroundColor: isSelected ? color : '#F9F6F6'
                  }}
                  styleText={{
                    paddingHorizontal: 7,
                    paddingVertical: 7,
                    fontSize: 13,
                    fontWeight: 'normal',
                    color: isSelected ? textActive : textColor,
                    fontFamily: 'ProximaNova-regular'
                  }}
                />
              )
            })}
          </View>
          <Separator length={'50%'} />
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 10
          }}>
            {['fr', 'it', 'pt', 'es', 'de', 'nw'].map((e) => {
              const { Country: country } = e === 'nw' ? { Country: 'New world' } : getCountryByCode(e)
              const onPressCountry = () => toggleCountries(e)
              const isSelected = countries.find(country => country === e)
              return (
                <DefaultButton
                  key={e}
                  onPress={onPressCountry}
                  label={country}
                  icon={e}
                  roundedIcon
                  styleContainer={{
                    marginVertical: 0,
                    borderRadius: 14,
                    borderColor: isSelected ? '#3B3B3D' : '#787882',
                    borderWidth: isSelected ? 1.2 : 0.4,
                    padding: 0,
                    height: 30,
                    alignItems: 'center',
                    paddingHorizontal: 7,
                    justifyContent: 'flex-start',
                    minWidth: 90,
                    marginVertical: 6,
                    marginHorizontal: 11,
                    backgroundColor: 'transparent'
                  }}
                  styleText={{
                    paddingHorizontal: 7,
                    paddingVertical: 7,
                    fontSize: isSelected ? 11 : 11,
                    color: isSelected ? '#3B3B3D' : '#787882',
                    fontWeight: isSelected ? '600' : "normal",
                    fontFamily: isSelected ? 'ProximaNova-Semibold' : 'ProximaNova-regular'
                  }}
                />
              )
            })}
          </View>
          <Separator length={'50%'} />
          <TextInput
            styleContainer={{ marginVertical: 10 }}
            onChange={searchValueChanged}
            icon='search'
            placeholder={'Search a Wine'}
          />
          <FlatList
            data={data}
            keyboardShouldPersistTaps={'always'}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    margin: 10,
    fontWeight: '600',
    color: '#787882',
    fontFamily: 'ProximaNova-Regular'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});

export default SearchDb;
