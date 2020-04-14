import React , {useState, useEffect, useMemo} from 'react';
import {Button,ActivityIndicator,FlatList,StyleSheet,Text,View,ScrollView} from 'react-native';
import moment from 'moment'
import WineListSelect from 'components/navigation/wineListSelect'
import WineItem from 'components/listItems/wineItem';
import SelectBar from 'components/header/wineSelectBar';
import FilterLabels from 'components/thumbnails/filterLabels';
import ActionSheet from './ActionSheet';
import ActionButton from './ActionButton';
import SearchView from 'components/header/wineSearchBar';
import messages from 'components/texts/';
import {useSelector,useDispatch} from 'react-redux';
import {fetchWines, textSearch, deleteWine, fetchSearch} from 'functions/api';
import {setWine,resetWine,resetResults,setSearch,resetSearch} from 'reduxStore/actions';


const Wines = ({navigation,route}) => {
  const dispatch = useDispatch()
  const triggerResetWine = () => dispatch(resetWine())
  const triggerSetWine = (e) => dispatch(setWine(e))
  const triggerFetchWines = (a,b,c) => dispatch(fetchWines(a,b,c))
  const triggerFetchSearch = (e) => dispatch(fetchSearch(e))
  const triggerResetResults = () => dispatch(resetResults())
  const triggerResetSearch = () => dispatch(resetSearch())
  const triggerSetSearch = (e) => dispatch(setSearch(e))
  const triggerTextSearch = (e) => dispatch(textSearch(e))
  const triggerdeleteWine = (e) => dispatch(deleteWine(e))
  const keyOrder = useSelector(state => (state.search || {}).keyOrder || 'region');
  const order = useSelector(state => (state.search || {}).order || 1);
  const mostRecentUpdate = useSelector(state => state.user.mostRecentUpdate)
  const cellarId = useSelector(state => state.cellar.cellarId)
  const isSearching= useSelector(state => Object.keys(state.search || {}).length > 0)
  const activeSelection = (route.params||{}).activeSelection === true
  const method = (route.params||{}).method
  const showPicker = (route.params||{}).showPicker === true
  const search = useSelector(state => state.search || {})
  const wines = useSelector(state => {
    const wines = Object.keys(state.search || {}).length === 0
          ? !state.wines
            ? null
            : (state.wines || [])//.filter(w => w.cellarId === state.cellar.cellarId)
          : !state.results
          ? null
          : state.results.filter(w => w.cellarId === state.cellar.cellarId);
    return (wines||[]).sort((a, b) => a[keyOrder] > b[keyOrder] ? order : -1 * order)
  })
  const [refreshing,setRefreshing] = useState(true)
  const [showSorting,setShowSorting] = useState(false)
  const [limit,setLimit] = useState(10)
  const [selected,setSelected] = useState([])
  const [allSelect,setAllSelect] = useState(false)
  const _keyExtractor = (item, index) => item.key;

  const _toggleSelect = (id) => {

    const index = selected.findIndex(a => (a||'').toString() === id.toString());
    const newSelected = index === -1
      ? [...selected,id]
      : [...selected].filter(s => s !== id);
    navigation.setParams({selected: newSelected.length , activeSelection : !!newSelected.length});
    setSelected(newSelected)
    setAllSelect(false)
  }
  const _onPressItem = (wineId) => {
    const wine = wines.find(w => w._id === wineId)
    resetWine();
    triggerSetWine(wine);
    triggerFetchWines(cellarId,wineId,{})
    navigation.navigate('edit_wine', {
      color: wine.color,
    });
  };
  const _onLongPressItem = (id) => {
    console.log({id})
    _toggleSelect(id)
    navigation.setParams({activeSelection:true,method:'move'})

  }

  useMemo(()=>{

    navigation.setOptions({
      header : () => <WineListSelect
        onDeselectAll={()=>{
          setSelected([])
          navigation.setParams({activeSelection: false})
        }}
        navigation={navigation}
        params={route.params}
      />
    })
  },[selected,activeSelection])
  useEffect(() => {
    triggerFetchWines(cellarId, '', {mostRecentUpdate})
      .then(() => setRefreshing(false));
  },[])

  const _renderItem = ({item}) => (
    <WineItem
      toggleSelect={_toggleSelect}
      activeSelection={activeSelection}
      selected={selected.findIndex(array => array === item._id) > -1}
      onPressItem={_onPressItem}
      onLongPressItem={_onLongPressItem}
      {...item}
    />
  );

  const getResults = () => {
    if (search) {
      triggerFetchSearch(search)
        .then(() => {
          setRefreshing(false);
        })
        .catch(e => {
          console.log(e);
          setRefreshing(false);
        });
    } else {
      triggerFetchWines(search)
        .then(() => setRefreshing(false))
        .catch(e => {
          console.log(e);
          setRefreshing(false);
        });
    }
  }
    if (!wines) {
      return (
        <View style={styles.root}>
          <ActivityIndicator />
        </View>
      );
    }
    const wineArray = wines.reduce((array,wine,i)=>{
      return !wine ? array : [...array, {
        id: i.toString(),
        _id: wine._id.toString(),
        key: wine._id.toString(),
        color: wine.color,
        stock: wine.stock || 0,
        price: wine.price,
        pastilles: wine.pastilles || [],
        appelation: wine.appelation,
        domain: wine.domain,
        annee: wine.annee,
        favorite: wine.favorite,
        region: wine.region,
        country: wine.country,
        cepage: wine.cepage || [],
      }]
    },[])
    return (
      <View style={styles.root}>
        <View
        style={{...styles.container}}
        >
            {/* <SelectBar
              allSelect={allSelect}
              active={activeSelection}
              leaveSelect={()=>{
                setSelected([])
                setAllSelect(false)
                navigation.setParams({activeSelection: false})
              }}
              onPress={() => {
                const selected = allSelect
                  ? []
                  : wines.map(w => w._id);
                navigation.setParams({selected: selected.length});
                setSelected(selected)
                setAllSelect(!allSelect)
              }}
            /> */}
            <SearchView
              onPress={() => navigation.push('filter')}
              active={!activeSelection}
              value={''}
              placeholder={'Rechercher'}
              onChangeText={search => setSearch(search)}
              onClear={() => {
                triggerResetSearch()
                triggerResetResults()
              }}
            />
          {/* <ActionSheet
            showPicker={showPicker}
            search={search}
            navigation={navigation}
            allSelect={allSelect}
            deleteWine={e => triggerdeleteWine(e)}
            selected={selected}
            wines={wines}
            setSelected={selected => setSelected(selected)}
            showSorting={showSorting}
            setShowSorting={showSorting => setShowSorting(showSorting)}
            resetResults={() => triggerResetResults}
            setSearch={e => triggerSetSearch(e)}
            fetchSearch={e => triggerFetchSearch(e)}
          /> */}
          <FlatList
            refreshing={refreshing}
            onEndReached={() => {}}
            onRefresh={() => {
              setRefreshing(true); // trigger reload of notif
              getResults();
            }}
            data={wineArray}
            keyExtractor={_keyExtractor}
            onEndReachedThreshold={0.01}
            renderItem={_renderItem}
            ListEmptyComponent={
              isSearching === true ? (
                <View style={styles.emptyView}>
                  <Text style={styles.title}>Aucun Resultat</Text>
                </View>
              ) : (
                <View style={styles.emptyView}>
                  <Text style={styles.title}>{messages.emptyCave}</Text>
                </View>
              )
            }
          />
        </View>
        <ActionButton navigation={navigation} />
      </View>
    );
}
export default Wines
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },

  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 30,
    padding: 10,
  },
  buttonView: {
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9F041B',
  },

  title: {
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular',
    color: '#434343',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
  },
});
