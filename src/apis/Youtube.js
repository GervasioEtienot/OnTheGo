import axios from 'axios';

const KEY = 'AIzaSyCbQ8FgcsEUVDOu1QKpuAHBaCEa7oR7i6g';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
});