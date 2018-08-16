<template>
    <v-layout class="pa-2 fluid" fluid>

        <v-card flat>

            <v-list two-line>

                <transition-group name="fade">
                    <template v-for="(item, index) in posts">
                        <v-list-tile-avatar>
                            {{ item.score }}
                        </v-list-tile-avatar>
                        <v-list-tile
                                :key="index"
                                avatar
                                :to="item.path"
                        >

                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.descendants}} Comments by {{ item.by }} -
                                    <small>{{getDomainName(item.url)}}</small>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </transition-group>
            </v-list>

            <v-btn @click="loadPosts">Load More</v-btn>

        </v-card>

    </v-layout>
</template>

<script>

  import DomainHelpers from '../mixins/DomianHelpers'

  export default {
    name: "hacker-news",
    mixins: [DomainHelpers],
    data() {
      return {
        posts: [],
        currentPosition: 0,
        postsPerLoad: 30
      }
    },
    created() {
      this.loadPosts()
    },
    methods: {

      loadPosts() {
        this.axios.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(response => {
          let postIds = response.data.slice(this.currentPosition, this.currentPosition + this.postsPerLoad)
          postIds.forEach(postId => {
            this.axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`).then(response => {
              this.posts.push({...response.data, path: `/hackernews/post/${postId}`})
            })
          })
          this.currentPosition += this.postsPerLoad
        })
      },

    }
  }
</script>

<style scoped>

</style>