import axios from 'axios';

const APIUrl = axios.create({
  baseURL: 'https://opentdb.com',
});

export default APIUrl;
