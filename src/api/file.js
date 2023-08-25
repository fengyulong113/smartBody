import fetch from "./axios";
import axios from 'axios';

export const selectFileListByFileCategory = (params) => {
  return fetch({
    url: `${baseIp}/selectFileListByFileCategory`,
    method: 'get',
    params
  })
}

export const download = (params) => {
  return fetch({
    url: `${baseIp}/download`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

export const uploadSingleForeignId = (params) => axios.post(`${baseIp}/uploadSingleForeignId`, params)

export const uploadBatchForeignId = (params) => axios.post(`${baseIp}/uploadBatchForeignId`, params)