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
    Alert,
    Image,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { getData, preferredWhispersKey, storeData } from '../helpers/LocalStorage';
import { categories } from '../helpers/Randomizer';
import { db } from '../helpers/Firebase';
import { useAuth } from '../context/AuthContext';

export default function FavoriteWhispers({ navigation, route })
{
    const [favoriteWhispers, setFavoriteWhispers] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()

    useEffect(() =>
    {
        //On screen load no matter the history
        const unsubscribe = navigation.addListener('focus', async () =>
        {
            setLoading(true)
            const favs = await db.favoriteWhispers.where('uid', '==', currentUser.uid)
                .orderBy('createdAt', 'desc')
                .get()

            console.log(favs.docs.map(doc => db.formatDoc(doc)))

            setFavoriteWhispers(favs.docs.map(doc => db.formatDoc(doc)))
            setLoading(false)
        });

        return unsubscribe;

    }, [])

    React.useLayoutEffect(() =>
    {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.stokeButton} onPress={() => navigation.navigate('ShowWhisper', {})}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, favoriteWhispers]);

    return (
        <ScrollView>
            {favoriteWhispers.length > 0 && (
                <View style={styles.container}>
                    {favoriteWhispers.map((w, i) => (
                        <TouchableOpacity key={w.id} style={styles.section} onPress={() => navigation.navigate('ShowWhisper', { forcedWhisper: w })}>
                            <Text style={styles.title}>{w.verse} - {w.category}</Text>
                            <Text style={{ width: 2, flex: 1 }}></Text>
                            <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {favoriteWhispers.length == 0 && (
                <View style={styles.center}>
                    <Text>{loading ? 'Loading...' : 'No favorites added yet.'}</Text>
                </View>
            )}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    center: {
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 25,
    },
    container: {
        height: '100%',
        //backgroundColor: 'white'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
    },
    title: {
        width: '90%',

    },
    blueFire: {
        height: 33,
        width: 33,
        resizeMode: 'contain',
        margin: 10,
    },
    stokeButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    }
});