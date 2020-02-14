import axios from 'axios';

// const KEY = 'AIzaSyCbQ8FgcsEUVDOu1QKpuAHBaCEa7oR7i6g';

export default axios.create({
    baseURL: 'http://testshop.onthego.com.ar/shop',
    params: {
        part: 'data',
        maxResults: 9,
        // key: KEY
    }
});