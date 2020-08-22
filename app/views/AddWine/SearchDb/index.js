import React, { useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, FlatList, Dimensions, StyleSheet, Text, View } from 'react-native';
import DefaultButton from 'components/buttons/defaultButton';
import TextInput from 'components/forms/textInput';
import DefaultListItem from 'components/listItems/defaultListItem';
import Separator from 'components/forms/separator';
import { textSearch } from 'functions/api';
import {useSelector,useDispatch} from 'react-redux';
import {setWine,resetWine} from 'reduxStore/actions';
const { width } = Dimensions.get('window');

const SearchDb = ({ navigation }) => {
  const dispatch = useDispatch()
  const triggerSetWine = (e) => dispatch(setWine(e))


  const [data, setData] = useState([])
  const keyExtractor = (item) => item._id
  const onPressItem = (wineId) => {
    console.log({wineId})
    Keyboard.dismiss()
    // let newWine = {
    //   appelation: (id == -1) ? null : this.props.appelations[id].appelation
    // }
    // if (id != -1) {
    //   newWine.region = this.props.appelations[id].region
    //   newWine.country = this.props.appelations[id].country_code
    // }
    const wine = data.find(w => w._id === wineId)
    resetWine();
    triggerSetWine(wine);
    navigation.push('edit_wine', {
      color: wine.color,
    });

    // this.props.search ? this.props.setSearch(newWine) : this.props.setWine(newWine)
  };
  const renderItem = ({ item }) => (
    <DefaultListItem
      id={item._id}
      onPressItem={onPressItem}
      title={`${item.appelation}`}
      styleContainer={{ backgroundColor: "white" }}
    />
  );

  const searchValueChanged = async (e) => {
    if (e.length < 2) return
    try {
      const regexp = new RegExp(e, 'gi')
      const results = await textSearch({ search: e })
      setData(results.filter(r => regexp.test(r.text)).sort())
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
            <DefaultButton
              // onPress={buttonPressed}
              label={'Red'}
              styleContainer={{
                marginVertical: 0,
                borderRadius: 14,
                borderColor: '#787882',
                borderWidth: 0.4,
                padding: 0,
                height: 'auto',
                flex: 0.3,
                backgroundColor: '#F9F6F6'
              }}
              styleText={{
                paddingHorizontal: 7,
                paddingVertical: 7,
                fontSize: 13,
                fontWeight: 'normal',
                color: '#787882',
                fontFamily: 'ProximaNova-regular'
              }}
            />
            <DefaultButton
              // onPress={buttonPressed}
              label={'White'}
              styleContainer={{
                marginVertical: 0,
                borderRadius: 14,
                borderColor: '#787882',
                borderWidth: 0.4,
                padding: 0,
                height: 'auto',
                flex: 0.3,
                backgroundColor: '#F9F6F6'
              }}
              styleText={{
                paddingHorizontal: 7,
                paddingVertical: 7,
                fontSize: 13,
                fontWeight: 'normal',
                color: '#787882',
                fontFamily: 'ProximaNova-regular'
              }}
            />
          </View>
          <Separator length={'50%'} />
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 10
          }}>
            {['France', 'Italy', 'Portugal', 'Spain', 'Germany', 'New World'].map((e) => (
              <DefaultButton
                key={e}
                // onPress={buttonPressed}
                label={e}
                icon={'france'}
                styleContainer={{
                  marginVertical: 0,
                  borderRadius: 14,
                  borderColor: '#787882',
                  borderWidth: 0.4,
                  padding: 0,
                  height: 'auto',
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
                  fontSize: 11,
                  color: '#787882',
                  fontWeight: "normal",
                  fontFamily: 'ProximaNova-regular'
                }}
              />
            ))}
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
