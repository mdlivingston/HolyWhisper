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

export default function Settings()
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
    }
});