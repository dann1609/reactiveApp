import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from '../config/environment';

export enum StorageKey {
}

class StorageService {
  constructor(private readonly storageKey = environment.services.storage.key) { }

  async setItem<T, K extends string = string>(key: K, value: T): Promise<void> {
    return AsyncStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  async getItem<T, K extends string = string>(key: K): Promise<T | null> {
    const data = await AsyncStorage.getItem(this.getKey(key));
    return data == undefined ? (data as null) : (JSON.parse(data) as T);
  }

  async removeItem<K extends string = string>(key: K): Promise<void> {
    await AsyncStorage.removeItem(this.getKey(key));
  }

  async removeItems<K extends string = string>(keys: K[]): Promise<void> {
    await AsyncStorage.multiRemove(keys.map((key) => this.getKey(key)));
  }

  async getAllKeys<K extends string = string>(): Promise<K[]> {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((key) => key.startsWith(this.storageKey))
      .map((key) => key.replace(this.storageKey, '')) as K[];
  }

  private getKey(key: string): string {
    return `${this.storageKey}::${key}`;
  }
}

export default new StorageService();