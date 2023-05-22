import APIService from './API.js';
import Notiflix from 'notiflix';
const apiService = new APIService();
const refs = {
  submitBtn: document.querySelector('.submit-btn'),
  galleryEl: document.querySelector('.gallery'),
  searchQ: document.querySelector('input'),
  loadMorebnt: document.querySelector('.load-more'),
};
refs.submitBtn.addEventListener('click', newBtnClick);

async function newBtnClick(e) {
  e.preventDefault();
  const value = refs.searchQ.value.trim();
  if (value === '') {
    return Notiflix.Notify.failure('Заповніть поле!');
  }
  apiService.value = value;
  await apiService.fetchData(value).then(data => {
    if (data.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    refs.galleryEl.innerHTML = '';
    markUp(data);
    console.log(apiService.value);
    refs.loadMorebnt.classList.remove('is-hidden');
  });
}

refs.loadMorebnt.addEventListener('click', async e => {
  try {
    e.preventDefault();
    apiService.page++;
    
    const data = await apiService.fetchData();
    if (data.length === 0) {
     
    }
    markUp(data);
  } catch (err) {
     return Notiflix.Notify.info(
       "We're sorry, but you've reached the end of search results."
     );;
  }
});

function markUp(data) {
  refs.galleryEl.insertAdjacentHTML(
    'beforeend',
    data
      .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" width="100%" height="200px" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      Likes: ${likes}
    </p>
    <p class="info-item">
      Views: ${views}
    </p>
    <p class="info-item">
      Comments: ${comments}
    </p>
    <p class="info-item">
      Downloads: ${downloads}
    </p>
  </div>
</div>`;
      })
      .join('')
  );
}
