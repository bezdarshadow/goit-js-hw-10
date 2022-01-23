import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import allCountries from './templates/all-countries.hbs';
import currentCountry from './templates/current-country.hbs';

const DEBOUNCE_DELAY = 300;

const findCountriesEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


const onInputInput = event => {
    const country = findCountriesEl.value.trim();
    if(country === ''){
        countriesListEl.innerHTML = "";
        countryInfoEl.innerHTML = "";
        return;
    }
    fetchCountries(country)
    .then(data => {
        console.log(data)
        if(data.length <= 10 && data.length >= 2){
            countryInfoEl.innerHTML = "";
            countriesListEl.innerHTML = allCountries(data);    
        } else if (data.length === 1) {
            countriesListEl.innerHTML = "";
            countryInfoEl.innerHTML = currentCountry(data);
        } else if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
    })
    .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryInfoEl.innerHTML = "";
        countriesListEl.innerHTML = "";
    })
};

findCountriesEl.addEventListener('input', debounce(onInputInput, DEBOUNCE_DELAY));



