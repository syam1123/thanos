// API constants
const API_GET_CONTACTS = 'https://firebasestorage.googleapis.com/v0/b/thanos-project.appspot.com/o/jsonData.json?alt=media&token=cf6819c9-09b2-44bc-bf06-5875b3d2cf2a'

const BRACKET_SUCCESS_MAP = [
  'All good!',
  'You are amazing. No errors',
  'Successfully compiled'
]

const sampleCode = '// Enter your code here\n\nif (value){\n   print something \n}'

const bracketErrorMap = {
  '0': 'Error: Opening and closing brackets not matching',
  '1': 'Error: trying to close a bracket that is never opened',
  '2': 'Error: You\'ve forgot to close the bracket'
}

const thanosConstants = {
  API_GET_CONTACTS,
  BRACKET_SUCCESS_MAP,
  sampleCode,
  bracketErrorMap
}

export default thanosConstants;
