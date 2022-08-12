import EncryptedStorage from 'react-native-encrypted-storage';
import Service from './service';

export default class EncryptedSharedPreferencesService extends Service {
  static async setItem({key, value}) {
    try {
      await this.model.setItem(key, value);
    } catch (error) {
      return false;
    }
  }

  static async getItem(key) {
    try {
      const session = await this.model.getItem(key);

      if (session !== undefined) {
        return session;
      }
    } catch (error) {
      return false;
    }
  }

  static async removeItem(key) {
    try {
      await this.model.removeItem(key);
    } catch (error) {
      return false;
    }
  }

  static async clearStorage() {
    try {
      await this.model.clear();
    } catch (error) {
      return false;
    }
  }
}

EncryptedSharedPreferencesService.model = EncryptedStorage;
