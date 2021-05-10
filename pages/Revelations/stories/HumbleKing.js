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

import { useAuth } from '../../../context/AuthContext';
import { useRef } from 'react';
import { db } from '../../../helpers/Firebase';
import { SafeAreaView } from 'react-navigation';
import { styles } from './StoryStyles';


export default function HumbleKing({ navigation })
{
    const { currentUser, } = useAuth()

    return (
        <>
            <Text style={styles.capital}>I
                <Text style={styles.normal}>n the beginning God created the heavens and the earth. And the earth was a formless and desolate emptiness, and darkness was over the surface of the deep, and the Spirit of God was hovering over the surface of the waters. Then God said, “Let there be light”; and there was light. Genesis 1:1-3</Text>
            </Text>
            <Text style={styles.normal}>Who is the King of glory? The Lord strong and mighty, The Lord mighty in battle.</Text>
            <Text style={styles.normal}>Lift up your heads, you gates, And lift them up, you ancient doors, That the King of glory may come in!</Text>
            <Text style={styles.normal}>Who is this King of glory? The Lord of armies, He is the King of glory. Selah Psalm 24:8-10</Text>

        </>
    )
}
