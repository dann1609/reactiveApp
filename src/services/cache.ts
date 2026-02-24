import storageService from "./storage";

export async function cachedApiFacade<T>(key: string, apiCall: () => Promise<T>, defaultValue: T) {
    return apiCall().then((data) => {
        storageService.setItem(key, data);
        return data;
    }).catch((error) => {
        console.error(error);
        return storageService.getItem<T>(key).then((cachedData) => {
            return cachedData || defaultValue;
        })
    })
}