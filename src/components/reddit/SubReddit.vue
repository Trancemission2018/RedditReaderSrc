<template>

    <div>

        <v-layout class="a-2" fluid>

            <v-flex xs12>

                <div class="text-xs-center pt-4" v-if="loading">
                    <v-progress-circular
                            indeterminate
                            color="primary"
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>

        <v-layout class="a-2" fluid>

            <v-card flat v-if="!loading">
                <v-list two-line>
                    <post-row
                            v-for="(item, index) in $store.state.reddit.currentPosts"
                            :key="index"
                            :post="item"
                    />
                </v-list>
            </v-card>
        </v-layout>
    </div>

</template>

<script>
  import * as easings from 'vuetify/es5/util/easing-patterns'
  import PostRow from "./PostRow"

  export default {
    name: "",
    components: {PostRow},
    props: [],
    mounted() {
      if (this.$route.query.after) {
        this.loadPosts(this.$route.query.after)
      } else {
        this.loadPosts(null)
      }
    },
    data() {
      return {
        loading: true
      }
    },
    watch: {
      '$store.state.route.params.subReddit'() {
        this.$store.state.lastScroll = 0
        this.$store.state.reddit.currentAfter = null
        this.$store.state.reddit.pages = []
        this.loadPosts(null)
      },
      '$route'(to, from) {
        console.log(to)
        if (to.query.after) {
          this.loadPosts(to.query.after)
        } else {
          this.loadPosts(null)
        }
      },
      '$store.state.reddit.currentType'() {
        this.$store.state.lastScroll = 0
        this.$store.state.reddit.currentAfter = null
        this.$store.state.reddit.pages = []
        this.loadPosts(null)
      }
    },
    methods: {
      loadPosts(after) {
        this.loading = true
        this.$store.state.reddit.currentPosts = []
        this.$store.dispatch('loadPosts', after).then(response => {
          this.loading = false
          console.log('Scrolling to', this.$store.state.lastScroll)
          setTimeout(() => {
            this.$vuetify.goTo(this.$store.state.lastScroll, {
              duration: 300,
              offset: 0,
              easing: 'easeInOutCubic',
              easings: Object.keys(easings)
            }).then(() => {
            })
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>