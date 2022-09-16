const KEY = '29971148-c945d30420d20d2baba09e6a1'
const BASE_URL = `https://pixabay.com/api/?key=${KEY}`

// import axios from "axios"
const axios = require('axios').default;

// export async function fetchImg(searchQuery, pageNr) {
//   try {
//     const response = await axios.get(`${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40page=${pageNr}`);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

export function fetchImg(searchQuery, pageNr) {

  axios.get(`${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40page=${pageNr}`)
    .then(response => {
      photos = response.data.hits;
    })
    }
