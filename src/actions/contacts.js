import { thanosRequest, thanosConstants } from 'helpers'

const recieveContacts = (contactsData) => {
  return {
    type: `RECIEVE_USER_DETAILS`,
    contactsData
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
