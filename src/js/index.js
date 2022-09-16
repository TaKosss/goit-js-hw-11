import axios from "axios";
import SimpleLightbox from "simplelightbox"
import Notiflix from 'notiflix'
import 'simplelightbox/dist/simple-lightbox.min.css'
import { refs } from "./refs";
import { fetchImg } from './fetchImg'

refs.loadmoreBtn.style.display = 'none'

let page = 1
let gallerySimpleLigthbox = new SimpleLightbox('.gallery a')

refs.submitBtn.addEventListener('click', onSearchBtn)
refs.loadmoreBtn.addEventListener('click', onLoadBtn)

function onSearchBtn(e) { 
    e.preventDefault()
    cleanGallery()
    const inputValue = refs.searchFormInput.value.trim()
    if (inputValue !== '') {
        fetchImg(inputValue).then(foundData => {
            if (foundData.length === 0) {
                  Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
            } else {
                renderPhotoCard(foundData)
                  Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
                refs.loadmoreBtn.style.display = 'block'
                gallerySimpleLigthbox.refresh()
            }
        })
    }
}

function onLoadBtn(e) {
    e.preventDefault()
    page++
    const inputValue = refs.searchFormInput.value.trim()
    refs.loadmoreBtn.style.display = 'none'
        fetchImg(inputValue, pageNumber).then(foundData => {
            if (foundData.hits.length === 0) {
                Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
            } else {
                renderPhotoCard(foundData.hits)
                Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
                refs.loadmoreBtn.style.display = 'block'
            }
        })
    

}


function renderPhotoCard(photo) {
    const markup = photo
    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
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
                </div>`
    }).join('') 
    refs.galleryContainer.innerHTML += markup
}

// function onCatchError() {
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
// }
// function searchSuccess() {
//      Notiflix.Notify.success(`Hooray! We found ${foundData.totalHits} images.`)
// }
    
function cleanGallery() {
  refs.galleryContainer.innerHTML = '';
  page = 1;
  refs.loadmoreBtn.style.display = 'none';
}

