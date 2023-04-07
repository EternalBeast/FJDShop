import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/8c9335f3362caed834fe6fecc5bc5629/fjd',
  baseURL: 'http://localhost:3000',
  withCredentials: true, // 允许跨域传递 cookie
  timeout: 10000
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.data.errno === 10003) {
        localStorage.removeItem('isLogin')
        location.href = 'http://localhost:8080/#/login'
      }
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.data.errno === 10003) {
        localStorage.removeItem('isLogin')
        location.href = 'http://localhost:8080/#/login'
      }
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
      if (response.data.errno === 10003) {
        localStorage.removeItem('isLogin')
        location.href = 'http://localhost:8080/#/login'
      }
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
