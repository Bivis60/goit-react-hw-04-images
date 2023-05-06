const API_KEY = '34475511-5e81bdf830d449013fbfa8a58';

export const GetImages = ({ data, page }) => {
  return fetch(
    `https://pixabay.com/api/?q=${data}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
};
