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
            <Text style={styles.normal}>Who is this King of glory? The Lord of armies, He is the King of glory. Selah. Psalm 24:8-10</Text>
            <Text style={styles.normal}>Reading those verses above would make a sin natured mind think that if God were to be wrapped in flesh then he would be physically strong, perfectly fit, rich, powerful, lofty, stand out in a crowd, and would be worshipped / praised by all. However when God came to the Earth in the flesh, this was not the case at all and the world would not receive Him. Let’s think about this for a bit. God, the creator of the known universe. The Creator of the universe that is so massive, that there are more galaxies than there are grains of sand on the seashore, came as a baby. A baby… This should be enough to blow the human mind away for the rest of humanity’s existence. God came has a fetus, dependent on an imperfect woman’s nutrients inside of her stomach that He created. He then was birthed and placed inside of a manger (a long open box or trough for horses or cattle to eat from). He was completely dependent on His creation to raise Him up, to nurse Him, to hold Him, to feed Him, to teach Him to walk and talk! He chose mankind to teach Him how to talk and walk! Who is this King of Glory!?</Text>
            <Text style={styles.normal}>As He grew up into a man, he did not physically stand out among His creation. He grew up as a normal teenager, and a normal man in an oppressed society that was being bullied by the Romans. The Bible says he was meek and lowly. He wasn’t violent or loud. The people around Him, saw Him as having a low position, manner or degree in life and culture. He let His creation baptize Him even though he did not need to be baptized because he was already pure and holy. After he was baptized by the Holy Spirit that endued Him with power from heaven, He positioned Himself even lower and fasted food and water for 40 days. Once He was done fasting He then started His ministry and only did what the Father told Him to do. He had all power and was tempted at every point but still obeyed the Father in everything. Once he started gaining popularity because of the miracles and His teachings, he decided to associate Himself with the outcasts of society. In that culture, when you ate with someone that meant you were equal with each other. The Bible says He dined with sinners and tax collectors. Tax collectors were Jews that worked for the Roman government and stole money from the Jewish people. God made Himself equal with these type of people and called them His friends. Who is this King of Glory!?</Text>
            <Text style={styles.normal}>He chose 12 disciples that were rejects of their own culture to follow Him. He even chose one disciple that He knew was going to steal from His ministry and eventually betray Him for money. Not only that but He told him to be the manager over the finances! Wait, it gets even more crazy. He washed the betrayer’s feet on the night of the betrayal! The Bible says He was as silent like lamb to His slaughter. He didn’t say a word while being beaten to death by His own creation. God allowed His creation to murder Him. All so that they might know Him. He rose again three days after His death. I have not been raised from the dead yet but I know a sin natured mind would be tempted to be cocky and say I told you I was right. I told you I would raise from the dead. I told you my Father loves me. Look at me in my risen Glory! Jesus didn’t display anything like that at all though. He actually got mistaken for a gardener right when He had risen by one that followed Him for years! God knows what he could have displayed Himself as but he chose to look like a gardener after He rose from the dead? Who is this King of Glory!?</Text>
            <Text style={styles.normal}>He is Jesus. A humble King.</Text>

        </>
    )
}
