import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faLock, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

export default function Account({ navigation }) {
    const { currentUser, createAccount, signIn, resetPassword, logout } = useAuth();

    const [mode, setMode] = useState('create'); // 'create' | 'signin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [busy, setBusy] = useState(false);

    const isAnonymous = currentUser?.isAnonymous;

    const friendlyError = (e) => {
        if (e.code === 'auth/email-already-in-use') return 'That email is already in use. Try signing in instead.';
        if (e.code === 'auth/invalid-email') return 'That email address is not valid.';
        if (e.code === 'auth/weak-password') return 'Password should be at least 6 characters.';
        if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') return 'Incorrect email or password.';
        if (e.code === 'auth/user-not-found') return 'No account found with that email.';
        return e.message;
    };

    const onCreate = async () => {
        if (!email.trim() || !password) return Alert.alert('Missing Info', 'Please enter an email and password.');
        if (password !== confirm) return Alert.alert('Passwords Don\'t Match', 'Please make sure both passwords match.');
        setBusy(true);
        try {
            await createAccount(email.trim(), password);
            Alert.alert('Account Created! 🎉', 'All your whispers, favorites, and journal entries are now saved to your account. Sign in on any device to access them.');
            navigation.goBack();
        } catch (e) {
            Alert.alert('Could Not Create Account', friendlyError(e));
        }
        setBusy(false);
    };

    const onSignIn = async () => {
        if (!email.trim() || !password) return Alert.alert('Missing Info', 'Please enter your email and password.');
        setBusy(true);
        try {
            await signIn(email.trim(), password);
            Alert.alert('Welcome Back! 🙏', 'You are signed in. All your data has been restored.');
            navigation.goBack();
        } catch (e) {
            Alert.alert('Could Not Sign In', friendlyError(e));
        }
        setBusy(false);
    };

    const onForgotPassword = async () => {
        if (!email.trim()) return Alert.alert('Enter Email', 'Type your email above first, then tap Forgot Password.');
        try {
            await resetPassword(email.trim());
            Alert.alert('Email Sent', 'Check your inbox for a password reset link.');
        } catch (e) {
            Alert.alert('Error', friendlyError(e));
        }
    };

    const onSignOut = () => {
        Alert.alert('Sign Out', 'You\'ll be switched to a fresh guest session on this device. Your account data stays safe in the cloud.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
        ]);
    };

    // ── Signed-in (permanent account) view ──
    if (!isAnonymous && currentUser) {
        return (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <View style={styles.heroIcon}>
                    <FontAwesomeIcon icon={faUser} size={36} color="#fff" />
                </View>
                <Text style={styles.heroTitle}>You're all set!</Text>
                <Text style={styles.heroSub}>Your whispers are synced to your account.</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={[styles.iconWrap, { backgroundColor: '#34aadc' }]}>
                            <FontAwesomeIcon icon={faEnvelope} size={15} color="#fff" />
                        </View>
                        <Text style={styles.rowLabel}>Email</Text>
                        <Text style={styles.rowValue}>{currentUser.email}</Text>
                    </View>
                    <View style={[styles.row, styles.rowLast]}>
                        <View style={[styles.iconWrap, { backgroundColor: '#4cd964' }]}>
                            <FontAwesomeIcon icon={faCloud} size={15} color="#fff" />
                        </View>
                        <Text style={styles.rowLabel}>Data Sync</Text>
                        <Text style={[styles.rowValue, { color: '#4cd964', fontWeight: '600' }]}>Active ✓</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.signOutBtn} onPress={onSignOut}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    // ── Anonymous (guest) view: create account or sign in ──
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

                <View style={styles.heroIcon}>
                    <FontAwesomeIcon icon={faCloud} size={36} color="#fff" />
                </View>
                <Text style={styles.heroTitle}>
                    {mode === 'create' ? 'Save Your Whispers' : 'Welcome Back'}
                </Text>
                <Text style={styles.heroSub}>
                    {mode === 'create'
                        ? 'Create a free account and your favorites, journal entries, and preferences will follow you to any device.'
                        : 'Sign in to restore your favorites, journal entries, and preferences on this device.'}
                </Text>

                {/* Mode toggle */}
                <View style={styles.toggleWrap}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === 'create' && styles.toggleActive]}
                        onPress={() => setMode('create')}
                    >
                        <Text style={[styles.toggleText, mode === 'create' && styles.toggleTextActive]}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === 'signin' && styles.toggleActive]}
                        onPress={() => setMode('signin')}
                    >
                        <Text style={[styles.toggleText, mode === 'signin' && styles.toggleTextActive]}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.card}>
                    <View style={styles.inputRow}>
                        <FontAwesomeIcon icon={faEnvelope} size={15} color="#8e8e93" />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#c7c7cc"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                        />
                    </View>
                    <View style={[styles.inputRow, mode === 'signin' && styles.rowLast]}>
                        <FontAwesomeIcon icon={faLock} size={15} color="#8e8e93" />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#c7c7cc"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    {mode === 'create' && (
                        <View style={[styles.inputRow, styles.rowLast]}>
                            <FontAwesomeIcon icon={faLock} size={15} color="#8e8e93" />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                placeholderTextColor="#c7c7cc"
                                value={confirm}
                                onChangeText={setConfirm}
                                secureTextEntry
                            />
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={[styles.primaryBtn, busy && { opacity: 0.5 }]}
                    onPress={mode === 'create' ? onCreate : onSignIn}
                    disabled={busy}
                >
                    {busy
                        ? <ActivityIndicator color="#000" />
                        : <Text style={styles.primaryBtnText}>{mode === 'create' ? 'Create My Account' : 'Sign In'}</Text>}
                </TouchableOpacity>

                {mode === 'signin' && (
                    <>
                        <TouchableOpacity onPress={onForgotPassword}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                        <Text style={styles.signinNote}>
                            Note: anything saved on this device as a guest won't carry over when you sign in to an existing account.
                        </Text>
                    </>
                )}

                {mode === 'create' && (
                    <Text style={styles.keepNote}>
                        ✓ Everything you've already saved as a guest stays with you — nothing is lost.
                    </Text>
                )}

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#f2f2f7',
    },
    content: {
        paddingTop: 28,
        paddingBottom: 60,
        paddingHorizontal: 16,
        alignItems: 'stretch',
    },
    heroIcon: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: '#38fdff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        shadowColor: '#38fdff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1c1c1e',
        textAlign: 'center',
        marginBottom: 8,
    },
    heroSub: {
        fontSize: 14,
        color: '#8e8e93',
        textAlign: 'center',
        lineHeight: 21,
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    toggleWrap: {
        flexDirection: 'row',
        backgroundColor: '#e5e5ea',
        borderRadius: 10,
        padding: 3,
        marginBottom: 20,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    toggleActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8e8e93',
    },
    toggleTextActive: {
        color: '#1c1c1e',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5ea',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1c1c1e',
        paddingVertical: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5ea',
        minHeight: 52,
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    iconWrap: {
        width: 30,
        height: 30,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
        color: '#1c1c1e',
    },
    rowValue: {
        fontSize: 14,
        color: '#8e8e93',
    },
    primaryBtn: {
        backgroundColor: '#38fdff',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    forgotText: {
        textAlign: 'center',
        color: '#007aff',
        fontSize: 14,
        marginBottom: 16,
    },
    signinNote: {
        fontSize: 12,
        color: '#8e8e93',
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 16,
    },
    keepNote: {
        fontSize: 13,
        color: '#4cd964',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 19,
        paddingHorizontal: 16,
    },
    signOutBtn: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 8,
    },
    signOutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff3b30',
    },
});
