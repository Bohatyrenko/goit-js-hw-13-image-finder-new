const KEY = '21301662-4ef0ce252e11badb1c1b3b876';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(({ hits }) => {
        // console.log(data);
        this.incrementPage();
        return hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
