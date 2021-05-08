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
                <ItsBetterIfIGo />
            </View>
        )
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'black' }}>
            <ParallaxScrollView
                backgroundColor="black"
                contentBackgroundColor="black"
                parallaxHeaderHeight={300}
                stickyHeaderHeight={70}
                fadeOutForeground={true}
                renderBackground={() => (
                    <Image
                        style={{ height: 300, width: width }}
                        source={route.params.imagePath}
                    />
                )}>

                {loadRevelationText()}

            </ParallaxScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imageBox: {

    }
});