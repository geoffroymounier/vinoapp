import React , {useRef, useState} from 'react'
import {TextInput,StyleSheet,TouchableOpacity,View,Dimensions} from 'react-native';
import Icon from 'components/thumbnails/icon';
import Image from 'components/forms/image';
import {useDispatch,useSelector} from 'react-redux'
import {setSearch} from 'reduxStore/actions'
import PropTypes from 'prop-types'
const {width,height} = Dimensions.get('window')

const SearchInput = ({
    clearSearch,
    value,
    placeholder
  }) => {
  const dispatch = useDispatch()
  const initialText = useSelector(state => state.search.text)
  const [text,setText] = useState(initialText)
  const textInput = useRef()
  const onPress = () => textInput.current.focus()
  const onChange = (e) => setText(e)
  const onBlur = () => dispatch(setSearch({text}))
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection : 'row',
        alignItems:'center',
        height:28,
        marginTop:11,
        marginHorizontal:10,
        marginBottom:15,
        borderWidth: 0.4,
        borderColor: "#787882",
        borderRadius:15
      }}
      >
      <Icon
        height={20}
        width={20}
        styleContainer={{
          marginHorizontal:11
        }}
        name={'search'}
      />
      <TextInput
        ref={textInput}
        style={styles.title}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!value  &&
          <Image
            onPress={clearSearch}
            height={16}
            width={16}
            disabled={false}
            source={times}
          />
        }
    </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  title: {
    fontSize:15,
    color:"#787882",
    fontFamily:"ProximaNova-Regular"
  },
  categoryTitle: {
    fontWeight:"600",
    fontSize:17,
    color:"#3B3B3D",
    fontFamily:"ProximaNova-Regular"
  }
});
SearchInput.propTypes = {
  backgroundColor:PropTypes.string,
  activeBackgroundColor:PropTypes.string,
  textColor:PropTypes.string,
  activeTextColor:PropTypes.string,
  activeBorderColor:PropTypes.string,
  borderColor:PropTypes.string,
  value:PropTypes.string.isRequired,
  image:PropTypes.object,
  onPress:PropTypes.func,
  disabled:PropTypes.bool,
  active:PropTypes.bool.isRequired,
  styleContainer:PropTypes.obj,
  style:PropTypes.obj
}
SearchInput.defaultProps = {
  backgroundColor:'transparent',
  activeBackgroundColor:'blue',
  textColor:'#787882',
  image:null,
  activeTextColor:'red',
  activeBorderColor:'blue',
  borderColor:'none',
  disabled:true,
  onPress:()=>{},
  style:{},
  styleContainer:{}
}

export default SearchInput
