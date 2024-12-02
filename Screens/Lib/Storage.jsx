import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // save error
    }

    console.log('Done.')
}

export const getStorageData = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        // read error
    }

    console.log('Done.')
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}

export const removeItemFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}
