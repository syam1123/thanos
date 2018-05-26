import axios from 'axios'

const request = (method, url, data) => {
  let req = axios,
    reqObj = {}

  reqObj.method = method
  reqObj.url = url
  if (data) reqObj.data = data

  reqObj = appendHeaders(reqObj)

  return axios(reqObj)
}

/*
  Add headers to the request
  Future use
 */
function appendHeaders (req) {
  return req
}

const thanosRequest = {
  get (url) {
    return request('get', url)
  },
  post (url, data) {
    return request('post', url, data)
  },
  put (url, data) {
    return request('put', url, data)
  }
}

export default thanosRequest
