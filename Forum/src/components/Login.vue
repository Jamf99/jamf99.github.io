<template>
  <v-container class="containerLogin">
    <h1>Login</h1>
    <form>
      <v-text-field
          class="emailLogin"
          type="email"
          v-model="email"
          
          label="E-mail"
          required
          prepend-inner-icon="mdi-email"
      ></v-text-field>
      <v-text-field
          class="passwordLogin"
          type="password"
          v-model="password"
         
          label="Password"
          prepend-inner-icon="mdi-key"
          required
          @click:append="show3 = !show3"
      ></v-text-field>
      <div class="buttonsLogin">
        <v-btn class="mr-4" @click="checkForm">LOGIN</v-btn>
      </div>
    </form>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </p>
    <br>
    <v-alert v-if="success" type="success">Succes login</v-alert>
    <v-alert v-if="failure" type="error">Password or email wrong, please check if is correctly</v-alert>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      email:null,
      password: null,
      errors:[],
      success: false,
      failure: false
    }
  },
  methods:{
    checkForm:function(e){
      this.success= false
      this.failure= false
      this.errors=[]
      if(!this.email){
        this.errors.push("Email is required!");
      }
      else if(!this.validEmail(this.email)){
        this.errors.push("Valid email from is required!");
      }
      if(!this.password){
        this.errors.push("Password is required!");
      }
      if(this.email && this.password){
        var payload={
          email: this.email,
          password: this.password
        }
        // this.$store.dispatch('validateUser',payload)
        this.$store.dispatch('validateUser',payload)
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  created(){
    this.$store.subscribe( (mutation) =>{
      if (mutation.type === 'setFlagValidation') {
          if(this.$store.getters['getFlagUserValidation']==true){
              this.success=true
              this.failure=false
          }else{
              this.success=false
              this.failure=true
          }
      }
    })
  }
}
</script>

<style>

.containerLogin {
  margin-top: 13.5%;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 7px;
  padding: 3%;
  width: 30%;
}

.buttonsLogin {
  padding-top: 5%;
}

</style>