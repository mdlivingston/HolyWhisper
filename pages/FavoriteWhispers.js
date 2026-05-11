import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { db } from '../helpers/Firebase';
import { useAuth } from '../context/AuthContext';

const CATEGORY_COLORS = {
    'Identity':    '#5856d6',
    'Authority':   '#1c3a6b',
    'Healing':     '#4cd964',
    'Father':      '#ff9500',
    'Purpose':     '#00b5b8',
    'Peace':       '#5ac8fa',
    'Gratitude':   '#ffcc00',
    'Word of God': '#ff3b30',
    'Love':        '#ff2d55',
    'Hope':        '#34aadc',
    'Joy':         '#ff9f0a',
    'Purity':      '#bf5af2',
    'Secret Place':'#7b5ea7',
    'Discipline':  '#636366',
};

export default function FavoriteWhispers({ navigation }) {
    const [favoriteWhispers, setFavoriteWhispers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setLoading(true);
            const favs = await db.favoriteWhispers
                .where('uid', '==', currentUser.uid)
                .orderBy('createdAt', 'desc')
                .get();
            setFavoriteWhispers(favs.docs.map(doc => db.formatDoc(doc)));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.fireButton} onPress={() => navigation.navigate('ShowWhisper', {})}>
                    <Image
                        style={styles.blueFire}
                        source={require('../assets/blueFire.gif')}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, favoriteWhispers]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const renderItem = ({ item }) => {
        const color = CATEGORY_COLORS[item.category] || '#38fdff';
        return (
            <TouchableOpacity
                style={[styles.card, { borderLeftColor: color }]}
                onPress={() => navigation.navigate('ShowWhisper', { forcedWhisper: item })}
                activeOpacity={0.75}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.categoryBadge, { backgroundColor: color + '22' }]}>
                        <Text style={[styles.categoryText, { color }]}>{item.category}</Text>
                    </View>
                    <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
                </View>

                <Text style={styles.verseText}>{item.verse}
                    {item.version ? <Text style={styles.versionText}>  {item.version}</Text> : null}
                </Text>

                {item.text ? (
                    <Text style={styles.whisperPreview} numberOfLines={2}>"{item.text}"</Text>
                ) : null}

                <View style={styles.cardFooter}>
                    <Text style={styles.readMore}>Read whisper</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={11} color="#c7c7cc" />
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#38fdff" />
            </View>
        );
    }

    return (
        <FlatList
            style={styles.scroll}
            data={favoriteWhispers}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={
                favoriteWhispers.length === 0 ? styles.emptyContainer : styles.listContent
            }
            ListEmptyComponent={
                <View style={styles.emptyWrapper}>
                    <FontAwesomeIcon icon={faHeart} size={48} color="#ddd" />
                    <Text style={styles.emptyTitle}>No favorites yet</Text>
                    <Text style={styles.emptySubtitle}>
                        Tap the{' '}
                        <Text style={{ fontStyle: 'italic' }}>heart</Text>
                        {' '}on any whisper to save it here.
                    </Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#f2f2f7',
    },
    listContent: {
        padding: 14,
    },
    emptyContainer: {
        flex: 1,
        padding: 14,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f7',
    },
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ccc',
        marginTop: 20,
        marginBottom: 10,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
    },
    dateText: {
        fontSize: 11,
        color: '#aaa',
        fontStyle: 'italic',
    },
    verseText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    versionText: {
        fontSize: 11,
        fontWeight: 'normal',
        fontStyle: 'italic',
        color: '#777',
    },
    whisperPreview: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
        lineHeight: 20,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 10,
        gap: 4,
    },
    readMore: {
        fontSize: 12,
        color: '#c7c7cc',
    },
    fireButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    blueFire: {
        height: 33,
        width: 33,
        resizeMode: 'contain',
        margin: 10,
    },
});
