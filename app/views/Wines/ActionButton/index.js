import React from 'react';
import ActionButton from 'react-native-action-button';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'components/markers/icon.js';
const bottle = require('assets/bottle.png');
const menu = require('assets/menu.png');


const ActionButtonNav = ({navigation}) => {
  return (
      <ActionButton buttonColor="rgba(231,76,60,1)"
        renderIcon={(active)=>{
          if (active) return (<Image
            style={{
              resizeMode: 'contain',
              height:16,
            }}
           source={menu}
         />)
         return (<Image
           style={{
             resizeMode: 'contain',
             height:16,
           }}
          source={bottle}
         />)
        }}
        >
        <ActionButton.Item buttonColor='#9b59b6' title="Ajouter un vin" onPress={() => navigation.push('add_wine')}>
          <Image
            style={{
              resizeMode: 'contain',
              height:16,
            }}
           source={bottle}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#9b59b6' title="Ajouter un vin" onPress={() => navigation.push('edit_cellar')}>
          <Image
            style={{
              resizeMode: 'contain',
              height:16,
            }}
           source={bottle}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Deplacer des vins" onPress={() => {

          navigation.setParams({activeSelection:true,method:'move'})
          console.log('params updaed')
        }}>
          <Image
            style={{
              resizeMode: 'contain',
              height:16,
            }}
           source={bottle}
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Supprimer des vins" onPress={() => navigation.setParams({activeSelection:true,method:'delete'})}>
          <Image
            style={{
              resizeMode: 'contain',
              height:16,
            }}
           source={bottle}
          />
        </ActionButton.Item>
      </ActionButton>

);
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ActionButtonNav;
