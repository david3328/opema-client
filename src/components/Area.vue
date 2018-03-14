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
              <v-btn icon ripple @click="dialog=true;oldArea=Object.assign({}, area);titleDialog='Actualizar Area'">
                <v-icon color="green lighten-1">edit</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon ripple @click="deleteArea(area)">
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
import swal from 'sweetalert2'
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
    this.getAreas()
  },
  methods:{
    execDialog(){
      this.dialog=false;
      if(this.oldArea._id){

        fetch('http://localhost:3000/api/areas/'+this.oldArea._id,{
          method:'put',
          headers:{
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('Opema-Token')
          },
          body: JSON.stringify(this.oldArea)
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.success){
            swal(
              'Actualizado!',
              'Se actualizo correctamente',
              'success'
            )
            this.getAreas()
          }else{
             swal(
              'Error!',
              `Error: ${res.message} : ${res.error.errmsg}`,
              'error'
            )
          }
        })
      }else{
        fetch('http://localhost:3000/api/areas',{
          method:'post',
          headers:{
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('Opema-Token')
          },
          body: JSON.stringify(this.oldArea)
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.success){
            swal(
              'Añadido!',
              'Agregado correctamente',
              'success'
            )
            this.getAreas()
          }else{
            swal(
              'Error!',
              `Error: ${res.message} : ${res.error.errmsg}`,
              'error'
            )
          }
        })
      }
    },
    getAreas(){
      fetch('http://localhost:3000/api/areas',{
        method:'get',
        headers:{
          'authorization':localStorage.getItem('Opema-Token')
        }
      })
      .then(res=>res.json())
      .then(data=>this.areas=data)
    },
    deleteArea(area){
      swal({
        title: 'Estás seguro?',
        text: `Eliminaras el área: ${area.name}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!'
      }).then((result) => {
        if (result.value) {
          fetch('http://localhost:3000/api/areas/'+area._id,{
            method:'delete',
            headers:{
              'Content-Type': 'application/json',
              'authorization':localStorage.getItem('Opema-Token')
            },
          })
          .then(res=>res.json())
          .then(res=>{
            if(res.success){
              swal(
                'Eliminado!',
                'Se ha eliminado!',
                'success'
              )
              this.getAreas()
            }else{  
              swal(
                'Error!',
                `Error: ${res.message}`,
                'error'
              )
            }
          })
          
        }
      })
    }
  }
}
</script>

<style>

</style>
