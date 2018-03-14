<template>
<div>
  <v-layout row justify-center>
    <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Pedido #{{order.number}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list two-line>
              <v-subheader>General</v-subheader>             
              <v-list-tile row justify-center>
                <v-list-tile-content>
                  <v-list-tile-title >Tipo</v-list-tile-title>
                  <v-list-tile-sub-title>{{order.type}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Código POI </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.codpoi}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Código POMDIHMA </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.codpomdihma}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Fecha </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.orderDate}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Fecha Atendido </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.servedDate}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Fecha Compra/Servicio </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.serviceDate}}</v-list-tile-sub-title>
                </v-list-tile-content>
                 <v-list-tile-content>
                  <v-list-tile-title >Area </v-list-tile-title>
                  <v-list-tile-sub-title>{{order.area.name}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-data-table
              :headers="orderHeaders"
              :items="order.details"
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
          </v-card-text>

        </v-card>
      </v-dialog>
  <v-data-table
    :headers="headers"
    :items="orders"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.number }}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
      <td class="text-xs-left">{{ props.item.codpoi }}</td>
      <td class="text-xs-left">{{ props.item.codpomdihma }}</td>
      <td class="text-xs-lett">{{ props.item.orderDate.substring(0,10)}}</td>
      <td class="text-xs-left">{{ props.item.serverdDate }}</td>
      <td class="text-xs-left">{{ props.item.serviceDate }}</td>
      <td class="text-xs-left">{{ props.item.area.name }}</td>
       <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">more</v-icon>
          </v-btn>
        </td>
    </template>
  </v-data-table>
  </v-layout>
</div>
</template>

<script>
import moment from 'moment'
  export default {
    data () {
      return {
        dialog:false,
        orderHeaders: [
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
        headers: [
          {
            text: '# Pedido',
            align: 'left',
            sortable: false,
            value: 'number'
          },
          { text: 'Tipo', value: 'type' },
          { text: 'COD POI', value: 'codpoi' },
          { text: 'COD PODIHMA', value: 'codpodihma' },
          { text: 'Fecha', value: 'orderDate' },
          { text: 'F. Atendido', value: 'servedDate' },
          { text: 'F. Compra/Servicio', value: 'serviceDate' },
          { text: 'Area', value: 'area' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
        orders: [],
        order:{area:{}}
      }
    },
    mounted(){
      this.getOrders();
      
    },
    methods:{
      getOrders(){
        fetch('http://localhost:3000/api/orders',{
          method:'get',
          headers:{
            'authorization':localStorage.getItem('Opema-Token')
          }
        })
        .then(res=>res.json())
        .then(data=>{this.orders=data
          console.log(this.orders)
        })
      },
      editItem(item){
        this.order = item;
        this.dialog=true;
      }
    }
  }
</script>

<style>

</style>
