import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const findCountriesEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onInputInput = event => {
    const country = event.target.value.trim();
    fetchCountries(country)
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

findCountriesEl.addEventListener('input', debounce(onInputInput, DEBOUNCE_DELAY));



