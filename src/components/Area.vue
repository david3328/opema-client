<template>
  <v-layout row>
    <v-dialog v-model="dialog"  max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{titleDialog}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Número de Area" v-model="oldArea.number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md8>
                <v-text-field label="Nombre o descripción" v-model="oldArea.name" required></v-text-field>
              </v-flex>                  
            </v-layout>
          </v-container>
          <small class="red--text">(*) Los campos son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
          <v-btn color="green darken-1" flat @click.native="execDialog()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs12 sm4>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Areas</v-toolbar-title>
          <v-spacer></v-spacer>          
          <v-btn icon dark @click="dialog=true;oldArea={};titleDialog='Agregar Area'">
            <v-icon>add</v-icon>
          </v-btn>          
        </v-toolbar>
        <v-list>
          <v-list-tile avatar v-for="area in areas" :key="area._id" >
            <v-list-tile-content>
              <v-list-tile-title>{{area.number}} - {{area.name}}</v-list-tile-title>                     
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="dialog=true;oldArea=area;titleDialog='Actualizar Area'">
                <v-icon color="green lighten-1">update</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="red lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data(){
    return{
      dialog:false,
      titleDialog:'',
      areas:[],
      oldArea:{}
    }
  },
  mounted(){
    fetch('http://localhost:3000/api/areas')
    .then(res=>res.json())
    .then(data=>this.areas=data)
  },
  methods:{
    execDialog(){
      this.dialog=false;
      if(this.oldArea._id){
        console.log("actualizar")
      }else{
        console.log("nuevo")
      }
    }
  }
}
</script>

<style>

</style>
