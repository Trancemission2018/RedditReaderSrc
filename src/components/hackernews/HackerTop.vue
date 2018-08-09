<template>
    <v-container fluid>
        Here we will have all the latest news, from hacker news!
    </v-container>

</template>

<script>
  export default {
    name: "",
    components: {},
    props: [],
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      this.$store.state.title = 'Hacker News'

    },
    methods: {}
  }
</script>

<style scoped>

</style>