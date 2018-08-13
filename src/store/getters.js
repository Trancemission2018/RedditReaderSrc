export default {

  haveSeenPost: (state) => (postId) => {
    console.log('have we seen this post', postId, state)
    return state.reddit.seenPosts.includes(postId)
  }

}
