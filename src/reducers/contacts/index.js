const initialState = {};

export default function images (state = initialState, action) {
  switch (action.type) {
    case `RECIEVE_USER_DETAILS`:
      return action.contactsData
    case `RECIEVE_IMAGES`:
      return action.images
    default :
      return state;
  }

}
