import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView,StyleSheet} from 'react-native';
import FilterLabels from 'components/thumbnails/filterLabels';
import Icon from 'components/thumbnails/icon';
import Pairing from './pairing'
import Region from './region'
import Occasions from './occasions'
import Grape from './grape'
import Maturity from './maturity'
import ActiveComponent from './occasions'

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
    activeComponent : Pairing
  },
  {
    key : 'region',
    title : 'Country & Region',
    icon:'region',
    activeComponent : Region
  },
  {
    key : 'grape',
    title : 'Grape',
    icon:'grape',
    activeComponent : Grape
  },
  {
    key : 'maturity',
    title : 'Maturity',
    icon:'maturity',
    activeComponent : Maturity
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

const Filters = ({open,onTouch}) => {
  const Component = open > -1 ? otherFilters[open].activeComponent : null

  return (
    <>
    <ScrollView horizontal style={{marginTop:8}}>
      {(otherFilters).map((e,i) => (
        <FilterLabels
          key={e.key}
          image={<Icon name={e.icon} width={35} height={25}/>}
          value={e.title}
          disabled={false}
          active={i===open}
          backgroundColor={'transparent'}
          borderColor={'transparent'}
          activeBorderColor={'#3B3B3D'}
          onPress={() => i === open ? onTouch(-1) : onTouch(i)}
          style={{...styles.title,fontSize:12,paddingHorizontal:0,textAlign:'center'}}
          styleContainer={{width:65,flexDirection:'column'}}
        />
      )
    )}
    </ScrollView>
    {open > -1 && <Component />}
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
