import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const baseURL = 'https://pixabay.com/api/';

  const url = baseURL;

  const params = {
    key: '53285847-f778133efdcf1a85bc0bbba3e',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
