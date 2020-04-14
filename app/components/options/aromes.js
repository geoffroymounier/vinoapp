import React, {Component} from 'react';
import {FlatList,View,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Modal,ScrollView,Text,Dimensions} from 'react-native';
import Checkbox from '../markers/checkbox2.js';
import Button from '../markers/button.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../markers/icon.js';
import SearchBar from '../markers/searchbar.js';
import {json} from '../array/description'
import {bindActionCreators} from 'redux'
import {setWine,setSearch} from '../../redux/actions'
import {connect} from 'react-redux'
function mapStateToProps(state,props){
  let type = props.navigation.search == true ? 'search' : 'wine'
  let values = json[props.navigation.keyValue].values
  let aromesRaw = state[type].color ? values[state[type].color]
  : [...new Set([...values.red,...values.white,...values.rose])]
  let aromes = []

  aromesRaw.forEach((arome,index) => aromes.push({
      label : arome,
      key : index
    })
  )
  return{
    aromes:aromes,
    search : props.navigation.search == true,
    selected : state[type][props.navigation.keyValue] || [],
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({setWine,setSearch}, dispatch)
}
class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title);
  };

  render() {
    const textColor = this.props.selected ? 'black' : '#4c4c4c';
    return (
      <TouchableOpacity onPress={this._onPress} >
        <View style={{flexDirection:'row',alignItems:'center',borderColor:"lightgray",borderBottomWidth:1,paddingVertical:10}}>
           <Checkbox
             onPress={this._onPress}
            checked={this.props.selected}
          />
          <Text style={{color: textColor}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


class Aromes extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {search:'',selected: ''};
    this._onPressItem = this._onPressItem.bind(this)

    this.value = props.navigation.keyValue
  }


  _keyExtractor = (item, index) => item.key.toString();

  _onPressItem = (label: string) => {

    Keyboard.dismiss()
    if (label == '--- Tout Effacer ---') {
      this.props.search ? this.props.setSearch({[this.value]:[]}) : this.props.setWine({[this.value]:[]})
      return
    }
    let selected = [...this.props.selected]
    let index = selected.findIndex(array => array == label)
    index == -1  ? selected.splice(selected.length, 0,label) : selected.splice(index, 1 )

    this.props.search ? this.props.setSearch({[this.value]:selected}) : this.props.setWine({[this.value]:selected})
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.key}
      onPressItem={this._onPressItem}
      selected={this.props.selected.findIndex(array => array == item.label) > -1}
      title={item.label}
    />
  );

  render() {
    let data = [{label:'--- Tout Effacer ---',key:-1},...this.props.aromes.filter(r=>  r.label.toLowerCase().match((this.state.search ||'').toLowerCase()))]

    return (

      <View style={{flex:1,backgroundColor:'white',paddingTop:30,}}>
          <View
            style={{
              flexDirection:'row',
              alignItems: "center",
            }}>

            <SearchBar
              searchIcon ={false}
              onChangeText={(search)=>this.setState({search})}
              placeholder='Rechercher'
              underlineColorAndroid='transparent'
              autoCorrect = {false}
              lightTheme
              autoFocus
              value={this.state.search}
              inputContainerStyle={{backgroundColor:'transparent'}}
              containerStyle={{flex:1,backgroundColor:'transparent',borderBottomWidth:0,borderTopWidth:0}}

             />
          </View>
            <FlatList
              data={data}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            <Button
                style={{
                  color:'red',
                  margin:10,
                  marginHorizontal:20,
                  height:40,
                  backgroundColor: "#D72032", borderRadius: 20
                }}
                buttonStyle={{
                  fontSize:14,
                  color:'white',
                  backgroundColor:'transparent',
                  padding:0
                }}
              onPress={() => this.props.navigation.goBack()}
              content="Fermer"
            />
      </View>
    );
  }
}
export default connect(mapStateToProps,matchDispatchToProps)(Aromes)
