import fetch from "./axios";
import axios from 'axios';

export const selectFileListByFileCategory = (params) => {
  return fetch({
    url: 'api/selectFileListByFileCategory',
    method: 'get',
    params
  })
}

export const download = (params) => {
  return fetch({
    url: 'api/download',
    method: 'get',
    responseType: 'blob',
    params
  })
}

export const uploadSingleForeignId = (params) => axios.post(`api/uploadSingleForeignId`, params)

export const uploadBatchForeignId = (params) => axios.post(`api/uploadBatchForeignId`, params)