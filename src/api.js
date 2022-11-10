import request from 'superagent' ///library for making api requests - only need the url and params

//external API
const freeOpenDictionaryURL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export function getPhonetics(word = '') {
  const requestUrl = `${freeOpenDictionaryURL}/${word}` ///makes a concatenation of url and specific word being search in the api's db
  return request /// this is an async function (request is the promise)
    .get(requestUrl)
    .then((response) => {
      if (response.body[0].phonetic) {
        return response.body[0].phonetic //Promise <string> (datatype)
      }
      //fallback: sometimes phonetic spelling does not exist as property but can be found in phonetics array. Quirky API!
      if (
        !!response.body[0].phonetics &&
        response.body[0].phonetics.length > 1
      ) {
        const phoneticData = response.body[0].phonetics.find((el) => !!el.text)
        return phoneticData ? phoneticData.text : 'No result found' //ternary return data if it exists else return 'no result found'
      }
      return 'No result found.' //should all fail - this will display on page!
    })
    .catch((err) => {
      alert(err)
    })
}
