import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { fetchImage } from './fetchImage';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.loadmoreBtn.style.display = 'none';

let page = 1;
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

refs.submitBtn.addEventListener('click', onSearchClick);
refs.loadmoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchClick(e) {
  e.preventDefault();
  cleanGallery();
  const inputValue = refs.searchFormInput.value.trim();

  if (inputValue === '') {
    return;
  }

  const data = await fetchImage(inputValue, page);
  const { hits, totalHits } = data;

  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  renderPhotoCard(hits);
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  refs.loadmoreBtn.style.display = 'block';
  gallerySimpleLightbox.refresh();
}

function onLoadMoreClick(e) {
  e.preventDefault();
  page += 1;
  const inputValue = refs.searchFormInput.value.trim();
  refs.loadmoreBtn.style.display = 'none';

  fetchImage(inputValue, page).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderPhotoCard(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      refs.loadmoreBtn.style.display = 'block';
    }
  });
}

function renderPhotoCard(photo) {
  const markup = photo
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                  <a href="${largeImageURL}">

                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />

                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b> ${downloads}
                    </p>
                  </div>
                </div>`;
      }
    )
    .join('');
  refs.galleryContainer.innerHTML += markup;
}


function cleanGallery() {
  page = 1;
  refs.galleryContainer.innerHTML = '';
  refs.loadmoreBtn.style.display = 'none';
}
