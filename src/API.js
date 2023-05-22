const axios = require('axios').default;
class APIService {
  constructor() {
    const API = 'https://pixabay.com/api/';
    const API_KEY = '36628090-3939a6c61934d7181d416eca1';
    this.value = value;
    let page = 1;
  }

  async fetchData(value) {
    const data = await axios.get(
      `${API}?key=${API_KEY}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
  }
}

export default APIService;
