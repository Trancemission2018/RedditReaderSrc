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
    history: [],
    pages: [],
    firstId: null,
    lastId: null,
    subs: [
      {
        name: 'Hacker News',
        path: '/hackernews'
      },
      {
        name: 'CasualUk',
        path: '/reddit/sub/CasualUk'
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