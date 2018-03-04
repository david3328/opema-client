<template>
    <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="user.username" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="user.password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signIn" >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import swal  from 'sweetalert2'
export default {
  data(){
    return{
      user:{}
    }
  },
  methods:{
    signIn(){     
      if(this.user.username && this.user.password){        
        fetch('http://localhost:3000/api/users/auth', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user)
        }) 
        .then(res=>res.json()) 
        .then(res=>{
          if(res.success){
            //Guardar Token en LocalStorage y redireccionar
            window.localStorage.setItem('Opema-Token',res.token);
            this.$router.replace('/admin')
          }else{
            //Mostrar mensaje de error
            swal(
              'Error',
              `Error: ${res.message}`,
              'error'
            )
          }
        }) 
      }else{
        //Enviar alerta de datos vacíos,
        swal(
          'Error!',
          'Error: Los datos deben estar completos',
          'error'
        )
      }
    }
  }
}
</script>

<style>

</style>
