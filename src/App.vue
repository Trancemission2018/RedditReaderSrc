<template>
    <v-app>
        <v-navigation-drawer
                persistent
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app
        >
            <div class="pa-2">

            </div>
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in $store.state.reddit.subs"
                        :key="i"
                        :to="item.path"
                        @click="drawer = false"
                >
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                app
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn
                    icon
                    @click="$router.go(-1)"
            >
                <v-icon >chevron_left</v-icon>
            </v-btn>
            <v-toolbar-title> {{ $store.state.title}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-layout>
                <v-flex xs8></v-flex>
                <v-flex xs4 class="text-xs-right pt-3">

                    <v-select
                            :items="$store.state.reddit.types"
                            v-model="$store.state.reddit.currentType"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-toolbar>
        <v-content id="mainContent">
            <router-view/>
        </v-content>
        <v-footer :fixed="fixed" app :height="48">
            <v-layout class="pa-2">
                <v-flex xs6>
                    <v-btn
                            small
                            class="grey"
                            @click="loadPrevious"
                            :disabled="$store.state.reddit.pages.length === 1"
                    >Previous
                    </v-btn>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                    <v-btn
                            small
                            class="grey"
                            @click="loadNext"
                    >Next
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
  export default {
    data() {
      return {

        postType: 'new',
        clipped: false,
        drawer: false,
        fixed: true,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
      }
    },
    name: 'App',
    mounted() {
    },
    watch: {},
    methods: {
      loadNext() {
        let url = `/reddit/sub/${this.$store.state.route.params.subReddit}?after=${this.$store.state.reddit.currentAfter}`
        this.$store.state.lastScroll = 0
        this.$router.push(url)
      },
      loadPrevious() {
        this.$router.go(-1)
      }
    }
  }
</script>
