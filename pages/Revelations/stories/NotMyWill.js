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


export default function NotMyWill({ navigation })
{
    const { currentUser, } = useAuth()

    return (
        <>
            <Text style={styles.capital}>A
                <Text style={styles.normal}>nd He went a little beyond them, and fell on His face and prayed, saying, “My Father, if it is possible, let this cup pass from Me; yet not as I will, but as You will.” ‭‭Matthew‬ ‭26:39‬ ‭</Text>
            </Text>
            <Text style={styles.normal}>Then the Lord God took the man and put him into the garden of Eden to cultivate it and keep it. The Lord God commanded the man, saying, “From any tree of the garden you may eat freely; but from the tree of the knowledge of good and evil you shall not eat, for in the day that you eat from it you will surely die.” ‭‭Genesis‬ ‭2:15-17‬ ‭</Text>
            <Text style={styles.normal}>In these two passages of scripture, we have the first Adam and the last Adam (Jesus) in a garden. In both situations, both of them are tempted to go against the will of God. Both have a decision to make about a tree. Adam chose to eat from a tree and disobeyed God. Jesus chose to be crucified onto a tree and obeyed God. Adam’s decision separated man from God. Jesus’s decision brought man back to God. </Text>
            <Text style={styles.normal}>It is wild that Jesus, for a little bit, had a different will than the Father’s. The Bible says  “For we do not have a high priest who cannot sympathize with our weaknesses, but One who has been tempted in all things as we are, yet without sin.” ‭‭Hebrews‬ ‭4:15‬. He was tempted in all things. Jesus’s will was to let His upcoming torture and death pass from Him. The Father’s will was to not let it pass. As we all know Jesus chose His Father’s will and because of that we can now know the Father just like Jesus did and also like the first Adam before the fall. </Text>
            <Text style={styles.normal}>Jesus flipped the script. Now everyone on earth is presented with the decision to eat from a tree again but now it is different. We are presented with the decision to eat from the tree of life this time and Jesus is that tree of life. Jesus is the tree of life. This time God says you must eat from the tree of life or you shall surely die. “So Jesus said to them, “Truly, truly, I say to you, unless you eat the flesh of the Son of Man and drink His blood, you have no life in yourselves. He who eats My flesh and drinks My blood has eternal life, and I will raise him up on the last day. For My flesh is true food, and My blood is true drink. He who eats My flesh and drinks My blood abides in Me, and I in him. As the living Father sent Me, and I live because of the Father, so he who eats Me, he also will live because of Me.” John‬ ‭6:53-57‬.  </Text>
            <Text style={styles.normal}>Everyone on earth is presented with a garden of Eden decision daily. He not only wants us to eat once but daily. The secret place is the feasting table. When we are awake, Holy Spirit is beckoning us to the secret place to feast with Him. Not in some legalistic way but in a way that is for our benefit. If we choose to not eat from this tree we will spiritually start to die and never truly start to live. This is not about just going to heaven. This is about living this life right now to the fullest. This life will be confusing and miserable if we don’t sit down and eat. Jesus made it possible to commune with Him, it is on us to sit down and eat.</Text>
            <Text style={styles.normal}>Just like in the two gardens mentioned before, there will be a temptation to stop doing the will of God. Which is the temptation to stop eating. We can’t afford to fall for it. The enemy will try to lull us away from the tree of life now with distractions and what not. We must declare and decide daily, “Not my will but yours…”</Text>
        </>
    )
}
