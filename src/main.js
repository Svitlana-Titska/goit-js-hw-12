import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;

document
  .querySelector('.search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();
    query = event.target.elements.query.value.trim();

    if (!query) return;

    clearGallery();
    hideLoadMoreButton();
    page = 1;

    try {
      showLoader();
      const images = await getImagesByQuery(query, page);
      if (images.length === 0) {
        iziToast.error({ title: 'Error', message: 'No images found' });
        hideLoader();
        return;
      }
      createGallery(images);
      showLoadMoreButton();
      hideLoader();
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to load images' });
      hideLoader();
    }
  });

document.querySelector('.load-more').addEventListener('click', async () => {
  page += 1;
  try {
    showLoader();
    const images = await getImagesByQuery(query, page);
    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: "You've reached the end of the results.",
      });
      hideLoadMoreButton();
    } else {
      createGallery(images);
      showLoadMoreButton();
      hideLoader();
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load images' });
    hideLoader();
  }
});

import axios from 'axios';
