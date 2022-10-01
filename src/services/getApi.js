import axios from 'axios';

const API_KEY = '28463198-9651460feed0dbf9f7cb6c698';
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getApi = async (page, name) => {
  const response = await axios.get(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;  
};

