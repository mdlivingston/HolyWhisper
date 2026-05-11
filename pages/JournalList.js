import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { db } from '../helpers/Firebase';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function JournalList({ navigation }) {
    const { currentUser } = useAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchAllNotes();
        }, [currentUser])
    );

    const fetchAllNotes = async () => {
        setLoading(true);
        try {
            const snap = await db.whisperNotes
                .where('uid', '==', currentUser.uid)
                .get();
            const sorted = snap.docs
                .map(doc => db.formatDoc(doc))
                .sort((a, b) => {
                    const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
                    const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
                    return bTime - aTime;
                });
            setNotes(sorted);
        } catch (e) {
            console.error('Failed to fetch journal:', e);
        }
        setLoading(false);
    };

    const deleteNote = (noteId) => {
        Alert.alert('Delete Entry', 'Are you sure you want to delete this journal entry?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await db.whisperNotes.doc(noteId).delete();
                        setNotes(prev => prev.filter(n => n.id !== noteId));
                    } catch (e) {
                        console.error('Failed to delete note:', e);
                    }
                }
            },
        ]);
    };

    const openNote = (note) => {
        navigation.navigate('JournalNote', {
            whisper: {
                text: note.whisperText,
                verse: note.verse,
                version: note.version,
                category: note.category,
            }
        });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const renderNote = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => openNote(item)} activeOpacity={0.85}>
            <View style={styles.cardHeader}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
            </View>

            <Text style={styles.verseText}>{item.verse} <Text style={styles.versionText}>{item.version}</Text></Text>

            <Text style={styles.notePreview} numberOfLines={3}>{item.note}</Text>

            <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => openNote(item)} style={styles.footerBtn}>
                    <FontAwesomeIcon icon={faEdit} size={14} color="#555" />
                    <Text style={styles.footerBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.footerBtn}>
                    <FontAwesomeIcon icon={faTrash} size={14} color="#e74c3c" />
                    <Text style={[styles.footerBtnText, { color: '#e74c3c' }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#38fdff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderNote}
                contentContainerStyle={notes.length === 0 ? styles.emptyContainer : styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyWrapper}>
                        <FontAwesomeIcon icon={faBook} size={48} color="#ddd" />
                        <Text style={styles.emptyTitle}>Your journal is empty</Text>
                        <Text style={styles.emptySubtitle}>
                            When you receive a whisper, tap the{' '}
                            <Text style={{ fontStyle: 'italic' }}>feather</Text> icon to write what God is saying to you.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    listContent: {
        padding: 14,
    },
    emptyContainer: {
        flex: 1,
        padding: 14,
    },
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#38fdff',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    categoryBadge: {
        backgroundColor: '#e8fffe',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    categoryText: {
        fontSize: 11,
        color: '#00b5b8',
        fontWeight: '600',
    },
    dateText: {
        fontSize: 11,
        color: '#aaa',
        fontStyle: 'italic',
    },
    verseText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    versionText: {
        fontSize: 11,
        fontWeight: 'normal',
        fontStyle: 'italic',
        color: '#777',
    },
    notePreview: {
        fontSize: 14,
        color: '#555',
        lineHeight: 21,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 10,
        gap: 16,
    },
    footerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    footerBtnText: {
        fontSize: 13,
        color: '#555',
    },
});
