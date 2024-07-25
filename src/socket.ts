import axios from 'axios';


const URL = "https://virusq.tech/api/v1";

export const client = axios.create({
    baseURL: URL,
  });