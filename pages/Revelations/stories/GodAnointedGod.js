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


export default function GodAnointedGod({ navigation })
{
    const { currentUser, } = useAuth()

    return (
        <>
            <Text style={styles.capital}>W
                <Text style={styles.normal}>hy in the world did God anoint God in the Jordan river in front of His creation? Matthew 3:13.</Text>
            </Text>
            <Text style={styles.normal}>This is a heavily debated topic between churches. It is crucial that the church understands the reason why God anointed Jesus when he was 30 years old. </Text>
            <Text style={styles.normal}>If we misunderstand this moment in history, the purpose God has for each of us will be thwarted. </Text>
            <Text style={styles.normal}>While growing up I heard sayings like “I’ll always be a sinner.” or “Well, we can’t be like that, He is Jesus.”. If we believe those statements then we are doing God a great dis-service and missing the Gospel all together. The Lord said “Be holy, because I am holy.” 1 Peter 1:16. He would not say that if it wasn’t possible, but it is only by the power of Holy Spirit that we are able to become like Him.</Text>
            <Text style={styles.normal}>In John 5:19, it says that the Son can do nothing by himself. He does only what He sees the Father doing. Why  can Jesus, the creator of the universe, do nothing by Himself? It is because He became like us. In John 15:4-5, it says that apart from Jesus we can do nothing. Jesus was displaying who we really are and how to live in our God given purpose. So God anointed God (Jesus) to show what he wants to anoint us with, which is Holy Spirit.  The Father was able to anoint Jesus because He was perfect in His sight. So how are we able to become perfect in the Father’s eyes? Well, it is because of the Gospel / the Good News. </Text>
            <Text style={styles.normal}>Jesus came as one of us and lived a life he wants us to live. He sacrificed Himself and raised Himself up from death so that we could come back into personal relationship with Him, the Father, and Holy Spirit. Just as They intended in the garden with Adam and Eve. Why did Jesus’ death allow us to come back into relationship with the Godhead? The Bible says that payment of blood is the only way to have remission of sins. Jesus paid for relationship with us to be restored with His own blood. Ephesians 5:1-2 says, “therefore be imitators of God, as beloved children. And walk in love, as Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God.”</Text>
            <Text style={styles.normal}>Because of the life Jesus lived, and by the power of the Holy Spirit, we can follow His lead and walk in righteousness every day. “For to this you have been called, because Christ also suffered for you, leaving you an example, so that you might follow in his steps.” 1 Peter 2:21.</Text>
        </>
    )
}
