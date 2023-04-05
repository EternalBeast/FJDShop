import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/8c9335f3362caed834fe6fecc5bc5629/fjd',
  timeout: 10000
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
