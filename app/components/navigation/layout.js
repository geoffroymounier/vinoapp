import React from 'react'
import {View,StyleSheet,SafeAreaView} from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = ({children}) => {
  return (
    <SafeAreaView style={{
      backgroundColor: '#9F041B',
      position:'relative',
    }}>
      {children}
    </SafeAreaView>
  )
}

export default Layout
