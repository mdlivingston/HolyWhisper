import Share from 'react-native-share';

export const ShareWhisper = async (shareOptions) =>
{
    const shareResponse = await Share.open(shareOptions).catch((e) => console.log(e));
}