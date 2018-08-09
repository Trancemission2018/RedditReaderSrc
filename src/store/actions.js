import Api from '../api'

export default {

  loadPosts({commit, state}, after ) {
    return new Promise((resolve, reject) => {

      let subReddit = state.route.params.subReddit
      let section = state.reddit.currentType

      state.title = subReddit

      Api.getPosts(subReddit, section, after).then(posts => {


        let lastPostNum = posts.children.length - 1

        this.commit('SET_REDDIT_POSTS', posts.children)
        this.commit('SET_FIRST_ID', posts.children[0].data.name)
        this.commit('SET_LAST_ID', posts.children[lastPostNum].data.name)
        this.commit('SET_CURRENT_AFTER', posts.children[lastPostNum].data.name)
        this.commit('ADD_PAGE', posts.children[0].data.name)

        resolve()
      }).catch(error => reject(error))
    })
  }


}
