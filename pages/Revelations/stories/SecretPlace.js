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


export default function SecretPlace({ navigation })
{
    const { currentUser, } = useAuth()

    return (
        <>
            <Text style={styles.capital}>A
                <Text style={styles.normal}>t daybreak, Jesus went out to a solitary place. Luke 4:42 NIV</Text>
            </Text>
            <Text style={styles.normal}>But when you pray, go into your room and shut the door and pray to your Father who is in secret. And your Father who sees in secret will reward you. Matthew 6:6 ESV</Text>
            <Text style={styles.normal}>Jesus set many examples for us to follow but this one is the MOST important. Jesus said for us to love God with all our heart is the most important thing we can do, but the solitary place is the place to love on God. It is the place where you are one on one with Him. Just like getting to know anyone else, you have to spend time with them one on one to actually know them and to love on them. We shouldn’t expect anything less with the Lord. The Word says that we love because He first loved us. There is a saying that hurt people, hurt people. I would purpose that in order to love we must first be loved. So only loved people can love people. Since we were first loved through Jesus’s death, we now have access to the Father, who is love. The secret place is where love is grown with the Lord and is essential to a fruitful life while we are still in the flesh.</Text>
            <Text style={styles.normal}>The secret place has absolutely changed my life and relationship with the Lord. It’s a place to read the Word, declare his promises, worship, cry, laugh, dance, sing, speak in tongues, pray, commune, rest, and gaze upon Him. There is no formula to it. Just show up and know He is there. Even if it doesn’t feel like He is there, that is a pefect opportunity to activate faith and declare His promises for you in Matthew 28:20 where Jesus says “I am with you always, even until the end of the age.” and Psalm 139:8 “If I ascend to heaven, You are there; If I make my bed in Sheol, behold, You are there.” Just to name a couple.</Text>
            <Text style={styles.normal}>When I first started going to the secret place, I did not feel anything. Thinking back about it, the Father was forming a knowing in those moments. I remember many times in the secret place, when I wasn’t feeling anything and I would start to doubt He was really there with me, Holy Spirit would whisper to me “Which do you believe more, your feelings or My Word”? I would say to Him, “Your Word” and then He would say “What does it say?”. I would replied “You are always with me.” As I would have conversations like this with our Creator, it began to build a knowing inside of me. This knowing is the safety net for when feelings lie to us. If you start to believe a lie and begin to spiral down inwardly with thoughts and emotions, this knowing absorbs the fall and begins to minister to you through power of the Holy Spirit. Once the foundation of knowing is laid and has solidified within you, Jesus’s voice becomes more clear. The sheep KNOW their Shepard’s voice. What is the Shepard’s voice? It is the Bible. The Word of God. Knowing can only come from the Word of God and believing it. Once we read it, it is up to us to believe it. Once we truly believe it, knowing is established. This is where faith changes things. The Word says “And without faith it is impossible to please Him, for he who comes to God must believe that He is and that He is a rewarder of those who seek Him.” Hebrews‬ ‭11:6‬. </Text>
            <Text style={styles.normal}>Whatever we behold in life, we will become. Jesus always beheld the Father and the result was Him looking like the Father. When we go to the secret place we are beholding Him which will begin to transform us to look more like Him as well. That is the goal. To be more like Him. To be like Him, we must know Him. The Bible says “To truly know him meant letting go of everything from my past and throwing all my boasting on the garbage heap. It’s all like a pile of manure to me now, so that I may be enriched in the reality of knowing Jesus Christ and embrace him as Lord in all of his greatness.” Philippians‬ ‭3:8‬. </Text>
            <Text style={styles.normal}>Knowing Jesus is superior to all things that this world has to offer and the Bible says so. The Bible also says “But seek first His kingdom and His righteousness, and all these things will be added to you.” Matthew‬ ‭6:33‬. Seeking first the kingdom and getting to know Jesus point directly to the secret place. The secret place is the most essential place in our walk with the Lord. Without it, it is hard to know where He wants to send us in this life on earth. For example, when we were living in Alabama and I first started going to the secret place, it didn’t take long for me to see signs that we should move to Texas. I would have dreams about being with pastors in Texas and miracles happening. Then the next morning in the secret place I would somehow turn to the pages where the same miracles in the Bible that were happening in my dreams. It was absolutely awesome. All because I was seeking Him in the secret place and asking Him if there was more to this life. That is another thing, we must ask for what we want. The Bible says “You do not have because you do not ask. You ask and do not receive, because you ask with wrong motives, so that you may spend it on your pleasures.” James‬ ‭4:2-3‬. I was asking the Lord for direction in life and more of Him. He showed up. Now we live in Texas and my life has been forever changed since. Without the secret place I would have not had a clue of what was in store for me and my family. I would still be going through the motions of life. Trying to please man more than God. </Text>
            <Text style={styles.normal}>The Lord is yearning to meet with us everyday. The secret place will guide us into His perfect will for our life. It changes everything. The Christian walk can only go so far without it. A vital thing I have learned is that there is always more with God. I will never forget that even when He exceeds your expectations, there is still even more with Him.</Text>
            <Text style={styles.normal}>“You will seek Me and find Me when you search for Me with all your heart.” ‭‭Jeremiah‬ ‭29:13‬</Text>
        </>
    )
}
