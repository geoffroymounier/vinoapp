import React from 'react'
import {TouchableOpacity, Image,TextInput,View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
const search = require('../../assets/search.png')
const times = require('../../assets/times.png')
const filter = require('../../assets/filter.png')
export default class SearchBar extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

    return (
      <View style={{width:"100%"}}>
      <TouchableOpacity
        ref={t => this.touchableOpacity = t}
        onPress={()=>{
          this.textinput.focus()
          this.props.onPress()
        }}
        style={{
          flexDirection : 'row',
          paddingVertical:20,
          paddingHorizontal:10,
          backgroundColor:'white',
          shadowBottomColor: "black",
          shadowOpacity: 0.6,
          shadowRadius: 2,
          shadowOffset: {
            height: 0,
            width:0,
          }
        }}
      >
        <TextInput
          ref={t => this.textinput = t}
          // editable={false}
          onFocus={()=>{this.props.onPress()}}
          onSubmitEditing = {() => this.props.onSubmitEditing ? this.props.onSubmitEditing() : void 0}
          onChangeText={(search)=>this.props.onChangeText(search)}
          placeholder='Rechercher'
          underlineColorAndroid='transparent'
          autoCorrect = {false}
          value={this.props.value}
          style={{paddingHorizontal:10,fontSize:18,flex:1,fontFamily:"ProximaNova-Regular"}}
          />
        {(this.props.value|| '').length > 0 ?
          <TouchableOpacity
            onPress={()=>{
              this.props.onChangeText('')
              this.props.onClear ? this.props.onClear() : void 0
            }}
            style={{
              height:24,
              justifyContent:'center'
          }}>
            <Image

              style={{
                resizeMode: 'contain',
                height:16,
              }}
             source={times}
            />
          </TouchableOpacity>
        : void 0}
        {this.props.filterResults ?
          <TouchableOpacity
            onPress={()=>{
              this.props.toggleSorting()
            }}
            style={{
              height:24,
              paddingRight:5,
              justifyContent:'center'
          }}>
            <Image

              style={{
                resizeMode: 'contain',
                height:20,
              }}
             source={search}
            />
          </TouchableOpacity>
        : void 0}


      </TouchableOpacity>
      </View>
    );
  }
}
