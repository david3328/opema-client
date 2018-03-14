<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="$router.replace('/admin/areas')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Areas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.replace('/admin/orders')">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Pedidos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.replace('/admin/new-order')">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Nuevo Pedido</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logOut()">
          <v-list-tile-action>
            <v-icon color="red">clear</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="red--text">Cerrar Sesión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Administrador</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container >
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    methods:{
      logOut(){
        swal({
          title: 'Estás seguro?',
          text: "Cerrarás sesión!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cerrar sesión!',
          cancelButtonText: 'No, cancelar!'
        }).then((result) => {
          if (result.value) {
            window.localStorage.removeItem('Opema-Token')
            this.$router.replace('/login')
          }
        })
      }
    }
  }
</script>

<style>

</style>
