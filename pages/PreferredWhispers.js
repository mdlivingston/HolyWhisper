import React, { useEffect, useState } from 'react'
import
{
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { getData, removeValue, storeData } from '../components/LocalStorage';
import { categories } from '../components/Categories';



export default function PreferredWhispers()
{
    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() =>
    {
        const asyncFunc = async () =>
        {
            let storage = await getData()

            if (!storage)
                await storeData([])

            setSelectedIds(await getData())
            //removeValue()
        }
        asyncFunc()
    }, [])

    async function changeSelectedId(id)
    {
        const idIndex = selectedIds.findIndex(t => t == id)

        const tempSelected = [...selectedIds];
        if (idIndex > -1)
            tempSelected.splice(idIndex, 1)

        else
            tempSelected.push(id)

        setSelectedIds(tempSelected)
        await storeData(tempSelected)
        await console.log(await getData())

    }

    return (
        <View style={styles.container}>
            { categories.map((c, i) => (
                <TouchableOpacity key={c} style={styles.section} onPress={() => changeSelectedId(c)}>
                    <Text style={styles.title}>{c}</Text>
                    <Text style={{ width: 2, flex: 1 }}></Text>
                    {selectedIds && selectedIds.findIndex(s => s === c) > -1 && <FontAwesomeIcon style={{ color: 'limegreen' }} size={15} icon={faCheck} />}
                </TouchableOpacity>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
    },
    title: {
        width: '90%',
    }
});