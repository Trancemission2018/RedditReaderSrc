<template>


    <div>

        <v-layout class="pa-2">

            <div v-if="loading">Loading.........</div>

            <v-card v-if="!loading" flat>

                <v-list two-line>
                    <post-row
                            v-for="(item, index) in posts"
                            :key="index" @loadPost="loadPost"
                            :post="item"
                    />
                </v-list>
            </v-card>
        </v-layout>

        <v-layout>
            <v-flex xs6 class="px-2">
                <v-btn
                        small
                        color="grey"
                        @click="previous"
                >Prev
                </v-btn>
            </v-flex>
            <v-flex xs6
                    class="text-xs-right px-2"
            >
                <v-btn
                        small
                        color="grey"
                        @click="next"
                >Next
                </v-btn>

            </v-flex>
        </v-layout>

    </div>

</template>

<script>

  import axios from 'axios'
  import PostRow from "./PostRow"

  export default {
    name: "reddit",
    components: {PostRow},
    props: ['subreddit'],
    data() {
      return {
        loading: true,
        posts: [],
        firstId: null,
        lastId: null,
        history: {
          urls: [],

        }
      }
    }
    ,
    mounted() {
      console.log('Ok load posts for ', this.$store.state.route.params.subReddit)
      this.loadPosts('start')

    },
    watch: {
      '$store.state.reddit.currentType'() {
        console.log('Reload post pls', this.$store.state.reddit.currentType)
        this.loadPosts('start')
      },
      '$store.state.route.params'() {
        this.loadPosts('start')

      }
    },
    methods: {
      loadPosts(fromWhere) { // TODO This is very WET :/

        let subReddit = this.$store.state.route.params.subReddit

        this.$store.state.title = subReddit

        switch (fromWhere) {

          case 'start':

            let endPoint = ''
            switch (this.$store.state.reddit.currentType) {
              case 'new':
                endPoint = `https://old.reddit.com/r/${subReddit}/new/.json`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                })
                break
              default:
                endPoint = `https://old.reddit.com/r/${subReddit}/.json`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                })
                break

            }
            break
          case 'after':

            switch (this.$store.state.reddit.currentType) {
              case 'new':
                endPoint = `https://old.reddit.com/r/${subReddit}/new/.json?after=${this.lastId}`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                  this.scrollTop()
                })
                break
              default:
                endPoint = `https://old.reddit.com/r/${subReddit}/.json?after=${this.lastId}`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                  this.scrollTop()
                })
                break
            }
            break
          case 'before':

            switch (this.$store.state.reddit.currentType) {
              case 'new':
                endPoint = `https://old.reddit.com/r/${subReddit}/new/.json?before=${this.firstId}`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                  this.scrollTop()
                })
                break
              default:
                endPoint = `https://old.reddit.com/r/${subReddit}/.json?before=${this.firstId}`
                axios.get(endPoint).then(response => {
                  this.posts = response.data.data.children
                  let lastPostNum = this.posts.length - 1
                  this.lastId = this.posts[lastPostNum].data.name
                  this.firstId = this.posts[0].data.name
                  this.loading = false
                  this.scrollTop()
                })
                break
            }
            break

        }
      },
      next() {
        console.log('Last ID is ', this.$store.state.reddit.lastId)
        this.loadPosts('after')
      },
      previous() {
        console.log('First ID is ', this.$store.state.reddit.firstId)
        this.loadPosts('before')
      },
      loadPost(post) {
        let subReddit = this.$store.state.route.params.subReddit
        this.$router.push(`/reddit/post/${subReddit}/${post.data.id}`)

      },
      scrollTop() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
      }
    }
  }
</script>

