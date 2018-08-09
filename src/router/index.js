import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/pages/Start'
import RedditPost from '@/components/pages/RedditPost'
import SubReddit from '@/components/reddit/SubReddit'
import HackerTop from '@/components/hackernews/HackerTop'

Vue.use(Router)

export default new Router({
  history: true,
  scrollBehavior (to, from, savedPosition) {
    return !savedPosition ? { x: 0, y: 0 } : savedPosition
  },
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/reddit/sub/:subReddit/:section?',
      name: 'Reddit Sub',
      component: SubReddit
    },
    {
      path: '/reddit/post/:subReddit/:postId',
      name: 'Reddit Post',
      component: RedditPost
    },
    {
      path: '/hackernews',
      name: 'Hacker News',
      component: HackerTop
    },

  ]
})
