<template>
  <v-app>
    <div class="apo">
      <v-app-bar app  dark>
        <div class="d-flex align-center">
          <router-link to="/">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="./assets/Logo.png"
              transition="scale-transition"
              width="40"
            />
          </router-link>
          <h2>Forum</h2>
        </div>
        <v-spacer></v-spacer>
        <router-link to="/usersList" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-clipboard-list</v-icon>
              <span class="mr-2">Users list</span>
            </v-btn>
        </router-link>
        <div v-if=!userValidation>
          <router-link to="/login" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-account</v-icon>
              <span class="mr-2">Login</span>
            </v-btn>
          </router-link>
          <router-link to="/register" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-account-plus</v-icon>
              <span class="mr-2">Register</span>
            </v-btn>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-account</v-icon>
              <span class="mr-2">Profile</span>
            </v-btn>
          </router-link>
          <router-link to="/topicList" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-account</v-icon>
              <span class="mr-2">Topics</span>
            </v-btn>
          </router-link>
          <router-link to="/" class="router">
            <v-btn target="_blank" text>
              <v-icon left>mdi-account</v-icon>
              <span class="mr-2">LOGOUT</span>
            </v-btn>
          </router-link>
        </div>
        <div>

        </div>
      </v-app-bar>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  components: {},

  data(){
    return{
      userValidation :false
    }
  },
  methods: {
    home(){
      this.$router.push({path: "/"});
    }
  },
  created(){
    this.$store.subscribe( (mutation) =>{
      if (mutation.type === 'setFlagValidation') {
          if(this.$store.getters['getFlagUserValidation']==true){
            this.userValidation=true;
          }else{
            this.userValidation= false;
          }
      }
    })
  }
};
</script>

<style>

.apo {
  background-image: url("./assets/fondo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.router {
  text-decoration: none;
}

</style>
