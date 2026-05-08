// Maps app version codes → YouVersion numeric ID + URL code
// YouVersion is the only major platform with TPT (Bible Gateway removed it Jan 2022)
const VERSION_MAP = {
    NIV:  { id: 111,  code: 'NIV' },
    ESV:  { id: 59,   code: 'ESV' },
    NLT:  { id: 116,  code: 'NLT' },
    TPT:  { id: 1849, code: 'TPT' },
    AMP:  { id: 1588, code: 'AMP' },
    NASB: { id: 2692, code: 'NASB2020' },
    NKJV: { id: 114,  code: 'NKJV' },
};

// Maps full book names → OSIS abbreviations used by YouVersion
const BOOK_TO_OSIS = {
    // Old Testament
    'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
    'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
    '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
    '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR', 'Nehemiah': 'NEH',
    'Esther': 'EST', 'Job': 'JOB', 'Psalm': 'PSA', 'Psalms': 'PSA',
    'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG',
    'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK',
    'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO',
    'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM',
    'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC',
    'Malachi': 'MAL',
    // New Testament
    'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
    'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
    'Galatians': 'GAL', 'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
    '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI',
    '2 Timothy': '2TI', 'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB',
    'James': 'JAS', '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN',
    '2 John': '2JN', '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV',
};

/**
 * Parses a verse string like "Romans 8:37-39" or "Psalm 119:105" into parts.
 * Returns { book, chapter, verse } or null if it can't be parsed.
 */
function parseVerse(verseString) {
    // Match: optional number prefix + book name + chapter:verse (optional range)
    // e.g. "1 Corinthians 13:4-8", "Psalm 119:105", "John 3:16"
    const match = verseString.trim().match(/^(\d\s)?([A-Za-z\s]+?)\s+(\d+):(\d+)/);
    if (!match) return null;

    const prefix = match[1] ? match[1].trim() : '';
    const bookName = prefix ? `${prefix} ${match[2].trim()}` : match[2].trim();
    const chapter = match[3];
    const verse = match[4];

    return { bookName, chapter, verse };
}

/**
 * Builds a YouVersion URL for a whisper.
 * @param {string} verseString  e.g. "Romans 8:37-39"
 * @param {string} version      e.g. "TPT"
 * @returns {string|null}       full URL or null if unparseable
 */
export function buildBibleUrl(verseString, version) {
    const parsed = parseVerse(verseString);
    if (!parsed) return null;

    const { bookName, chapter, verse } = parsed;
    const osisCode = BOOK_TO_OSIS[bookName];
    if (!osisCode) return null;

    const versionEntry = VERSION_MAP[version] || VERSION_MAP['NIV'];
    const { id, code } = versionEntry;

    return `https://www.bible.com/bible/${id}/${osisCode}.${chapter}.${verse}.${code}`;
}
