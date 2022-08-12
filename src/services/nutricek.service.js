import axios from 'axios';
import Service from './service';
import EncryptedSharedPreferencesService from './encrypted-shared-preferences.service';

const nutricek = axios.create({
  baseURL: 'https://nutricek-backend.herokuapp.com',
});

nutricek.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

const generateAccessToken = async () => {
  return await EncryptedSharedPreferencesService.getItem('accessToken');
};

export default class NutricekService extends Service {
  static async signup(data) {
    return await this.model.post('/signup', data);
  }

  static async signin(data) {
    const {data: response} = await this.model.post('/signin', data);
    return response;
  }

  static async getAllFoodNutrition() {
    const accessToken = await generateAccessToken();

    return await this.model.get('/food-nutrition', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static async addFood(formData) {
    const accessToken = await generateAccessToken();
    return await this.model.post('/food-nutrition', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static async deleteFood(idFood) {
    const accessToken = await generateAccessToken();
    return await this.model.delete(`/food-nutrition/${idFood}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

NutricekService.model = nutricek;
