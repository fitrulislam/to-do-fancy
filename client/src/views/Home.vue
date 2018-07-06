<template>
  <v-app id="inspire">
    <v-parallax src="https://i.imgur.com/ZYLhhXf.jpg" height="650">
      <v-content>
        <v-container fluid fill-height>
          <v-layout column align-center justify-center>
            <v-flex xs12 sm6 md4>
              <v-card class="transparent">
                <v-card-text text-xs-left>
                  <h1>Ever forget what you want to do?</h1>
                  <h3>This app can help you to list your own task <br> so you will never forget what you want to do</h3>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="cyan" style="color: white;" @click="toLogin">Get Started</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-parallax>
  </v-app>
</template>

<script>

export default {
  name: 'home',
  methods: {
    toLogin () {
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>
.colorWhite {
  color: white;
}
</style>
