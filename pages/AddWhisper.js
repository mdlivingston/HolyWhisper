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
    Alert,
    Animated
} from 'react-native';
export default function AddWhisper()
{
    return (
        <View style={styles.center}>
            <Text>Hey</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white'
    },
    button: {
        alignItems: "center",
        // backgroundColor: Colors.dark,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        justifyContent: 'center'
    },
    lightText: {
        fontSize: 20
        // color: 'white',
    },
    settingsIcon: {
        paddingRight: 30,
        // paddingTop: 30
        // position: 'absolute',
        // top: 70,
        // right: 20
    }
});