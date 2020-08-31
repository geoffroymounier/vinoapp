import React, { useEffect, useMemo, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { Button, Platform, Alert, StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, Picker, TouchableOpacity, Dimensions } from 'react-native';
import ImageComponent from 'components/forms/image'
import ModalSingleChoice from '../components/modals/modalSingleChoice.js'
import ModalPhotoChoice from '../components/modals/modalPhotoChoice.js'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'components/thumbnails/icon';
import Header from 'components/thumbnails/header';
import ManagePhoto from '../components/modals/managePhoto'
import TouchableTextInput from '../components/forms/touchableTextInput'
import TextInput from '../components/forms/textInput'
import SliderInput from '../components/forms/sliderInput'
import TouchableTitleText from '../components/forms/touchableTitleText'
import DropDownTextInput from '../components/forms/dropdownTextInput'
const arrowRight = require('../assets/arrow-right.png')
const heartEmpty = require('../assets/heart-empty.png')
const heartFull = require('../assets/heart-full.png')
const countries = require('../assets/countries/index.js').default
import { images, editFile } from 'styles'
import { country_code, getCountryCode } from '../components/array/country_code'
import { carafageArray, temperatureArray, makeTypologieArray, makePriceArray, makeRegionArray, makeStockArray, terrainArray, makeYearArray, lastYearArray, apogeeArray } from '../components/array/pickers'
import { caracteristiques, colors, cepageValues, accordsValues, dialog, json, pastillesValues } from '../components/array/description'
import { useDispatch, useSelector } from 'react-redux'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from '../components/markers/customMarker'
import Occasions from './EditWine/Occasions'
import MomentPastille from 'components/thumbnails/moment';
import { setWine } from 'reduxStore/actions'
import { saveWine } from '../functions/api'
import testLabel from 'assets/test-label.png'
const EditWine = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [modalColor, setModalColor] = useState('')
  const [choices, setChoices] = useState([])
  const [modalPastille, setModalPastille] = useState('')
  const wine = {...route.params.wine,...route.params.updatedData}
  console.log({wine,...route.params.updatedData})
  const cellarId = useSelector(state => state.cellar._id)
  const triggerSaveWine = (wine) => dispatch(saveWine(wine))
  const triggerSetWine = (wine) => dispatch(setWine(wine))
  const initialWine = useRef(JSON.stringify(wine))
  const domainRef = useRef()
  const typologieRef = useRef()
  const carafageRef = useRef()
  const temperatureRef = useRef()
  const priceRef = useRef()
  const stocksRef = useRef()
  const commentaireRef = useRef()
  const checkLeave = () => {
    triggerSaveWine({ ...wine, cellarId }, wine._id)
    navigation.goBack()
  }
  useMemo(() => {
    const { params } = route
    navigation.setOptions({
      headerBackground: () => (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
          end={{ x: 1, y: 0 }} colors={
            (colors[params.color] || {}).color == '#FFC401' ? ['#FAFFC3', '#FFD49A']
              : (colors[params.color] || {}).color == '#F89BA4' ? ['#FF949E', '#FF5C75']
                : ['#9F041B', '#E02535']}
        />
      ),
      headerTintColor: () => {
        if ((colors[params.color] || {}).color == '#FFC401') return '#939393'
        return 'white'
      },
      headerRight: () => {
        if (initialWine !== JSON.stringify(wine)) return (
          <Button
            color={(colors[params.color] || {}).color == '#FFC401' ? '#939393' : 'white'}
            onPress={checkLeave}
            title={"Enregistrer"}
          />
        )
      }
    })
  }, [JSON.stringify(wine)])
  const {
    favorite = false,
    cepage = [],
    pastilles = [],
    sucre,
    acide,
    tanin,
    corps,
    longueur,
    country,
    region,
    appelation,
    annee,
    before,
    apogee, typologie, temperature, cuisine_monde, price , vendor, terrain, stock, nez, legumes, viandes, poissons, desserts, aperitif, fromages, bouche, color, domain, carafage, commentaire, photo } = wine
  const backgroundTextColor = (colors[color] || {}).color == '#FFC401' ? '#939393' : 'white'
  const backgroundColor = (colors[color] || {}).color || '#e6e6e6'
  const {value : priceValue = '', unit:priceUnit = ''} = price || {}

  return (
    <KeyboardAvoidingView behavior='position' keyboardShouldPersistTaps="always" >
      {!!modalColor &&
        <ModalSingleChoice
          array={colors}
          data={color}
          close={(object) => {
            setModalColor('')
            triggerSetWine({ color: object })
            navigation.setParams({ color: object })
          }}
        />
      }
      {!!choices.length &&
        <ModalPhotoChoice
          array={choices}
          data={null}
          close={(id) => {
            const choice = choices[id]
            if (id) {
              triggerSetWine({ color: choice.color, appelation: choice.appelation, region: choice.region, country: choice.country })
              navigation.setParams({ color: choice.color })
            }
            setChoices([])
          }} />
      }
      <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={{ padding: 0, backgroundColor: 'white' }}>
        <View style={{ margin: 5, borderRadius: 5, backgroundColor: '#F9F6F6', borderColor: '#787882', borderWidth: 1, justifyContent: 'center' }}>
          <TextInput
            value={domain}
            placeholder={"Domaine"}
            onChange={(domain) => triggerSetWine({ domain })}
            styleText={{ ...styles.domain, color: 'blue' }}
            styleContainer={{ borderWidth: 0 }}
          />
          <TextInput
            value={domain}
            placeholder={"Cuvée"}
            styleText={styles.domain2}
            onChange={(domain) => triggerSetWine({ domain })}
            styleContainer={{ borderWidth: 0 }}
          />
        </View>
        <View style={{ ...styles.container, justifyContent: 'flex-start', backgroundColor: "white", marginBottom: 50 }}>
          <View style={{ ...styles.container, flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 3 }}>
              <ManagePhoto
                foundWine={(json) => {
                  if (json.proposition.length == 1) {
                    let choice = json.proposition[0]
                    Alert.alert("Recherche fructueuse !", `Nous avons trouvé un vin dans notre base ! : \n ${choice.appelation} (${colors[choice.color].label}) \n ${choice.region}`,
                      [
                        // {text: 'OK', onPress: () => this.setState({wine:{...this.state.wine,annee:json.annee || void 0,color:choice.color,appelation:choice.appelation,region:choice.region,country:choice.country}})},
                        { text: 'Annuler', onPress: () => void 0 }
                      ])
                  } else {
                    Alert.alert("Recherche fructueuse !", 'Nous avons trouvé plusieurs vins dans notre base !',
                      [
                        // {text: 'Choisir', onPress: () => this.setState({choices : json.proposition,wine:{...this.state.wine,annee:json.annee || void 0}})},
                        { text: 'Annuler', onPress: () => void 0 }
                      ])
                  }
                }}
                // appelations = {this.appelations}
                addPicture={(photo) => triggerSetWine({ photo })}
                photo={testLabel} />
            </View>
            <View style={{ flex: 4, paddingLeft: 10 }}>
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={color ? `${typologie}_${color}` : 'still_grey'}
                />}
                value={color ? `${color}, ${typologie || ''}` : ''}
                placeholder={'Color & Type'}
                onPress={() => navigation.push('color',{
                  color : wine.color,
                  typologie: wine.typologie
                })}
              />
              <TouchableTextInput
                value={wine.region_FR}
                icon={<Icon
                  disabled
                  height={20}
                  width={20}
                  name={wine.country_id}
                />}
                placeholder={'Region'}
                onPress={() => navigation.push('region',{
                  country_id:wine.country_id,
                  region_id : wine.region_id,
                  region_name: wine.region_FR
                })}
              />
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={'vintage_1'}
                />}
                value={annee}
                placeholder={'Vintage'}
                onPress={() => setModalColor('modalColor')}
              />
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={'price_1'}
                />}
                value={priceValue ? `${priceValue} ${priceUnit}` : ''}
                placeholder={'Price'}
                onPress={() => navigation.push('price',{
                  price:wine.price || { unit: 'EUR', value: '', symbol: '€' },
                })}
              />
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={'bottleNumber'}
                />}
                value={stock}
                placeholder={'Quantity'}
                onPress={() => navigation.push('quantity')}
              />
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={'volume_1'}
                />}
                value={stock}
                placeholder={'Volume'}
                onPress={() => setModalColor('modalColor')}
              />
              <TouchableTextInput
                icon={<Icon
                  height={22}
                  width={22}
                  name={'best_moment_3'}
                />}
                value={stock}
                placeholder={'Drink time'}
                onPress={() => setModalColor('modalColor')}
              />
              {/* <DropDownTextInput
                label={'Typologie'}
                value={typologie}
                items={makeTypologieArray()}
                placeholder={''}
                onChange={(typologie) => triggerSetWine({ typologie })}
              />
              <TouchableTextInput
                label={"Jusqu'a"}
                value={before}
                placeholder={''}
                onPress={() => navigation.navigate('annee', { keyValue: 'before' })}
              />
              <DropDownTextInput
                label={'Carafage'}
                value={carafage}
                items={carafageArray()}
                placeholder={'Non Précisé'}
                onChange={(carafage) => triggerSetWine({ carafage })}
              />
              <DropDownTextInput
                label={'Temperature de service'}
                value={temperature}
                items={temperatureArray()}
                placeholder={'Non Précisé'}
                onChange={(temperature) => triggerSetWine({ temperature })}
              /> */}
            </View>
          </View>
          <View style={{ ...styles.container, paddingHorizontal: 0, flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ ...styles.container }}>
              <Header
                styleContainer={{
                  backgroundColor: 'transparent',
                  marginTop: 10
                }}
                styleHeaderTitle={{
                  marginLeft: 10,
                  textAlign: 'left',
                  color: '#3B3B3D'
                }} showHide text={'Occasions'}>
                <Occasions
                  occasions={pastilles}
                  toggleItem={() => { }}
                />
              </Header>
              <Header showHide text={'Comments'}>
                <TextInput
                  onChange={() => { }}
                  placeholder={'...'}
                  numberOfLines={4}
                  styleContainer={{ marginHorizontal: -1, borderRadius: 0 }}
                  icon={'modify_2'}
                />
              </Header>
              <Header showHide text={'Wine Details'} >
                <View style={{ ...styles.container, ...styles.sectionContainer }}>
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'appellation_2'}
                    />}
                    value={wine.appelation_name}
                    placeholder={'Appellation'}
                    onPress={() => navigation.push('appelation',{
                      region_FR:wine.region_FR,
                      region_id:wine.region_id,
                      country_id:wine.country_id,
                      appelation_id:wine.appelation_id,
                      appelation_name:wine.appelation_name,
                    })}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'grape_1'}
                    />}
                    value={((wine.grape||[]).map(({cepage_name}) => cepage_name)||[]).join(', ')}
                    placeholder={'Grape Variety'}
                    onPress={() => navigation.push('cepage',{
                      grape:wine.grape,
                      region_FR:wine.region_FR,
                      country_id:wine.country_id,
                      appelation_id:wine.appelation_id,
                      appelation_name:wine.appelation_name,
                    })}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'winemaker_1'}
                    />}
                    value={stock}
                    placeholder={'Wine Maker'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'label_3'}
                    />}
                    value={stock}
                    placeholder={'Label'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'ranking_2'}
                    />}
                    value={stock}
                    placeholder={'Rank & Distinction'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'alcohol_3'}
                    />}
                    value={stock}
                    placeholder={'Alcohol degree'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'ageing_2'}
                    />}
                    value={stock}
                    placeholder={'Oak Ageing'}
                    onPress={() => setModalColor('modalColor')}
                  />
                </View>
              </Header>
              <Header showHide text={'Service recommendations'} >
                <View style={{ ...styles.container, ...styles.sectionContainer }}>
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'decanting_1'}
                    />}
                    value={stock}
                    placeholder={'Decanting'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'thermo_4'}
                    />}
                    value={stock}
                    placeholder={'Service Temperature'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'keep_4'}
                    />}
                    value={stock}
                    placeholder={'Keep until / Drink Between'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'food_1'}
                    />}
                    value={stock}
                    placeholder={'Food Pairing'}
                    onPress={() => setModalColor('modalColor')}
                  />
                </View>
              </Header>
              <Header showHide text={'About the acquisition'}>
                <View style={{ ...styles.container, ...styles.sectionContainer }}>
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'date_1'}
                    />}
                    value={stock}
                    placeholder={'Date of acquisition'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'basket_1'}
                    />}
                    value={stock}
                    placeholder={'Type of acquisition'}
                    onPress={() => setModalColor('modalColor')}
                  />
                  <TouchableTextInput
                    icon={<Icon
                      height={22}
                      width={22}
                      name={'supplier_1'}
                    />}
                    value={stock}
                    placeholder={'Supplier'}
                    onPress={() => setModalColor('modalColor')}
                  />
                </View>
              </Header>
              {/* {Object.keys(accordsValues).map((accords, i) => {
                const { icon, label } = accordsValues[accords]
                return (
                  <TouchableTitleText
                    icon={icon}
                    key={i.toString()}
                    styleIcon={{ tintColor: backgroundColor }}
                    label={label}
                    value={wine[accords]}
                    placeholder={""}
                    onPress={() => navigation.navigate('cepage')}
                  />
                )
              })}
              <View style={{ ...styles.container, marginVertical: 20 }}>
                <Text style={{ ...styles.title, fontSize: 26, color: "#6D6D6D" }}>{'Dégustation'}</Text>
              </View>
              {Object.keys(json).map((caracts, i) => {
                let { icon, label } = json[caracts]
                return (
                  <TouchableTitleText
                    icon={icon}
                    key={i.toString()}
                    styleIcon={{ tintColor: backgroundColor }}
                    label={label}
                    value={wine[caracts]}
                    placeholder={""}
                    onPress={() => navigation.navigate('aromes', { keyValue: caracts })}
                  />
                )
              }
              )}
              <TouchableOpacity style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, backgroundColor: 'white' }}>
                <Text style={styles.label}>Sucrosité</Text>
                <MultiSlider
                  min={0}
                  snapped
                  sliderLength={250}
                  containerStyle={{ marginLeft: 10, alignItems: 'center' }}
                  selectedStyle={{ backgroundColor: (colors[color] || {}).color || '#e6e6e6' }}
                  trackStyle={{ backgroundColor: '#e6e6e6' }}
                  values={[sucre || 0]}
                  enabledOne={true}
                  isMarkersSeparated={true}
                  max={8}
                  onValuesChangeFinish={(e) => triggerSetWine({ sucre: e[0] })}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, backgroundColor: 'white' }}>
                <Text style={styles.label}>Acidité</Text>
                <MultiSlider
                  min={0}
                  snapped
                  sliderLength={250}
                  containerStyle={{ marginLeft: 10, alignItems: 'center' }}
                  selectedStyle={{ backgroundColor: (colors[color] || {}).color || '#e6e6e6' }}
                  trackStyle={{ backgroundColor: '#e6e6e6' }}
                  values={[acide || 0]}
                  enabledOne={true}
                  isMarkersSeparated={true}
                  max={8}
                  onValuesChangeFinish={(e) => triggerSetWine({ acide: e[0] })}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, backgroundColor: 'white' }}>
                <Text style={styles.label}>Tanins</Text>
                <MultiSlider
                  min={0}
                  snapped
                  sliderLength={250}
                  containerStyle={{ marginLeft: 10, alignItems: 'center' }}
                  selectedStyle={{ backgroundColor: (colors[color] || {}).color || '#e6e6e6' }}
                  trackStyle={{ backgroundColor: '#e6e6e6' }}
                  values={[tanin || 0]}
                  enabledOne={true}
                  isMarkersSeparated={true}
                  max={6}
                  onValuesChangeFinish={(e) => triggerSetWine({ tanin: e[0] })}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, backgroundColor: 'white' }}>
                <Text style={styles.label}>Corps</Text>
                <MultiSlider
                  min={0}
                  snapped
                  sliderLength={250}
                  containerStyle={{ marginLeft: 10, alignItems: 'center' }}
                  selectedStyle={{ backgroundColor: (colors[color] || {}).color || '#e6e6e6' }}
                  trackStyle={{ backgroundColor: '#e6e6e6' }}
                  values={[corps || 0]}
                  enabledOne={true}
                  isMarkersSeparated={true}
                  max={6}
                  onValuesChangeFinish={(e) => triggerSetWine({ corps: e[0] })}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, backgroundColor: 'white' }}>
                <Text style={styles.label}>Longueur</Text>
                <MultiSlider
                  min={0}
                  snapped
                  sliderLength={250}
                  containerStyle={{ marginLeft: 10, alignItems: 'center' }}
                  selectedStyle={{ backgroundColor: (colors[color] || {}).color || '#e6e6e6' }}
                  trackStyle={{ backgroundColor: '#e6e6e6' }}
                  values={[longueur || 0]}
                  enabledOne={true}
                  isMarkersSeparated={true}
                  max={8}
                  onValuesChangeFinish={(e) => triggerSetWine({ longueur: e[0] })}
                />
              </TouchableOpacity>
              <View style={{ ...styles.container, marginVertical: 20 }}>
                <Text style={{ ...styles.title, fontSize: 26, color: "#6D6D6D" }}>{'Commentaires'}</Text>
              </View>
              <TouchableOpacity
                onPress={() => commentaireRef.focus()}
                style={{ ...styles.TouchableOpacity, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 10, marginVertical: 5, backgroundColor: 'white' }}>
                {/* <TextInput
                ref={commentaireRef}
                style={{flex:1,padding:10,marginBottom:30}}
                multiline
                value={commentaire}
                placeholder='Insérez vos notes'
                onChangeText={(commentaire)=>triggerSetWine({commentaire})}/> */}
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}
const pickerStyle = {
  viewContainer: { alignSelf: 'center', paddingHorizontal: 0 }
}
const styles = StyleSheet.create({
  TouchableOpacity: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', alignItems: 'center',
    padding: 6,
    marginVertical: 5, backgroundColor: 'white'
  },
  sectionContainer: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  domain: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold'
  },
  domain2: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular'
  },
  title: {
    fontSize: 13,
    alignSelf: 'flex-start',
    textAlign: 'left',
    margin: 5
  }
});
export default EditWine
