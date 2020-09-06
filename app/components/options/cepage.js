import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import Icon from 'components/thumbnails/icon';
import { useFocusEffect } from '@react-navigation/native';
import Separator from 'components/forms/separator';
import TextInput from 'components/forms/textInput';
import {sanitizeWine,getCepage} from 'functions/api';
import { useDispatch, useSelector } from 'react-redux'
import TouchableTextInput from 'components/forms/touchableTextInput'
import DefaultListItem from 'components/listItems/defaultListItem.js';

const filterArray = [
  {
    key: 'red',
    value: 'Red',
    backgroundColor: '#DC0101',
    color: 'white',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'white',
    value: 'White',
    backgroundColor: '#FFFB97',
    color: '#787882',
    question: 'CIYHHKJVBCKJHEF'
  },
  {
    key: 'rose',
    value: 'Rose',
    color: 'white',
    backgroundColor: '#FF8C85',
    question: 'CIYHHKJVBCKJHEF'
  }
]
const Cepage = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const storeValue = useSelector(({wine}) => ({
    country: wine.country,
    region: wine.region,
    appelation:wine.appelation, 
    cepage:wine.cepage, 
    typologie:wine.typologie, 
    color:wine.color
  })) 
  const [updatedData, setUpdatedData] = useState(storeValue)


  const {cepage = [], appelation, color, typologie} = updatedData
  const [data, setData] = useState([])
  const [colors, setColors] = useState([])
  const [modal, setModal] = useState(null)
  const toggleFilter = (key) => {
    const index = colors.findIndex(f => f === key)
    if (index > -1) setColors(colors.filter(f => f !== key))
    else setColors([...colors, key])
  }
  const _keyExtractor = (item) => item.key.toString();

  const onPressItem = ({label}) => {
    const index = cepage.findIndex(f => f === label)
    if (index > -1) setUpdatedData({...updatedData, cepage : cepage.filter(f => f !== label)})
    else setUpdatedData({...updatedData, cepage : [...cepage,label]})
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getCepage({ appelation, color,typologie })
      const data = response.map(r => ({ key: r.id, label: r.cepage}))
      setData(data)
    }
    getData()
  }, [appelation,color,typologie])

  const resetStoreValue = useCallback(() => {
    setUpdatedData({ ...storeValue })
  },
  [storeValue.appelation],
)

useFocusEffect(resetStoreValue)

  const savePress = () => {
    dispatch(sanitizeWine('cepage',{...storeValue,...updatedData}))
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
      selected={cepage.findIndex(g => g === item.label) > -1}
      title={item.label}
    />
  )};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 24
        }}>
        <Icon name={'grape_1'} width={64} height={64} />
      </View>
      <Text style={styles.label}>Manual Selection</Text>
      <TextInput
        styleContainer={{ marginVertical: 10 }}
        onChange={() => { }}
        icon='search'
        placeholder={'Search a grape'}
      />
      <Separator transparent />
      <Text style={styles.label}>Data-Driven Selection</Text>
      <View style={{flexDirection:'column',}}>
      <TouchableTextInput
        value={updatedData.region}
        icon={<Icon
          disabled
          height={20}
          width={20}
          name={updatedData.country}
        />}
        disabled
        placeholder={'Cepage'}
        onPress={() => {}}
      />
      
      <TouchableTextInput
        icon={<Icon
          height={22}
          width={22}
          name={'appellation_2'}
        />}
        value={updatedData.appelation}
        placeholder={'Appellation'}
        onPress={() => navigation.push('appelation', {
          previousScreen:'cepage',
        })}
      />
      </View>
      <Separator transparent />
      <Text style={styles.centeredText}>Wine Color</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>

        {filterArray.map(({ key, value, backgroundColor, color, question, underTitle }) => {
          const itemPressed = () => toggleFilter(key);
          const questionPressed = () => setModal(question);
          const selected = colors.findIndex(f => f === key) > -1;

          return (
            <View key={key} style={styles.choiceContainer}>
              <DefaultButton
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
      <Text style={styles.mainText}>Grape</Text>
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

export default Cepage;
