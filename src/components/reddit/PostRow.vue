<template>
    <div>


        <v-list-tile
                avatar
                @click="loadPost"
        >
            <v-list-tile-avatar>
                {{ post.data.score }}
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title><span :class="{'post-title-bold': !$store.getters.haveSeenPost(post.data.id)}">{{ post.data.title }}</span> -
                    <small>{{post.data.domain}}</small>
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ post.data.num_comments}} Comments</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </div>
</template>
<script>
  export default {
    name: 'post-row',
    props: {
      post: {}
    },
    mounted() {
      console.log(this.$store.getters.haveSeenPost(this.post.data.id))
    },
    computed: {
      postUrl() {
      }
    },
    methods: {
      loadPost() {
        this.$store.state.lastScroll = window.scrollY
        this.$router.push(`/reddit/post/${this.$store.state.route.params.subReddit}/${this.post.data.id}`)
      },
    }
  }
</script>

<style>
    .post-title-bold {
        font-weight: bold;
    }
</style>
