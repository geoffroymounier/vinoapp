import React , {useEffect,useState,useRef} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {View,Text,ActivityIndicator,Button,Dimensions} from 'react-native'
import styles from '../styles'
import { CommonActions, StackActions } from '@react-navigation/native';
import {getUser,fetchCredentials,fetchCellars,login} from '../functions/api'
import {useDispatch} from 'react-redux'
import io from 'socket.io-client';
import { Auth, Hub } from 'aws-amplify';
const { height, width } = Dimensions.get('window');

const AuthLoading = ({navigation,route}) => {
  const dispatch = useDispatch()
  const socket = useRef()
  const [loading,setLoading] = useState(true)
  const triggerGetUser = () => dispatch(getUser())
  const triggerFetchCellars = (data) => dispatch(fetchCellars(data))
  const fetchCred = () => {
    fetchCredentials()
    .then((socketIo)=>{
        socketIo.on('cellarChanged',(data)=> triggerFetchCellars(data))
        setSocket()
    })
    .catch((e)=>console.log({e}))
  }
  const checkIfAuthenticated = async () => {
    let currentSession = null;
    try {
      currentSession = await Auth.currentSession();
    } catch(err) {
      console.log(err);
    }
    setTimeout(()=>{
    const ftu = false
    // navigation.replace('login_views',{screen:'stack_wine'})
    if (ftu) {
      navigation.push('ftu_open')
    } else {
      console.log("move to 'stack wine'")
      navigation.replace(currentSession ? 'stack_wine' : 'login_views');
    }
    },1000)
  };
  useEffect(() => {
    checkIfAuthenticated();
    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'stack_wine'}]
            })
          );
          fetchCred()
          break;
        case 'signOut':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'login_views'}]
            })
          );
          break;
        default:
          break;
      }
    });
  },[])
    return (
      <View style={{flex:1}}>
        <LinearGradient
          style={{position:'absolute',
            transform: [
              { translateX: - width * 1.5 },
              // {rotateY : "25deg"},
              {skewX : "-70deg"}
            ],
            width:2*width,height:400,paddingHorizontal:25,paddingBottom:20}}
          start={{x:1, y: 0}}
          end={{x: 0, y: 0.5}} colors={[ '#E02535','#9F041B']}
        />
          <View style={styles.container}>
            <ActivityIndicator  />
          </View>
      </View>
    );

}
export default AuthLoading;
