import hitsTbs from './templates/hits.hbs';
import '../src/styles.css';
import PixabayApiService from './js/pixabay-api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('click', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.query.value;

  if (pixabayApiService.query === '') {
    return alert('Sorry, you need to enter search text');
  }
  pixabayApiService.resetPage();
  pixabayApiService.fetchArticles().then(hits => {
    clearGallery();
    appendHitsMarkup(hits);
  });
}

function onLoadMore() {
  pixabayApiService.fetchArticles().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', hitsTbs(hits));
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
