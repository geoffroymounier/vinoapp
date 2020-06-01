import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView,StyleSheet} from 'react-native';
import FilterLabels from 'components/thumbnails/filterLabels';
import Icon from 'components/thumbnails/icon';
import ActiveComponent from 'components/forms/image'
import Occasions from './occasions'
const otherFilters = [
  {
    key : 'occasion',
    title : 'Occasion',
    icon:'occasion',
    activeComponent : Occasions
  },
  {
    key : 'pairing',
    title : 'Pairing',
    icon:'pairing',
    activeComponent : ActiveComponent
  },
  {
    key : 'region',
    title : 'Country & Region',
    icon:'region',
    activeComponent : ActiveComponent
  },
  {
    key : 'grape',
    title : 'Grape',
    icon:'grape',
    activeComponent : ActiveComponent
  },
  {
    key : 'maturity',
    title : 'Maturity',
    icon:'maturity',
    activeComponent : ActiveComponent
  },
  {
    key : 'vintage',
    title : 'Vintage',
    icon:'vintage',
    activeComponent : ActiveComponent
  },
  {
    key : 'winemaker',
    title : 'Wine Maker',
    icon:'winemaker',
    activeComponent : ActiveComponent
  }

]

const Filters = () => {
  const Component = otherFilters[0].activeComponent
  return (
    <>
    <ScrollView horizontal style={{marginTop:8}}>
      {(otherFilters).map((e,i) => (
        <FilterLabels
          key={e.key}
          image={<Icon name={e.icon} width={35} height={25}/>}
          value={e.title}
          disabled={false}
          active={i===0}
          backgroundColor={'transparent'}
          borderColor={'transparent'}
          activeBorderColor={'#3B3B3D'}
          style={{...styles.title,fontSize:12,paddingHorizontal:0,textAlign:'center'}}
          styleContainer={{width:65,flexDirection:'column'}}
        />
      )
    )}
    </ScrollView>
    <Component />
    </>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize:15,
    color:"#787882",
    fontFamily:"ProximaNova-Regular"
  }
});

export default Filters
