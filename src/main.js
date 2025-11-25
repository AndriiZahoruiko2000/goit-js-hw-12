// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoaderBtn,
  loadBtn,
  showLoader,
  showLoaderBtn,
} from './js/render-functions';

const form = document.querySelector('.js-search-photo');
let page = 1;
let totalPages = 0;
let perPage = 15;
let query;

//!================================================

form.addEventListener('submit', async e => {
  e.preventDefault();

  clearGallery();
  hideLoaderBtn();
  showLoader();

  const formData = new FormData(form);
  query = formData.get('query');

  if (!query.trim()) {
    hideLoader();
    return iziToast.warning({
      position: 'topRight',
      message: 'Please enter something to search!',
    });
  }

  page = 1;
  try {
    const response = await getImagesByQuery(query, page);

    if (response.totalHits === 0) {
      hideLoader();
      hideLoaderBtn();
      return iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    totalPages = Math.ceil(response.totalHits / perPage);

    createGallery(response.hits);
    checkEndOfPage();
  } catch {
    hideLoaderBtn();
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong',
    });
  }
  hideLoader();

  form.reset();
});

//!================================================
hideLoader();
//!================================================
loadBtn.addEventListener('click', async e => {
  page += 1;
  showLoader();

  try {
    const response = await getImagesByQuery(query, page);

    createGallery(response.hits);
    checkEndOfPage();
    scrollPage();
  } catch {
    hideLoaderBtn();
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong',
    });
  }
  hideLoader();
});
//!================================================

function checkEndOfPage() {
  if (page >= totalPages) {
    hideLoaderBtn();
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoaderBtn();
  }
}
//!================================================

function scrollPage() {
  let elem = document.querySelector('.gallery-item');
  let rect = elem.getBoundingClientRect();
  console.log(rect);
  let heightOfElem = rect.height * 2;
  scrollBy({ top: heightOfElem, behavior: 'smooth' });
}
