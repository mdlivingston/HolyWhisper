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
export default function ReminderTime()
{
    return (
        <Text>Reminder Time Page!</Text>
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        padding: 5
    },
    text: {
        padding: 5,
        fontSize: 17
    },
    numbered: {
        padding: 10,
        fontSize: 17
    },
    bold: {
        fontWeight: 'bold',
    }
});