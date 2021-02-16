/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import
{
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';

import
{
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFire, faCog } from '@fortawesome/free-solid-svg-icons'

export default function App()
{
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.center}>
                <TouchableOpacity style={styles.settingsIcon} >
                    <FontAwesomeIcon size={20} icon={faCog} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Alert.alert('Simple Button pressed')}
                >

                    <Text style={styles.lightText}>
                        <FontAwesomeIcon size={20} style={styles.lightText} icon={faFire} /> &nbsp;
                        Add Whisper
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>


                    <Header />
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Step One</Text>
                            <Text style={styles.sectionDescription}>
                                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>See Your Changes</Text>
                            <Text style={styles.sectionDescription}>
                                <ReloadInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Debug</Text>
                            <Text style={styles.sectionDescription}>
                                <DebugInstructions />
                            </Text>
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Learn More</Text>
                            <Text style={styles.sectionDescription}>
                                Read the docs to discover what to do next:
                        </Text>
                        </View>
                        <LearnMoreLinks />
                    </View>
                </ScrollView>
            </SafeAreaView> */}
        </>
    );
};

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'red'
    },
    button: {
        alignItems: "center",
        // backgroundColor: Colors.dark,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        justifyContent: 'center'
    },
    lightText: {
        fontSize: 20
        // color: 'white',
    },
    settingsIcon: {
        position: 'absolute',
        top: 70,
        right: 20
    }
});


