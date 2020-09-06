import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { sanitizeWine, getColors } from 'functions/api'
import { useDispatch, useSelector } from 'react-redux'
import { colors, typeOfWine } from 'components/array/description'
import Icon from 'components/thumbnails/icon';
import Separator from 'components/forms/separator';
const { width, height } = Dimensions.get('window')

const Color = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const storeValue = useSelector((state) => ({
      color : state.wine.color,
      typologie: state.wine.typologie,
      region: state.wine.region,
      country: state.wine.country,
      appelation: state.wine.appelation,
    }))

    const [updatedData, setUpdatedData] = useState({ ...storeValue })
  
    useEffect(() => {
        const getData = async () => {
          const response = await getColors({ appelation : updatedData.appelation })
          const data = response.map(r => ({ key: r.id, color: r.color, typologie: r.typologie }))
          setData(data)
        }
        getData()
      }, [])
    const savePress = () => {
        dispatch(sanitizeWine('color',{...storeValue,...updatedData}))
        navigation.navigate(route.params.previousScreen || 'edit_wine_default', {wine : updatedData})
    }

    React.useLayoutEffect(() => {
        navigation.setParams({ savePress });
    }, [navigation, updatedData]);
    // trim the data array regarding the switch tab updatedData



    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10, }}>
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 24
                }}>
                <Icon name={'wineglass_2'} width={64} height={64} />
            </View>
            <Separator transparent />
            <Text style={styles.mainText}>Type</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                {Object.keys(typeOfWine).map(e => {
                    const { icon, label } = typeOfWine[e]
                    const isActive = updatedData.typologie === e
                    const isDisabled= data.findIndex(d => (!updatedData.color || d.color === updatedData.color) && d.typologie === e) === -1
                    const onPress = () => setUpdatedData({...updatedData, typologie: e })
                    return (
                        <TouchableOpacity
                            key={e}
                            onPress={onPress}
                            disabled={isDisabled}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal:15,
                                ...(isDisabled && {opacity : 0.5})
                            }} >
                            
                            <View style={{
                                height: 30,
                                width: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {isActive && <Icon styleContainer={{ zIndex: 2, position: 'absolute', right: -5, top: -5 }} name={'checked'} width={14} height={14} />}
                                <Icon name={icon} styleContainer={{tintColor:'lightgray'}} width={30} />
                            </View>
                            <Text style={{ ...styles.textCountry, ...(isActive && styles.textCountrySelected),marginHorizontal:13 }}>{label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <Separator transparent />
            <Text style={styles.mainText}>Color</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                {Object.keys(colors).map(e => {
                    const { label, color } = colors[e]
                    const isDisabled= data.findIndex(d => (!updatedData.typologie || d.typologie === updatedData.typologie) && d.color === e) === -1
                    const isActive = updatedData.color === e
                    const onPress = () => setUpdatedData({ ...updatedData,color: e })
                    return (
                        <TouchableOpacity
                            key={e}
                            disabled={isDisabled}
                            onPress={onPress}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }} >
                            {isActive && <Icon styleContainer={{ zIndex: 2, position: 'absolute', right: -5, top: 0 }} name={'checked'} width={14} height={14} />}
                            <View style={{
                                height: 45,
                                width: 45,
                                borderRadius:45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isDisabled ? 'lightgrey' : color
                            }} />

                            <View style={{
                                    marginVertical: 5,
                                    paddingVertical: 5,
                                    justifyContent:'center'}}>
                            <Text style={{ ...styles.textCountry, ...(isActive && styles.textCountrySelected)}}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

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
export default Color;
