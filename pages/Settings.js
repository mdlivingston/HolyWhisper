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
import { createStackNavigator } from '@react-navigation/stack';
import PreferredWhispers from './PreferredWhispers';
import { NavigationContainer } from '@react-navigation/native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Preferred Whispers',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


const Stack = createStackNavigator();



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
                <Text style={styles.title} >Whisper Frequency</Text>
                <Text style={{ width: 2, flex: 1 }}></Text>
                <FontAwesomeIcon style={{ color: 'grey' }} size={15} icon={faChevronRight} />
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
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