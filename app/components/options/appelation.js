import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
import TextInput from 'components/forms/textInput';
import DefaultListItem from 'components/listItems/defaultListItem.js';

const filterArray = [
  {
    key: 'aoc',
    value: 'AOP',
    backgroundColor:'#787882',
    color:'white',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'igp',
    value: 'IGP',
    backgroundColor:'#787882',
    color:'white',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'vsig',
    value: 'VSIG',
    color:'white',
    backgroundColor:'#787882',
    question: 'CIYHHKJVBCKJHEF'
  }
]
const Appelation = ({ selected }) => {
  const [filters, setFilters] = useState([])
  const [modal, setModal] = useState(null)
  const toggleFilter = (key) => {
    const index = filters.findIndex(f => f === key)
    if (index > -1) setFilters(filters.filter(f => f !== key))
    else setFilters([...filters, key])
  }
  const _keyExtractor = (item, index) => item.key.toString();

  const _onPressItem = (id) => {
  };

  const _renderItem = ({ item }) => (
    <DefaultListItem
      id={item.key}
      onPressItem={_onPressItem}
      selected={selected == item.appelation}
      title={item.label}
    />
  );
    console.log({filters})
  let data = []
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
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
        onChange={() => { }}
        icon='search'
        placeholder={'Search a Wine'}
      />
      <Separator transparent />
      <Text style={styles.label}>Data-Driven Research</Text>
      <Separator transparent />
      <Text style={styles.centeredText}>Wine Color</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

        {filterArray.map(({ key, value,backgroundColor,color, question }) => {
          const itemPressed = () => toggleFilter(key);
          const questionPressed = () => setModal(question);
          const selected = filters.findIndex(f => f === key) > -1;

          return (
            <View key={key} style={styles.choiceContainer}>
              <DefaultButton
                onPress={itemPressed}
                label={value}
                styleContainer={{
                  ...styles.buttonContainer,
                  ...(selected && {backgroundColor})
                }}
                styleText={{
                  ...styles.buttonText,
                  ...(selected && {fontWeight:'600',color})
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
    alignItems:'center',
    backgroundColor: '#F9F6F6'
  },
  buttonText: {
    fontSize: 13,
    padding:0,
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
