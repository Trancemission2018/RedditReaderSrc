<template>
    <div>
        {{comment.text}}
        <hr />
        <hacker-comment v-for="comment in comments" :comment="comment"/>
        <!--
        Include comment
        <pre>
        {{ comment }}
        </pre>
        -->

    </div>

</template>

<script>
  export default {
    name: "hacker-comment",
    components: {},
    props: ['comment'],
    data() {
      return {
        comments: []
      }
    },
    created() {
      this.loadKids()
    },
    methods: {
      loadKids() {
          this.axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.comment.id}.json`).then(response => {
            this.comments.push(response.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>