import AsyncsStorge from '@react-native-async-storage/async-storage';

export const getItemFromAsyncStorage = (key) =>{
    return AsyncsStorge.getItem(key);
}


export const storeInAsyncStorage = (key, value) => {
    return AsyncsStorge.setItem(key, value)
}

export const removeKeyFromAsyncStorage = (key) => {
    return AsyncsStorge.removeItem(key)
}