<template>
  <v-layout row>
    <v-flex xs12 sm6>
      <v-expansion-panel>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Pedidos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn icon dark slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">Agregar Pedido</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="# Pedido" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm8>
                      <v-select
                        label="Area"
                        required
                        :items="areas.map(area=>area.name)"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Descripción" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Cantidad" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Unidades" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        label="Tipo"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="COD PPTO" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="COD POMDIHMA" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-dialog
                        ref="dialog"
                        persistent
                        v-model="modal"
                        lazy
                        full-width
                        width="290px"
                        :return-value.sync="date"
                      >
                        <v-text-field
                          slot="activator"
                          label="Fecha"
                          v-model="date"
                          prepend-icon="event"
                          readonly
                          required
                        ></v-text-field>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>    
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Seguimiento"></v-text-field>
                    </v-flex>   
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Costo Estimado" required></v-text-field>
                    </v-flex>   
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Costo Real" required></v-text-field>
                    </v-flex>               
                  </v-layout>
                </v-container>
                <small class="red--text">(*) Los campos son obligatorios</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                <v-btn color="green darken-1" flat @click.native="dialog = false">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-menu bottom left>
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>Exportar a Excel</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
          <div slot="header">Item</div>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data: () => ({
      dialog: false,
      date: null,
      menu: false,
      modal: false,
      areas:[]
    }),    
    mounted(){
      fetch('http://localhost:3000/api/areas')
      .then(res=>res.json())
      .then(data=>this.areas=data)
    }
  }
</script>

<style>

</style>
