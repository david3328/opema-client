<template>
 <v-card>
    <v-card-title>
      <span class="headline">Nuevo Pedido</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field label="# Pedido" required v-model="order.number"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field label="Tipo" required v-model="order.type"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field label="COD POI" required v-model="order.codpoi"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field label="COD PODIHMA" required v-model="order.codpomdihma"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-dialog
              ref="dialogOrderDate"
              persistent
              v-model="modal"
              lazy
              full-width
              width="290px"
              :return-value.sync="order.orderDate"
            >
              <v-text-field
                slot="activator"
                label="Fecha"
                v-model="order.orderDate"
                prepend-icon="event"
                readonly
                required
              ></v-text-field>
              <v-date-picker v-model="order.orderDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialogOrderDate.save(order.orderDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-dialog
              ref="dialogServedDate"
              persistent
              v-model="modalServedDate"
              lazy
              full-width
              width="290px"
              :return-value.sync="order.servedDate"
            >
              <v-text-field
                slot="activator"
                label="Fecha Atendido"
                v-model="order.servedDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="order.servedDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalServedDate = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialogServedDate.save(order.servedDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-dialog
              ref="dialogServiceDate"
              persistent
              v-model="modalServiceDate"
              lazy
              full-width
              width="290px"
              :return-value.sync="order.serviceDate"
            >
              <v-text-field
                slot="activator"
                label="Fecha Compra/Servicio"
                v-model="order.serviceDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="order.serviceDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalServiceDate = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialogServiceDate.save(order.serviceDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-select
              v-model="order.area"
              label="Area"
              required
              item-text="name"
              item-value="area"
              :items="areas"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
      <small class="red--text">(*) Los campos son requeridos</small>
      
    </v-card-text>
     <v-data-table
    :headers="headers"
    :items="details"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.description }}</td>
      <td class="text-xs-left">{{ props.item.quantity }}</td>
      <td class="text-xs-left">{{ props.item.unit }}</td>
      <td class="text-xs-left">{{ props.item.tracing }}</td>
      <td class="text-xs-left">{{ props.item.estimatedCost }}</td>
      <td class="text-xs-left">{{ props.item.realCost }}</td>
    </template>
  </v-data-table>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click="addOrder()">GUARDAR</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn
        color="primary"
        dark
        small
        absolute
        bottom
        left
        fab
        slot="activator"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Detalle Pedido</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Descripción" required v-model="detail.description"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Cantidad" required v-model="detail.quantity"></v-text-field>
              </v-flex>     
              <v-flex xs12 sm6 md4>
                <v-text-field label="Unidad" required v-model="detail.unit"></v-text-field>
              </v-flex>     
              <v-flex xs12 sm6 md4>
                <v-text-field label="Seguimiento" v-model="detail.tracing"></v-text-field>
              </v-flex>  
              <v-flex xs12 sm6 md6>
                <v-text-field label="Costo Estimado" required v-model="detail.estimatedCost"></v-text-field>
              </v-flex>  
              <v-flex xs12 sm6 md6>
                <v-text-field label="Costo Real" required v-model="detail.realCost"></v-text-field>
              </v-flex>        
            </v-layout>
          </v-container>
          <small class="red--text">(*) Los campos son requeridos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="green darken-1" flat @click="addDetail()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import swal from 'sweetalert2'
 export default {
    data(){
      return{
         headers: [
          {
            text: 'Descripción',
            align: 'left',
            sortable: false,
            value: 'description'
          },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Unidad', value: 'unit' },
          { text: 'Seguimiento', value: 'tracing' },
          { text: 'Costo Estimado', value: 'estimatedCost' },
          { text: 'Costo Real', value: 'realCost' }
        ],
        orderDate: null,
        servedDate:null,
        serviceDate:null,
        modal: false,
        dialog:false,
        modalServiceDate:false,
        modalServedDate:false,
        areas:[],
        details:[],
        order:{},
        detail:{}
      }
    },
    mounted(){
      this.getAreas()
    },
    methods:{
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
      addDetail(){
        if(this.detail.description &&
        this.detail.quantity &&
        this.detail.unit &&
        this.detail.tracing &&
        this.detail.estimatedCost &&
        this.detail.realCost){
          this.details.push(this.detail);
          this.detail={};
          this.dialog=false;
        }else{
          swal(
            'Error',
            'Los campos deben estar completos',
            'error'
          )
        }
      },
      addOrder(){
        if(this.order.number &&
        this.order.type &&
        this.order.codpoi &&
        this.order.codpomdihma &&
        this.order.orderDate &&
        this.order.area){
          this.order.details= this.details;
          fetch('http://localhost:3000/api/orders',{
          method:'post',
          headers:{
            'Content-Type': 'application/json',
            'authorization':localStorage.getItem('Opema-Token')
          },
          body: JSON.stringify(this.order)
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.success){
            swal(
              'Añadido!',
              'Agregado correctamente',
              'success'
            )
            this.order={}
            this.details=[]
          }else{
            swal(
              'Error!',
              `Error: ${res.message} : ${res.error.errmsg}`,
              'error'
            )
          }
        })          
        }else{
          swal(
            'Error',
            'Los datos deben estar completos',
            'error'
          )
        }
      }
    }
  }
</script>

<style>

</style>
