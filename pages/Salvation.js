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
export default function Salvation()
{
    return (
        <ScrollView style={styles.scroll}>
            <Text style={styles.title}>Salvation in Jesus Christ</Text>
            <Text style={styles.text}>If you have not surrendered your life to Jesus, and you would like to make Him both Lord and Savior (Acts 2:36) of your life today, here is a short guide to help you do so.</Text>
            <Text style={styles.text}>Every person has sinned and come short of the glory of God (Romans 3:23). Sin entered into the world through one man- Adam, and death was the result of sin; therefore death spread to all men because all mankind has sinned (Romans 5:12). Sin is missing the mark- the mark of the perfect holiness, righteousness, and wholeness of God. This results in separation from God, which ends in death to our soul and spirit (Romans 6:23).</Text>
            <Text style={styles.text}>Since every man is born with a sinful nature, Father God sent His son, Jesus, to the world to save (rescue, deliver, restore) anyone who would believe in Him and call on His name (John 3:16; Romans 10:13). Why did He do this? Because He loves the people whom He created and does not want anyone to perish by being separated from Him (2 Peter 3:9). He offers eternal, abundant life.</Text>
            <Text style={styles.text}>When we believe in Jesus as the Son of God who died in place of us for our sin and was resurrected by the power of God, He gives us a new life (Romans 10:9; John 3:5-6; 1 Peter 1:23). We are born again, not into another sinful nature but into the nature of God (2 Corinthians 5:17). Just as Jesus died, we die to our nature of sin; and just as Jesus was resurrected from the dead into a new life, we are resurrected into a new life with a new nature of righteousness (Romans 6:4). It’s nothing you can do in your own strength or your own works; the Holy Spirit of God does this work in you (Titus 3:4-5).</Text>
            <Text style={styles.text}>If you have been living in your sin nature and have not yet been born again into the new nature of Jesus Christ, today is your day (2 Corinthians 6:2)! God is not ashamed of you for anything you’ve done. He knows you have been living in an old identity and He wants to reclaim you as His child and give you an eternal inheritance of life and life abundantly (John 10:10) through His son Jesus. You, like the people who heard the first message of salvation in Christ, might be asking, what should I do to be saved (Acts 2:37-38)? The answer is simple:</Text>
            <Text style={styles.numbered}>1. Realize you were born into sin and cannot be a friend of God as a sinner. (Romans 1:20; Romans 3:23)</Text>
            <Text style={styles.numbered}>2. Acknowledge that it’s only through faith in the death and resurrection of Jesus Christ that you can be saved and have eternal life with God. (Romans 4:24-25; John 14:6; John 3:16)</Text>
            <Text style={styles.numbered}>3. Respond to this amazing free gift of eternal life by turning from any sin you have, putting your faith and dependence in Jesus, and following Him as the Lord of your life. (Acts 3:19)</Text>
            <Text style={styles.numbered}>4. You can say a simple prayer to God that will mark this day and allow you to begin a relationship with him today! It’s not the prayer that saves you, it’s the person you are speaking to that saves you: Jesus, thank you for loving me so much that you proved I’m worth dying for. Thank you, Father, for raising Him up from the dead so that I can have eternal life with you. Today I make you my Lord (the ruler and complete authority of my life) and Savior (the one who saved me from my sin and death). Holy Spirit of Jesus, I invite you into my life as a friend, and I ask you to change me from the inside out so I can live my whole life for you from this day forward. Amen. </Text>
            <Text style={styles.title}>Next steps:</Text>
            <Text style={styles.numbered}>1. Receive the baptism in the Holy Spirit. This is a free gift, and it is given to you by Jesus. He wants to put His Spirit in you, so that your Spirit can become one with His spirit (Matthew 3:11). Luke 24:49 explains the baptism in the Holy Spirit as being clothed with heavenly power. When the believers in the early church received the baptism in the Holy Spirit, it came with evidence- speaking in new tongues/ heavenly languages, wind, what appeared to be fire, restoration of sight from blindness, worship, and prophecy. See Acts 2:1-6; Acts 8:14-19; Acts 9:17-19; Acts 10:44-48; Acts 19:1-6. Jesus says that this gift will be given to anyone who asks, so it’s as easy as asking for it (Luke 11:13): Jesus, I want to receive the gift of the Holy Spirit. Please baptize me in your Holy Spirit today. Amen. </Text>
            <Text style={styles.numbered}>2. Find a local church to do life with. (Hebrews 10:25; Acts 2:42)</Text>
            <Text style={styles.numbered}>3. Be water baptized as a symbol of what Jesus has done for you (Acts 2:38). You have died to your old sin nature and have been raised up, born again into a new life in Christ.</Text>
            <Text></Text>
        </ScrollView>
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
    }
});