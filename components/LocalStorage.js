import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) =>
{
    try
    {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('preferredWhispers', jsonValue)
        console.log('Stored!')
    } catch (e)
    {
        // saving error
    }
}

export const getData = async () =>
{
    try
    {
        const jsonValue = await AsyncStorage.getItem('preferredWhispers')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e)
    {
        // error reading value
    }
}

export const removeValue = async () =>
{
    try
    {
        await AsyncStorage.removeItem('preferredWhispers')
    } catch (e)
    {
        // remove error
    }

    console.log('Done.')
}