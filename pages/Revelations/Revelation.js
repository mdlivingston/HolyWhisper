import React, { useEffect, useState, useCallback } from 'react'
import
{
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    Animated,
    Platform,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions
} from 'react-native';

import { useAuth } from '../../context/AuthContext';
import { useRef } from 'react';
import { db } from '../../helpers/Firebase';
import { SafeAreaView } from 'react-navigation';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ItsBetterIfIGo from './stories/ItsBetterIfIGo';
import HumbleKing from './stories/humbleKing';



export default function Revelation({ navigation, route })
{
    const { currentUser, } = useAuth()
    const [width, setWidth] = useState(Dimensions.get('window').width)

    useEffect(() =>
    {
        console.log(route.params)
        navigation.setOptions({ title: route.params.title })
    })

    const onChange = async () =>
    {
        setWidth(Dimensions.get('window').width)
    };

    useEffect(() =>
    {
        Dimensions.addEventListener("change", onChange);
        return () =>
        {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    function loadRevelationText()
    {
        return (
            <View style={{ height: '100%', backgroundColor: 'black', color: 'white' }}>
                {route.params.key === 'betterifigo' && <ItsBetterIfIGo />}
                {route.params.key === 'humbleking' && <HumbleKing />}
                {route.params.key === 'comingsoon' && <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', padding: 15 }}>Coming soon!</Text>}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'black' }} forceInset={{ bottom: 'never', top: 'never' }}>
            <View style={{ height: '100%', backgroundColor: 'black' }}>
                <ParallaxScrollView
                    backgroundColor="black"
                    contentBackgroundColor="black"
                    parallaxHeaderHeight={route.params.imageHeight}
                    stickyHeaderHeight={70}
                    fadeOutForeground={true}
                    renderBackground={() => (
                        <Image
                            style={{ height: route.params.imageHeight, width: width, maxWidth: 600, alignSelf: 'center', resizeMode: 'stretch' }}
                            source={route.params.imagePath}
                        />
                    )}>

                    {loadRevelationText()}

                </ParallaxScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageBox: {

    }
});