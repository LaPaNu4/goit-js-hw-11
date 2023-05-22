const axios = require('axios').default;
class APIService {
  constructor( ) {
    this.API = 'https://pixabay.com/api/';
    this.API_KEY = '36628090-3939a6c61934d7181d416eca1';
    this.value ='';
    this.page = 1;
  }

  async fetchData() {
    const data = await axios.get(
      `${this.API}?key=${this.API_KEY}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    return data.data.hits
  }
}

export default APIService;


