import { thanosRequest, thanosConstants } from 'helpers'

export const recieveContacts = (contactsData) => {
  return {
    type: `RECIEVE_USER_DETAILS`,
    contactsData
  }
}

export const recieveImages = (images) => {
  return {
    type: `RECIEVE_IMAGES`,
    images
  }
}

export const getContacts = (data) => {
  return (dispatch) => {
    return thanosRequest.get(thanosConstants.API_GET_CONTACTS, data)
      .then((res) => {
        dispatch(recieveContacts(res.data))
      })
      .catch((err) => {
        console.log("something went wrong", err);
      })
  }
}

const imagesUrl=  (query) => `https://www.googleapis.com/customsearch/v1?cx=007266624843193050590:pgnzl3oz9ms&q=${query}&key=AIzaSyCJl12QQJjjJjhK0Q0mTs6O-aEKZgCbvG8&searchType=image`

export const getImages = (query) => {
  return (dispatch) => {
    return thanosRequest.get(imagesUrl(query))
      .then((res) => {
        dispatch(recieveImages(res.data))
      })
      .catch((err) => {
        console.log("something went wrong", err);
      })
  }
}
