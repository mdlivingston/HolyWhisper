import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { db } from '../helpers/Firebase';
import { useAuth } from '../context/AuthContext';

export default function JournalNote({ route, navigation }) {
    const { whisper } = route.params;
    const { currentUser } = useAuth();

    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({ title: whisper.verse });
        fetchNotes();
    }, []);

    useEffect(() => {
        if (!loading && inputRef.current) {
            const timer = setTimeout(() => inputRef.current?.focus(), 100);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const snap = await db.whisperNotes
                .where('uid', '==', currentUser.uid)
                .where('verse', '==', whisper.verse)
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
            console.error('Failed to fetch notes:', e);
        }
        setLoading(false);
    };

    const saveNote = async () => {
        if (!noteText.trim()) return;
        setSaving(true);
        try {
            await db.whisperNotes.add({
                uid: currentUser.uid,
                verse: whisper.verse,
                whisperText: whisper.text,
                version: whisper.version,
                category: whisper.category,
                note: noteText.trim(),
                createdAt: db.getCurrentTimeStamp(),
                updatedAt: db.getCurrentTimeStamp(),
            });
            setNoteText('');
            await fetchNotes();
        } catch (e) {
            console.error('Failed to save note:', e);
        }
        setSaving(false);
    };

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditingText(note.note);
    };

    const saveEdit = async (noteId) => {
        if (!editingText.trim()) return;
        try {
            await db.whisperNotes.doc(noteId).update({
                note: editingText.trim(),
                updatedAt: db.getCurrentTimeStamp(),
            });
            setEditingId(null);
            await fetchNotes();
        } catch (e) {
            console.error('Failed to update note:', e);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText('');
    };

    const deleteNote = (noteId) => {
        Alert.alert('Delete Note', 'Are you sure you want to delete this journal entry?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await db.whisperNotes.doc(noteId).delete();
                        await fetchNotes();
                    } catch (e) {
                        console.error('Failed to delete note:', e);
                    }
                }
            },
        ]);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteCard}>
            <View style={styles.noteHeader}>
                <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
                <View style={styles.noteActions}>
                    {editingId === item.id ? (
                        <>
                            <TouchableOpacity onPress={() => saveEdit(item.id)} style={styles.actionBtn}>
                                <FontAwesomeIcon icon={faCheck} size={16} color="#2ecc71" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancelEdit} style={styles.actionBtn}>
                                <FontAwesomeIcon icon={faTimes} size={16} color="#999" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => startEdit(item)} style={styles.actionBtn}>
                                <FontAwesomeIcon icon={faEdit} size={16} color="#555" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.actionBtn}>
                                <FontAwesomeIcon icon={faTrash} size={16} color="#e74c3c" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
            {editingId === item.id ? (
                <TextInput
                    style={styles.editInput}
                    value={editingText}
                    onChangeText={setEditingText}
                    multiline
                    autoFocus
                />
            ) : (
                <Text style={styles.noteText}>{item.note}</Text>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            {/* Whisper context card */}
            <View style={styles.whisperCard}>
                <Text style={styles.whisperText}>"{whisper.text}"</Text>
                <Text style={styles.whisperVerse}>
                    {whisper.verse} <Text style={styles.whisperVersion}>{whisper.version}</Text>
                </Text>
            </View>

            {/* Notes list */}
            {loading ? (
                <ActivityIndicator style={{ marginTop: 30 }} color="#38fdff" size="large" />
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={item => item.id}
                    renderItem={renderNote}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No journal entries yet.{'\n'}Write what God is saying to you ✍️</Text>
                    }
                />
            )}

            {/* New note input */}
            <View style={styles.inputRow}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="What is God saying to you through this?"
                    placeholderTextColor="#aaa"
                    value={noteText}
                    onChangeText={setNoteText}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.saveBtn, !noteText.trim() && styles.saveBtnDisabled]}
                    onPress={saveNote}
                    disabled={!noteText.trim() || saving}
                >
                    {saving
                        ? <ActivityIndicator color="#000" size="small" />
                        : <Text style={styles.saveBtnText}>Save</Text>
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    whisperCard: {
        backgroundColor: '#fff',
        margin: 14,
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#38fdff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    whisperText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#333',
        lineHeight: 22,
        marginBottom: 8,
    },
    whisperVerse: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#555',
        alignSelf: 'flex-end',
    },
    whisperVersion: {
        fontSize: 11,
        fontStyle: 'italic',
        fontWeight: 'normal',
    },
    listContent: {
        paddingHorizontal: 14,
        paddingBottom: 10,
    },
    noteCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    noteDate: {
        fontSize: 11,
        color: '#aaa',
        fontStyle: 'italic',
    },
    noteActions: {
        flexDirection: 'row',
    },
    actionBtn: {
        marginLeft: 14,
        padding: 2,
    },
    noteText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    editInput: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        borderWidth: 1,
        borderColor: '#38fdff',
        borderRadius: 8,
        padding: 8,
        minHeight: 60,
    },
    emptyText: {
        textAlign: 'center',
        color: '#bbb',
        fontSize: 15,
        marginTop: 40,
        lineHeight: 24,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        minHeight: 44,
        maxHeight: 120,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    saveBtn: {
        backgroundColor: '#38fdff',
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtnDisabled: {
        opacity: 0.4,
    },
    saveBtnText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
});
