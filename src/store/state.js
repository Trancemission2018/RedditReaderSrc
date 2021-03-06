export default {

  title: 'MyHome',
  lastScroll: 0,
  reddit: {
    currentSub: null,
    currentType: 'new',
    types: [
      {
        value: 'new', text: 'New'
      }, {
        value: 'hot', text: 'Hot'
      }
    ],
    currentPosts: [],
    currentAfter: null,
    seenPosts: [],
    history: [],
    pages: [],
    firstId: null,
    lastId: null,
    subs: [
      {
        name: 'CasualUk',
        path: '/reddit/sub/CasualUk'
      },
      {
        name: 'Factorio',
        path: '/reddit/sub/factorio'
      },
      {
        name: 'BritishSuccess',
        path: '/reddit/sub/BritishSuccess'
      },
      {
        name: 'BritishProblems',
        path: '/reddit/sub/BritishProblems'
      },
      {
        name: 'Vue',
        path: '/reddit/sub/VueJs'
      },
      {
        name: 'Javascript',
        path: '/reddit/sub/Javascript'
      },
      {
        name: 'WebDev',
        path: '/reddit/sub/webdev'
      },
      // Add reddits here.
    ]

  }
}
