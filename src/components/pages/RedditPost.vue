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

        <v-container v-if="!loading">
            <div class="postTitle mb-2"><strong>{{ post.title }}</strong>
                - <span class="teal pa-1">{{ post.author }}</span>
            </div>
            <img v-if="isImage" :src="imageUrl" width="500"/>
            <span v-html="post.content"/>
            <hr/>

            <div class="pa-2 mb-2">
                {{post.url }}
                <a :href="post.url" target="_blank">
                    <v-icon small>link</v-icon>
                </a>
            </div>
            <span
                    v-html="comments"
            ></span>
        </v-container>
    </div>

</template>

<script>

  import axios from 'axios'

  export default {
    name: "reddit-post",
    components: {},
    props: [],
    data() {
      return {
        post: {},
        comments: [],
        links: [],
        loading: false,
        rootComments: [],
        depth: 0,
        currentAuthor: null,
        url: '',
        isImage: false,
        imageUrl: '',
      }
    },
    mounted() {

      let postId = this.$route.params.postId

      this.loading = true

      axios.get('https://old.reddit.com/r/' + this.$route.params.subReddit + '/' + postId + '/.json').then(response => {

        this.post = response.data[0].data.children[0].data
        this.currentAuthor = this.post.author

        if (this.post.url !== '') {
          console.log('URL ', this.parseUrl(this.post.url)) // TODO refactor - this has side effects
        }

        let contentHtml = this.decodeHTMLEntities(this.post.selftext_html) // .replace(/(?:\r\n|\r|\n)/g, '<br>') // TODO - decode html?

        this.post.content = contentHtml.replace(/href/g,' target="_blank" href')



        this.comments = this.getCommentsFromArray(response.data[1].data.children)

        if (!this.$store.state.reddit.seenPosts.includes(postId)) {
          this.$store.commit('ADD_SEEN_POST', postId)
        }

        this.loading = false

      })
    },
    methods: {
      getCommentsFromArray: function (arr) {

        let text = ''

        arr.forEach(item => {
          if (typeof item !== 'undefined') {

            if (item.data.depth === 0) {
              text += '<div class="pa-1 grey lighten-3 mb-3">'
            } else {
              text += '<div class="pa-1 white">'

            }
            console.log('In Loop', item)
            text += `
                    <div class="">
            `
            if (this.currentAuthor === item.data.author) {
              text += `<b><span class="teal pa-1">${this.currentAuthor}</span></b>`
            } else {
              text += `<b>${item.data.author}</b>`

            }
            text += `
                    ${item.data.ups}</div>
                    ${this.decodeHTMLEntities(item.data.body_html)}
                    </div>`

            if (typeof item.data.replies !== 'undefined' && item.data.replies !== '') {
              this.depth++
              let indent = this.depth * 10
              text += `<div style="padding-left: ${indent}px"> ${this.getCommentsFromArray(item.data.replies.data.children)}</div>`
            } else {
              this.depth = 0
            }
          }
        })
        return text
      },
      decodeHTMLEntities(text) {

        if (text) {

          let entities = {
            'amp': '&',
            'apos': '\'',
            'lt': '<',
            'gt': '>',
            'quot': '"',
            'nbsp': '\xa0'
          }
          let entityPattern = /&([a-z]+);/ig

          // A single replace pass with a static RegExp is faster than a loop
          return text.replace(entityPattern, function (match, entity) {
            entity = entity.toLowerCase()
            if (entities.hasOwnProperty(entity)) {
              return entities[entity]
            }
            // Might as well return the original string if there is no matching entity (no replace)
            // This *should* work.
            return match
          })
        } else {
          // No Text
          return ''
        }
      },
      parseUrl(url) {
        let pattern = new RegExp('^https?:\/\/(.*)\/(.*)$', 'i')

        let urlMatch = url.match(pattern)


        let fileExt = url.split('.').pop()
        console.log('Ext', fileExt)
        this.imageUrl = ''
        switch (fileExt) {
          case 'png':
          case 'jpg':
          case 'jpeg':
            this.isImage = true
            this.imageUrl = url
            break
        }

        if (!this.isImage) {

          this.url = urlMatch[1]
          if (this.url.match(/imgur/)) {
            this.getImageFromImgur(url)
            this.isImage = true
          } else {
            this.url = ''
          }
        }
      },
      getImageFromImgur(url) {
        axios.get(`http://localhost:9000/imgur/image?url=${url}`).then(response => {
          this.imageUrl = response.data.url
        })
      },
    }
  }
</script>

<style scoped>

    .postTitle {
        font-weight: bold;
    }

</style>