import axios from 'axios';

const axiosIns = axios.create({
    baseURL: 'https://burger-builder-9de3a.firebaseio.com/',
})

export default axiosIns;