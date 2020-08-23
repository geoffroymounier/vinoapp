import React from 'react'
import Image  from 'components/forms/image'
import times  from 'assets/times.png'
import DefaultButton  from 'components/buttons/defaultButton'
import {View,ScrollView,TouchableOpacity, Text,Button,Modal } from 'react-native'
// import {DrawerItems, SafeAreaView, NavigationContainer , createAppContainer , createSwitchNavigator, createBottomTabNavigator}
import {NavigationContainer} from '@react-navigation/native'
import WineListSelect from 'components/navigation/wineListSelect'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../views/login'
import SignIn from '../views/signin'
import SignUp from '../views/signup'
import ResetPass from '../views/resetPass'
import AuthLoading from '../views/authLoading'
import LinearGradient from 'react-native-linear-gradient';
import DrawerContentComponents from '../components/navigation/drawer'
// import Filter from '../views/filter'
import Cellars from '../views/cellars'
import Results from '../views/results'


import Step_1_Open from '../views/FirstTimeOpen/Slide-1'
import Step_2_Open from '../views/FirstTimeOpen/Slide-2'
import Step_3_Open from '../views/FirstTimeOpen/Slide-3'

import Home from '../views/Home'
import Wines from '../views/Wines'
import EditWine from '../views/editWine'
import FicheWine from '../views/ficheWine'
import EditCellar from '../views/editCellar'
import AddCellar from '../views/AddCellar'
import AddWine from '../views/AddWine'
import ChooseMethodAddWine from '../views/AddWine/ChooseMethod'
import AddWineModal from '../views/AddWine/AddWineModal'
import ScanLabelAddWine from '../views/AddWine/ScanLabel'
import SearchDbAddWine from '../views/AddWine/SearchDb'


import Region from '../components/options/region'
import Country from '../components/options/country'
import Appelation from '../components/options/appelation'
import Cepage from '../components/options/cepage'
import Price from '../components/options/price'
import Annee from '../components/options/annee'
import Accords from '../components/options/accords'
import Aromes from '../components/options/aromes'
import Pastilles from '../components/options/pastilles'
import ChoseCellar from '../components/options/choseCellar'
import Filter from '../views/filter'
import Search from '../views/Search'
// import Profile from '../views/profile'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const EditWineStack = () => (
  <Stack.Navigator 
    screenOptions={{
    cardStyle: { backgroundColor: 'white' },
    headerTintColor: 'white',
    border:'none',
  }} headerMode={'none'}>
    <Stack.Screen name='edit_wine_default' component={EditWine} />
  </Stack.Navigator>
)
const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='search_wine' component={Filter} />
    <Stack.Screen name='results_wine' component={Wines} />
    <Stack.Screen name='edit_wine'>
      {EditWineStack}
    </Stack.Screen>
  </Stack.Navigator>
)
const ChooseAddWineMethodModal = () => (
  <Stack.Navigator>
    <Stack.Screen name={'choose_add_wine_method'}
      options={{
        header:() => null,
        headerTitle:'',
      }}
      component={AddWineModal} />
      <Stack.Screen name={'add_new_list'} component={ScanLabelAddWine} />
      <Stack.Screen name={'add_new_tasting_note'} component={SearchDbAddWine} />
      <Stack.Screen name='edit_wine' component={EditWineStack} />
      <Stack.Screen name={'choseCellar'} component={ChoseCellar} />
      <Stack.Screen name={'region'}  component={Region} />
      <Stack.Screen name={'price'}  component={Price} />
      <Stack.Screen name={'country'} component={Country} />
      <Stack.Screen name={'appelation'} component={Appelation} />
      <Stack.Screen name={'cepage'} component={Cepage} />
      <Stack.Screen name={'annee'} component={Annee} />
      <Stack.Screen name={'accords'} component={Accords} />
      <Stack.Screen name={'aromes'} component={Aromes} />
      <Stack.Screen name={'pastilles'} component={Pastilles} />
  </Stack.Navigator>
)
const AddWineStack = () => (
    <Stack.Navigator
      // headerMode={'none'}
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        headerStyle: {
          border:'none',
          backgroundColor:'rgba(0,0,0,0.8)',
          shadowOffset: {}
        },
        headerTintColor: 'white',
        border:'none',
      }}
    >
    <Stack.Screen name={'cellar'} component={ChooseMethodAddWine}/>
    <Stack.Screen name={'add_new_cellar'} component={SearchDbAddWine} />
  </Stack.Navigator>
)
const WineListStack = () => (
  <Stack.Navigator options={{
    header : WineListSelect
  }}>
    <Stack.Screen name='winelist' component={Wines} />
  </Stack.Navigator>
)
const WineListView = () => (
  <Stack.Navigator>
    <Stack.Screen
    options={{
      header : WineListSelect
    }}
    name='winelist' component={Wines} />
  </Stack.Navigator>
)
const CellarListStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name='wine_cellars' component={Cellars} />
    <Stack.Screen name={'cellar'}>
      {WineListStack}
    </Stack.Screen>
    <Stack.Screen name={'set_cellar'} component={EditCellar} />
    <Stack.Screen name={'edit_wine'}>
      {EditWineStack}
    </Stack.Screen>
  </Stack.Navigator>
)
const WishListStack = () => (
  <Stack.Navigator >
    <Stack.Screen name='wine_wishlists' component={Cellars} />
    <Stack.Screen name={'wishlist'}>
      {WineListStack}
    </Stack.Screen>
    <Stack.Screen name={'edit_wishlist'}>
      {EditWineStack}
    </Stack.Screen>
  </Stack.Navigator>
)
const Settings = () => (
  <Stack.Navigator>
    <Stack.Screen name='wine_wishlists' component={Cellars} />
    <Stack.Screen name={'wishlist'}>
      {WineListStack}
    </Stack.Screen>
    <Stack.Screen name={'add_wishlist'}>
      {AddWineStack}
    </Stack.Screen>
  </Stack.Navigator>
)

const WineTabs = () => (
  <Tab.Navigator headerMode={'none'} animationEnabled lazy={false}>
    <Tab.Screen name='wine_list'>
      {WineListView}
    </Tab.Screen>
    <Tab.Screen name='cellar_list' options={{header:null}}>
      {CellarListStack}
    </Tab.Screen>
    <Tab.Screen name='add_sth' options={{header:null}}>
      {AddWineStack}
    </Tab.Screen>
    <Tab.Screen name='wish_list'>
      {WishListStack}
    </Tab.Screen>
    <Tab.Screen name='settings'>
      {Settings}
    </Tab.Screen>
  </Tab.Navigator>
)
const WineListNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={'winetabs'} options={{ header: () => null }}>
      {WineTabs}
    </Stack.Screen>
    <Stack.Screen name={'edit_wine'}>
      {EditWineStack}
    </Stack.Screen>
    <Stack.Screen name={'filter'}>
      {SearchStack}
    </Stack.Screen>
    <Stack.Screen name='lookup_cellar' component={Wines} />
    <Stack.Screen name='edit_cellar' component={EditCellar} />
    <Stack.Screen name='edit_list' component={Wines} />
  </Stack.Navigator>
)
const AddCellarStack = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: 'transparent' },
      headerStyle: {
        border:'none',
        backgroundColor:'rgba(0,0,0,0.8)',
        shadowOffset: {}
      },
      headerTintColor: 'white',
      border:'none',
    }}
    >
    <Stack.Screen
      options={{
      headerTitle:'Creer une cave',
    }}
      name={'add_cellar'} component={AddCellar} />
  </Stack.Navigator>
)
const WineStack = () => (
  <Stack.Navigator
    headerMode={'none'}
    mode={'modal'}
    screenOptions={{
        cardStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name={'winelistnavigator'}>
        {WineListNavigator}
      </Stack.Screen>
      <Stack.Screen name={'winesheet'} component={EditWine} />
      <Stack.Screen name={'region'}  component={Region} />
      <Stack.Screen name={'country'} component={Country} />
      <Stack.Screen name={'appelation'} component={Appelation} />
      <Stack.Screen name={'cepage'} component={Cepage} />
      <Stack.Screen name={'annee'} component={Annee} />
      <Stack.Screen name={'accords'} component={Accords} />
      <Stack.Screen name={'aromes'} component={Aromes} />
      <Stack.Screen name={'pastilles'} component={Pastilles} />
      <Stack.Screen name={'add_wine'}>{AddWineStack}</Stack.Screen>
      <Stack.Screen name={'add_cellar'}>{AddCellarStack}</Stack.Screen>
      <Stack.Screen name={'add_wishlist'}>
        {AddWineStack}
      </Stack.Screen>
    </Stack.Navigator>
)

const StackWine = () => (
  <Stack.Navigator
    headerMode={'none'}
    mode={'modal'}
    transparentCard={true}
    navigationOptions={{
      header:null,
      gesturesEnabled:false
    }}
    screenOptions={{
      cardStyle: { backgroundColor: '#ECEFF1', opacity: 0.92 },
    }}
    >
    <Stack.Screen name={'winestack'}>
      {WineStack}
    </Stack.Screen>
    <Stack.Screen name={'ftu_import'} component={EditCellar} />
    <Stack.Screen name={'switch_premium'}  component={Region} />
    <Stack.Screen name={'choose_add_wine_method'}>{ChooseAddWineMethodModal}</Stack.Screen>
  </Stack.Navigator>
)
const FirstTimeOpen = () => (
  <Stack.Navigator
    headerMode={'none'}
    screenOptions={{
      cardStyle: { backgroundColor: 'transparent' },
      headerStyle: {
        border:'none',
        backgroundColor:'rgba(0,0,0,0.8)',
        shadowOffset: {}
      },
      headerTintColor: 'white',
      border:'none',
    }}
    >
  <Stack.Screen name={'step_1'} component={Step_1_Open} />
  <Stack.Screen name={'step_2'} component={Step_2_Open} />
  <Stack.Screen name={'step_3'} component={Step_3_Open} />
</Stack.Navigator>
)
const LoginViews = () => (
  <Stack.Navigator
    headerMode={'none'}
    headerBackground={() => (
      <LinearGradient
        start={{x: 0, y: 0}}
        style={{flex:1}}
        end={{x: 1, y: 0}} colors={[ '#9F041B','#E02535']}
      />
    )}
    headerBackTitle={null}
    headerTintColor={'#fff'}
    >
    <Stack.Screen name='login' component={Login} />
    <Stack.Screen name='signIn' component={SignIn} />
    <Stack.Screen name='signUp' component={SignUp} />
    <Stack.Screen name='resetPass' component={ResetPass} />
  </Stack.Navigator>
)

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode={'none'}
      mode={'modal'}
      screenOptions={{
          cardStyle: { backgroundColor: 'transparent' }
        }}
      >
      <Stack.Screen name={'authLoading'} component={AuthLoading}/>
      <Stack.Screen name={'login_views'}>{LoginViews}</Stack.Screen>
      <Stack.Screen name={'stack_wine'}>{StackWine}</Stack.Screen>
      <Stack.Screen name={'ftu_open'}>{FirstTimeOpen}</Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppContainer;
