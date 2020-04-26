<template>
  <v-container class="containerRegister">
    <h1>Join us</h1>
    <form>
      <div class="contentRegister">
        <v-text-field
          class="name"
          v-model="name"
          :error-messages="nameErrors"
          label="Name"
          required
          prepend-inner-icon="mdi-account"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          class="lastName"
          v-model="lastName"
          :error-messages="lastNameErrors"
          label="LastName"
          prepend-inner-icon="mdi-account"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
      </div>
      <div class="contentRegister">
        <v-text-field
          class="email"
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          prepend-inner-icon="mdi-email"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show3 ? 'text' : 'password'"
          class="password"
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          prepend-inner-icon="mdi-key"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @click:append="show3 = !show3"
        ></v-text-field>
      </div>
      <br>
      <div class="buttons">
        <v-btn class="mr-4" @click="submit">REGISTER</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </div>
    </form>
    <br>
    <v-alert v-if="success" type="success">Succes Register</v-alert>
    <v-alert v-if="failure" type="error">Something wrong, they already exist an user associated whit this mail!</v-alert>
  </v-container>
  
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required },
      email: { required, email },
      lastName: { required },
      password:{required, minLength: minLength(5) }
    },

    data () {
      return {
        name: '',
        email: '',
        lastName: '',
        password: '',
        show3: false,
        success: false,
        failure: false,
        errors:[]
      }
    },

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last Name is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('The password must have more than five characters')
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()     
        var payload={
          name: this.email,
          lastName: this.lastName,
          email: this.email,
          password: this.password
          
        }
        this.$store.dispatch('registerUser',payload)
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
    created(){
    this.$store.subscribe( (mutation) =>{
      if (mutation.type === 'setFlagRegister') {
          if(this.$store.getters['getFlagUserRegister']==true){
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

.containerRegister {
  margin-top: 13.5%;
  background-color: rgba(255, 255, 255, .7);
  border-radius: 7px;
  padding: 3%;
  width: 50%;
}

.contentRegister {
  display: inline-block;
  width: 100%;
}

.name, .lastName, .email, .password{
  width: 45%;
}

.name, .email {
  float: left;
}

.lastName, .password {
  float: right;
}

h1, form {
  text-align: center;
}

.buttons {
  margin-top: 2%;
}

</style>