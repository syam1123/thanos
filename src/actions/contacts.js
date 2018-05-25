import { thanosRequest, thanosConstants } from 'helpers'

const recieveContacts = (contactsData) => {
  return {
    type: `RECIEVE_USER_DETAILS`,
    contactsData
  }
}

export const getContacts = (data) => {
  return (dispatch) => {
    return thanosRequest.post(thanosConstants.API_SAVE_USER_DETAILS, data)
      .then((res) => {
        dispatch(recieveContacts(res.data))
      })
      .catch((err) => {
        console.log("something went wrong", err);
      })
  }
}
