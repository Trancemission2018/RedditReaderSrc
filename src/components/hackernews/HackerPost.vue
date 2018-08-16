<template>

    <v-container fluid>
        <v-layout>
            <v-flex>
                <div class="main-title">{{ post.title}}
                </div>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex class="text--grey">
                <small><strong>{{post.descendants}} comments</strong></small>
            </v-flex>
            <v-flex class="text--grey">
            </v-flex>
            <v-flex class="text-xs-right">
                {{ post.by }}
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <!-- TODO need to refactor this - the request for comments is ASYNC - I never had this issue before. -->
                <hacker-comment v-for="comment in comments" :comment="comment"/>
            </v-flex>

        </v-layout>

        <v-layout>
            <pre>
                {{ post }}
            </pre>
        </v-layout>
    </v-container>

</template>

<script>
  import HackerComment from "./HackerComment"

  export default {
    name: "",
    components: {HackerComment},
    props: [],
    data() {
      return {
        post: {},
        comments: []
      }
    },
    created() {
      this.loadPost()
    },
    methods: {
      loadPost() {
        console.log('Load post')
        this.axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.$route.params.postId}.json`).then(response => {
          this.post = response.data
          console.log('Lopaded', this.post)
          console.log('Reeponse', this.post.kids)
          let totalKids = this.post.kids.length
          let comments = []
          this.post.kids.forEach(commentId => {
            this.axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then(response => {
              comments.push(response.data)
              if (comments.length === totalKids) {
                this.comments = this.sortByKey(comments, 'time')
                console.log(this.comments.length)
              }
            })
          })
        })
      },
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key]
          let y = b[key]
          return ((x < y) ? -1 : ((x > y) ? 1 : 0))
        })
      },
    }
  }
</script>

<style scoped>

    .main-title {
        font-weight: bold
    }

</style>