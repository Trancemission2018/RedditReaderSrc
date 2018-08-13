export default {

  SET_REDDIT_VIEW(state, viewType) {
    state.reddit.currentType = viewType
  },
  SET_REDDIT_POSTS(state, posts) {
    state.reddit.currentPosts = posts
  },
  SET_FIRST_ID(state, postId) {
    console.log('Setting ID', postId)
    state.reddit.firstId = postId
  },
  SET_LAST_ID(state, postId) {
    state.reddit.lastId = postId
  },
  SET_CURRENT_AFTER(state, postId) {
    state.reddit.currentAfter = postId
  },
  ADD_PAGE(state, postId) {
    state.reddit.pages.push(postId)
  },
  ADD_SEEN_POST(state, postId) {
    state.reddit.seenPosts.push(postId)
  },
  SET_TITLE(state, title) {
    state.title = title
  }
}
