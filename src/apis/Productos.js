import axios from 'axios';

// const KEY = 'AIzaSyCbQ8FgcsEUVDOu1QKpuAHBaCEa7oR7i6g';

export default axios.create({
    // baseURL: 'http://testshop.onthego.com.ar/shop',
    baseURL: 'http://149.56.237.70/shop',
    params: {
        
        maxResults: 9,
        // key: KEY
    }
});