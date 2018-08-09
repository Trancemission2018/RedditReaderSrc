<template>
    <div>


        <v-list-tile
                avatar
                @click="loadPost(post)"
        >
            <v-list-tile-avatar>
                {{ post.data.score }}
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ post.data.title }} -
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
    }, methods: {
      loadPost(item) {
        console.log('Loading post')
        this.$emit('loadPost', item)
      },
    }
  }
</script>
