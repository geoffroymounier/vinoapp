import React from 'react';
import {ActionSheetIOS} from 'react-native';

const ActionSheet = ({
  showPicker,
  search,
  navigation,
  allSelect,
  deleteWine,
  selected,
  wines,
  setSelected,
  showSorting,
  setShowSorting,
  resetResults,
  setSearch,
  fetchSearch,
}) => {
  if (showPicker === true) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Supprimer', 'Déplacer de Cave'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        navigation.setParams({showPicker: false});
        if (buttonIndex === 1) {
          allSelect
            ? deleteWine(true, [], wines[0].cellarId)
            : deleteWine(false, selected, wines[0].cellarId);
          setSelected([]);
          navigation.setParams({
            showPicker: false,
            activeSelection: false,
            selected: 0,
          });
        } else if (buttonIndex === 2) {
          navigation.navigate('choseCellar', {
            all: allSelect,
            selected: selected,
            cellarId: wines[0].cellarId,
          });
          navigation.setParams({
            showPicker: false,
            activeSelection: false,
            selected: 0,
          });
        }
      },
    );
  }
  if (showSorting === true) {
    let keyOrder = search.keyOrder || 'region';
    let orderString =
      (search.order || 1) === 1 ? ' (décroissant)' : ' (croissant)';
    let order = search.order || 1;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Tri :',
        options: [
          'Annuler',
          'Millesime' + (keyOrder === 'year' ? orderString : ''),
          'Region' + (keyOrder === 'region' ? orderString : ''),
          'Couleur' + (keyOrder === 'color' ? orderString : ''),
          'Prix' + (keyOrder === 'price' ? orderString : ''),
        ],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        setShowSorting(false);
        let newOrder;
        let newKeyOrder;
        if (buttonIndex === 1) {
          newKeyOrder = 'year';
          newOrder = keyOrder === 'year' && order === 1 ? -1 : 1;
        } else if (buttonIndex === 2) {
          newKeyOrder = 'region';
          newOrder = keyOrder === 'region' && order === 1 ? -1 : 1;
        } else if (buttonIndex === 3) {
          newKeyOrder = 'color';
          newOrder = keyOrder === 'color' && order === 1 ? -1 : 1;
        } else if (buttonIndex === 4) {
          newKeyOrder = 'price';
          newOrder = keyOrder === 'price' && order === 1 ? -1 : 1;
        }
        this.props.resetResults();
        this.props.setSearch({order: newOrder, keyOrder: newKeyOrder});
        setTimeout(() => this.props.fetchSearch(this.props.search), 500);
      },
    );
  }
  return null;
};
export default ActionSheet;
