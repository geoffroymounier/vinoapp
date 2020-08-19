import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'components/thumbnails/icon';
import DefaultButton from 'components/buttons/defaultButton';

const AddWineModal = ({ navigation }) => {
    const scanLabel = () => navigation.push('scan_method')
    const searchLabel = () => navigation.push('add_new_tasting_note')
    const closeModal = () => navigation.goBack()
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <DefaultButton label={'Scan Label'} styleContainer={styles.button} onPress={scanLabel} />
                <DefaultButton label={'Database Research'} styleContainer={styles.button} onPress={searchLabel} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Icon
                    onPress={closeModal}
                    height={18}
                    width={18}
                    disabled={false}
                    styleContainer={{
                        marginHorizontal: 20,
                        marginVertical: 17
                    }}
                    name={'times'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        maxWidth: 300,
        backgroundColor: '#787882',
        borderWidth: 1.1,
        borderColor: '#787882',
        borderRadius: 14,
        marginVertical: 20
    },

});

export default AddWineModal;