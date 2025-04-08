import axios from 'axios';

const API_KEY = '49684805-156d2cdb1a1bccc9916216ec8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Щось пішло не так під час отримання зображень');
  }
}
