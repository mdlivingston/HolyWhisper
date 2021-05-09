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


export default function ItsBetterIfIGo({ navigation })
{
    const { currentUser, } = useAuth()

    return (
        <>
            <Text style={styles.capital}>E
                <Text style={styles.normal}>arly in the morning, while it was still dark outside, Mary Magdalene was weeping at the tomb of Jesus. She was weeping because Jesus’s body was missing from the tomb. Jesus soon revealed Himself to her in that moment and she went to wrap herself around Him. Jesus said to her, “Stop clinging to Me, for I have not yet ascended to the Father, but go to My brethren and say to them, ‘I ascend to My Father and your Father, and My God and your God.’” John 20:17. </Text>
            </Text>
            <Text style={styles.normal}>Why would Jesus tell one of His own that had been following Him for years to stop trying to touch Him because He had not yet ascended to the Father? What does ascending to the Father have to do with it? The answer is in a few chapters back that Mary was not remembering in this divine encounter with the risen One. </Text>
            <Text style={styles.normal}>In John 16, Jesus is telling His followers plainly that He is about to die. Jesus thought it was worth noting that they didn’t care where he was going after he died because their hearts were filled with sorrow. They were probably thinking if Jesus was no longer going to be here in the flesh then no thing can be has good as that. Then Jesus said “It is better that I go away; for if I do not go away, the Helper will not come to you; but if I go, I will send Him to you.”. It is clear here that if Jesus doesn’t ascend he cannot send Holy Spirit. Let’s go back to the tomb…</Text>
            <Text style={styles.normal}>Mary was trying to cling to Jesus even though He said it was better if He went away. Jesus thought it was nessesary to tell her to stop clinging to Him. I mean why can’t she just hug Him for a little bit then say He has to go? Was Jesus being insensitive to Mary’s moment? Or was Jesus trying not to delay Mary‘s moment of union with Holy Spirit any longer? If so, was Mary being insensitive to her own moment? Oh I love our King! Mary knew Jesus was the only salvation she had on this earth. She wanted to cling tightly to that security and safety. Jesus didn’t want her clinging to her salvation but he wanted her to be consumed by the Holy Spirit which was promised. You see mankind had no way to cling onto God before Jesus was on the scene. Jesus knew clinging to His physical body was not the answer and he wanted to relate that to Mary and all the readers of the Bible because He was literally about to unlock the ability for all flesh to be able to cling onto God in the Spirit by the power of Holy Spirit so that they may have access to His presence at all times and be radically transformed by Holy Spirit living on the inside! </Text>
            <Text style={styles.normal}>Jesus was about to fulfill many promises from the Old Testament like Isaiah 44:3-5 where it says “For I will pour out water on the thirsty land And streams on the dry ground; I will pour out My Spirit on your offspring And My blessing on your descendants; And they will spring up among the grass Like poplars by streams of water.’ This one will say, ‘I am the LORD’s’.”. And Joel 2:28 “It will come about after this That I will pour out My Spirit on all mankind; And your sons and daughters will prophesy, Your old men will dream dreams, Your young men will see visions.”. </Text>
            <Text style={styles.normal}>Also in Ezekiel 36 where it says “Then I will sprinkle clean water on you, and you will be clean; I will cleanse you from all your filthiness and from all your idols. Moreover, I will give you a new heart and put a new spirit within you; and I will remove the heart of stone from your flesh and give you a heart of flesh. I will put My Spirit within you and cause you to walk in My statutes, and you will be careful to observe My ordinances. You will live in the land that I gave to your forefathers; so you will be My people, and I will be your God.”.</Text>
            <Text style={styles.normal}>All creation could not be in relationship with the Father unless Jesus ascended. Restoring mankind to their creator was Jesus‘s main mission and for that mission to be complete, ‘It is better that I go...‘ John 16:7.</Text>
        </>
    )
}
