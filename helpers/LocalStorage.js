import AsyncStorage from '@react-native-async-storage/async-storage';

export const allowNotificationKey = 'allowNotification'
export const preferredWhispersKey = 'preferredWhispers'

export const storeData = async (key, value) =>
{
    try
    {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        console.log('Stored!')
    } catch (e)
    {
        // saving error
    }
}

export const storeString = async (key, value) =>
{
    try
    {
        await AsyncStorage.setItem(key, value)
    } catch (e)
    {
        // saving error
    }
}

export const getString = async (key) =>
{
    try
    {
        const value = await AsyncStorage.getItem(key)
        if (value !== null)
        {
            return value
        }
        return null
    } catch (e)
    {
        // error reading value
    }
}

export const getData = async (key) =>
{
    try
    {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e)
    {
        // error reading value
    }
}

export const removeValue = async (key) =>
{
    try
    {
        await AsyncStorage.removeItem(key)
    } catch (e)
    {
        // remove error
    }

    console.log('Done.')
}