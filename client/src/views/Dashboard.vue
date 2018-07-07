<template>
  <v-app>
    <v-toolbar app fixed>
      <v-icon>fas fa-edit</v-icon>
      <v-toolbar-title>My To-Do List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click.stop="dialog = true">Add To Do</v-btn>
      <v-btn flat color="error" @click="signout">Sign Out</v-btn>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h2>New To Do</h2>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="edit" label="to do" type="text" v-model="todo"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addToDo">Add To Do</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center row wrap>
          <v-flex xs12 lg5 md4>
            <div class="text-xs-center">
              <v-avatar size="125px">
                <img
                  class="img-circle elevation-7 mb-1"
                  src="https://vignette.wikia.nocookie.net/naginoasukara/images/8/86/Placeholder_person.png/revision/latest?cb=20130924151342"
                >
              </v-avatar>
              <div class="headline"><span style="font-weight:bold">{{ profile.name }}</span></div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">{{ profile.email }}</div>
            </div>
          </v-flex>
          <v-flex xs12 lg5 md4>
            <h2 text-md-center>To Do List</h2>
            <v-expansion-panel>
              <v-expansion-panel-content v-for="(item,i) in list" :key="i">
                <div slot="header" :class="item.status">{{ item.todo }}</div>
                <v-card>
                  <v-card-actions>
                    <v-card-text>Status: {{ item.status }}</v-card-text>
                    <v-spacer></v-spacer>
                    <div v-if="item.status == 'unfinished'">
                      <v-btn flat small color="primary" @click="editToDo(item._id)">Mark as Finished</v-btn>
                    </div>
                    <div v-else>
                      <v-btn flat small color="primary" @click="editToDo(item._id)">Mark as UnFinished</v-btn>
                    </div>
                    <v-btn flat small color="error" @click="deleteToDo(item._id)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      profile: {},
      todo: '',
      dialog: false
    }
  },
  computed: {
    list () {
      return this.$store.state.list
    }
  },
  methods: {
    addToDo () {
      this.dialog = false
      this.$store.dispatch('addDataToDB', {todo: this.todo})
      this.todo = ''
    },
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('status')
      window.FB.logout(function (response) {
      })
      this.$router.push('/')
    },
    editToDo (id) {
      this.$store.commit('editToDo', id)
      this.$http.post('https://user-api.roarized.com/api/validateuser', {}, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          if (response.data.message === 'silahkan lanjut') {
            this.$http.put(`https://todofancy.roarized.com/list/edit/${id}`)
              .then(response => {
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteToDo (id) {
      this.$http.post('https://user-api.roarized.com/api/validateuser', {}, {
        headers: {token: localStorage.getItem('token')}
      })
        .then(response => {
          if (response.data.message === 'silahkan lanjut') {
            this.$store.dispatch('removeDataFromDB', id)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.$http.get('https://user-api.roarized.com/api/readone', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(response => {
        this.profile = response.data.data
      })
      .catch(err => {
        console.log(err)
      })
    this.$store.dispatch('addDataFromDB')
  }
}
</script>

<style>
.dashboard .navbar a {
  color: white;
}
.container {
  padding-top: 50px;
}
.finished {
  text-decoration: line-through;
}
</style>
