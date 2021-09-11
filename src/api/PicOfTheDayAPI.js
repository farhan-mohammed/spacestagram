import axios from 'axios';

const PicOfTheDayAPI = axios.create({
    baseURL: 'https://api.nasa.gov/',
    url: '/planetary/apod',
    params: { api_key: 'I9n2pCAkE00TAIrDjVhlNgtCU0lT6h3mwr7CkT2f' },
});

export default PicOfTheDayAPI;
