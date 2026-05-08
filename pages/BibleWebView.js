import React, { useState } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';

export default function BibleWebView({ route, navigation }) {
    const { url, verse, version } = route.params;
    const [loading, setLoading] = useState(true);

    return (
        <SafeAreaView style={styles.container} forceInset={{ bottom: 'never', top: 'never' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerVerse} numberOfLines={1}>{verse} · {version}</Text>
            </View>

            <WebView
                source={{ uri: url }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                style={styles.webview}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#38fdff" />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#38fdff',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    backButton: {
        marginRight: 12,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    headerVerse: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    webview: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
    },
});
