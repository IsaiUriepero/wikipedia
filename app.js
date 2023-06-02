const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const formDOM = document.querySelector('.form');
const inputDOM = document.querySelector('.form-input');
const resultsDOM = document.querySelector('.results');

const showError = (message) => resultsDOM.innerHTML = `<div class="error"> ${message} </div>`;
const showLoading = () => resultsDOM.innerHTML = '<div class="loading"></div>';

formDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = inputDOM.value.trim();

  if (value) {
    fetchPages(value);
  } else {
    showError('Please enter a valid search term.');
  }
});

const fetchPages = async (searchValue) => {
  showLoading();

  try {
    const response = await fetch(`${url}${searchValue}`);
    const { query: { search: results } } = await response.json();

    if (results && results.length > 0) {
      renderResults(results);
    } else {
      showError('No matching results. Please try again.');
    }
  } catch (error) {
    showError('There was an error...');
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map(({ title, snippet, pageid }) =>
      `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
         <h4>${title}</h4>
         <p>${snippet}</p>
       </a>`)
    .join('');

  resultsDOM.innerHTML = `<div class="articles">${cardsList}</div>`;
};
