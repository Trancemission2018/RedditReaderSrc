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
      this.loadPosts()

    },
    watch: {
      '$store.state.reddit.currentType'() {

      },
      '$route': function (newRoute, oldRoute) {

        let subReddit = this.$store.state.route.params.subReddit

        switch (this.$store.state.reddit.currentType) {
          case 'new':
            let endPoint = `https://old.reddit.com/r/${subReddit}/new/.json?after=${newRoute.query.after}`

            axios.get(endPoint).then(response => {
              this.posts = response.data.data.children
              window.scroll({top: this.$store.state.lastScroll, left: 0, behavior: 'smooth'})
              // this.scrollTop()
            })

            break
        }
      },
    },
    route: {
      canReuse: true,
    },
    methods: {
      loadPosts() { // TODO This is very WET :/

        let subReddit = this.$store.state.route.params.subReddit
        this.$store.state.title = subReddit

        let afterQ = ''

        if (this.$store.state.route.query && this.$store.state.route.query.after) {
          afterQ = `?after=${this.$store.state.route.query.after}`

        }


        console.log('We are loading!')
        let endPoint = ''
        switch (this.$store.state.reddit.currentType) {
          case 'new':
            endPoint = `https://old.reddit.com/r/${subReddit}/new/.json${afterQ}`

            break
          default:
            endPoint = `https://old.reddit.com/r/${subReddit}/.json${afterQ}`
            break
        }

        axios.get(endPoint).then(response => {
          this.posts = response.data.data.children
          this.loading = false
        })

        window.scroll({top: this.$store.state.lastScroll, left: 0, behavior: 'smooth'})

      },
      next() {

        let lastPostNum = this.posts.length - 1
        this.lastId = this.posts[lastPostNum].data.name

        this.$store.state.reddit.pages.push(this.lastId)

        this.$router.push({
          path: this.$store.state.route.params.subReddit,
          query: {after: this.lastId}
        })

      },
      previous() {
        this.loadPosts('before')
      },
      loadPost(post) {
        this.$store.state.lastScroll = window.scrollY // This is useless as I cannot get the scroll to work anyways :/
        let subReddit = this.$store.state.route.params.subReddit
        this.$router.push(`/reddit/post/${subReddit}/${post.data.id}`)

      },
      scrollTop() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
      }
    }
  }
</script>

