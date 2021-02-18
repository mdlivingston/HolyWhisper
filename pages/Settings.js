import React from 'react'
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
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function Settings({ route, navigation })
{
    const { name } = route.params;
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PreferredWhispers', { name: 'Jane' })}>
                <Text style={styles.title}>Preferred Whispers</Text>
                <Text style={{ width: 2, flex: 1 }}></Text>
                <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.section}>
                <Text style={styles.title} >Whisper Notifications</Text>
                <Text style={{ width: 2, flex: 1 }}></Text>
                <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
            </TouchableOpacity>

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