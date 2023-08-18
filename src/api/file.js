import fetch from "./axios";
import axios from 'axios';

export const selectFileListByFileCategory = (params) => {
  return fetch({
    url: 'base/selectFileListByFileCategory',
    method: 'get',
    params
  })
}

export const download = (params) => {
  return fetch({
    url: 'base/download',
    method: 'get',
    responseType: 'blob',
    params
  })
}

export const uploadSingleForeignId = (params) => axios.post(`base/uploadSingleForeignId`, params)

export const uploadBatchForeignId = (params) => axios.post(`base/uploadBatchForeignId`, params)