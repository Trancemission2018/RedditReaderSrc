const axios = require('axios')

const Reddit = axios.create({ // TODO move to config file
  baseURL: 'https://old.reddit.com'
})

export default {

  getPosts(subReddit, section, after) {
    let endPoint = `/r/${subReddit}/${section}/.json`
    if (after) {
      endPoint += `?after=${after}`
    }
    return new Promise((resolve, reject) => {
      Reddit.get(endPoint).then(response => {
        console.log('We have some posts from ', response)
        resolve(response.data.data)
      }).catch(error => reject(error))
    })
  }

}
