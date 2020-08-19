import React from 'react';
import { Keyboard, SafeAreaView, Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

const AddCellar = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: `rgba(178, 178, 184, 0.81)` }}>
      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, width, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', flex: 0.75, paddingVertical: 30 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

              <TouchableOpacity onPress={() => navigation.push('choose_add_wine_method')}>
                <View style={styles.buttonContainer} />
                <Text style={styles.text}>{"New wine"}</Text>
              </TouchableOpacity>

            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity>
                <View style={styles.buttonContainer} />
                <Text style={styles.text}>{"Create a new list"}</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.buttonContainer} />
                <Text style={styles.text}>{"New wine cellar"}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity>
                <View style={styles.buttonContainer} />
                <Text style={styles.text}>{"Create a tasting note"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>



  );

}


const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    alignSelf: 'flex-start',
    textAlign: 'left',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'ProximaNova-Regular',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    marginVertical: 7,

    color: '#FFFFFF'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

});

export default AddCellar
