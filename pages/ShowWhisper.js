import React, { useRef, useEffect } from 'react'
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

import { identity } from '../whispers/Identity';


export default function ShowWhisper({ navigation })
{
    const fadeAnim = useRef(new Animated.Value(0)).current
    const delayedFadeAnim = useRef(new Animated.Value(0)).current
    useEffect(() =>
    {

        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true // Add This line
            },
        ).start();

        setTimeout(() =>
        {
            Animated.timing(
                delayedFadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 1000)


    }, [fadeAnim, delayedFadeAnim])

    return (

        <View style={styles.center}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={{ ...styles.text }}>
                    {identity[0].text}
                </Text>
            </Animated.View>
            <Animated.View style={{ opacity: delayedFadeAnim }}>
                <Text style={styles.verse}>
                    {identity[0].verse}
                </Text>
            </Animated.View>
        </View>

    )
}


const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25
    },
    text: {
        fontSize: 24,
        fontStyle: 'italic',
        textAlign: 'left'
    },
    verse: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    }
});