import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { getData, preferredWhispersKey, storeData } from '../helpers/LocalStorage';
import { categories } from '../helpers/Randomizer';

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

export default function PreferredWhispers() {
    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() => {
        const asyncFunc = async () => {
            let storage = await getData(preferredWhispersKey)
            if (!storage) await storeData(preferredWhispersKey, [])
            setSelectedIds(await getData(preferredWhispersKey))
        }
        asyncFunc()
    }, [])

    async function changeSelectedId(id) {
        const idIndex = selectedIds.findIndex(t => t === id)
        const tempSelected = [...selectedIds];
        if (idIndex > -1) tempSelected.splice(idIndex, 1)
        else tempSelected.push(id)
        setSelectedIds(tempSelected)
        await storeData(preferredWhispersKey, tempSelected)
    }

    async function clickAll() {
        if (selectedIds.length > 0) {
            await storeData(preferredWhispersKey, [])
            setSelectedIds([])
        }
    }

    const isAllSelected = !selectedIds || selectedIds.length < 1;

    return (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

            <Text style={styles.subtitle}>
                Choose which categories you'd like to receive whispers from. Selecting none will include all categories.
            </Text>

            {/* All option */}
            <View style={styles.card}>
                <TouchableOpacity
                    style={[styles.row, styles.rowLast]}
                    onPress={clickAll}
                    activeOpacity={0.6}
                >
                    <View style={[styles.dot, { backgroundColor: '#38fdff' }]} />
                    <Text style={[styles.label, isAllSelected && styles.labelBold]}>All Categories</Text>
                    {isAllSelected && (
                        <FontAwesomeIcon icon={faCheck} size={15} color="#38fdff" />
                    )}
                </TouchableOpacity>
            </View>

            {/* Category list */}
            <Text style={styles.sectionHeader}>CATEGORIES</Text>
            <View style={styles.card}>
                {categories.map((c, i) => {
                    const isSelected = selectedIds && selectedIds.findIndex(s => s === c) > -1;
                    const isLast = i === categories.length - 1;
                    return (
                        <TouchableOpacity
                            key={c}
                            style={[styles.row, isLast && styles.rowLast]}
                            onPress={() => changeSelectedId(c)}
                            activeOpacity={0.6}
                        >
                            <View style={[styles.dot, { backgroundColor: CATEGORY_COLORS[c] || '#aaa' }]} />
                            <Text style={[styles.label, isSelected && styles.labelBold]}>{c}</Text>
                            {isSelected && (
                                <FontAwesomeIcon icon={faCheck} size={15} color="#38fdff" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Text style={styles.footerText}>
                {isAllSelected
                    ? 'Receiving whispers from all categories.'
                    : `Receiving from ${selectedIds.length} categor${selectedIds.length === 1 ? 'y' : 'ies'}.`}
            </Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#f2f2f7',
    },
    content: {
        paddingTop: 16,
        paddingBottom: 50,
        paddingHorizontal: 16,
    },
    subtitle: {
        fontSize: 13,
        color: '#8e8e93',
        marginBottom: 20,
        lineHeight: 19,
        marginLeft: 4,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8e8e93',
        letterSpacing: 0.5,
        marginBottom: 8,
        marginTop: 24,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e5e5ea',
        minHeight: 52,
    },
    rowLast: {
        borderBottomWidth: 0,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 14,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#1c1c1e',
    },
    labelBold: {
        fontWeight: '600',
    },
    footerText: {
        textAlign: 'center',
        color: '#c7c7cc',
        fontSize: 12,
        marginTop: 24,
    },
});
