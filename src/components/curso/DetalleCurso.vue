<template>
	<v-container ligth>
		<v-layout row wrap>
			<v-flex md8 xs12 offset-md2 offset-xs0>
			<v-toolbar >
		      <v-toolbar-title >{{ curso.nombre }}</v-toolbar-title>
		      <v-spacer></v-spacer>
            	<v-btn icon  @click="editar" fab class="indigo--text" :readonly="!editando">
            		<i class="material-icons">mode_edit</i>
         		</v-btn>
		    </v-toolbar>
				<v-card>
					<!--<v-card-media
                      src="http://cdn.thecitylovesyou.com/wp-content/uploads/2016/01/coachella-ny.jpg"
                      height="400px"
                    >
                    </v-card-media>-->
                    <v-card-text class="">
                    	<v-form>
						    <v-text-field
						      label="Nombre"
						      v-model="curso.nombre"
						      :readonly="!editando"
						    ></v-text-field>
						    <v-text-field
						      label="Profesor"
						      v-model="curso.profesor"
						      :readonly="!editando"
						    ></v-text-field>
						    <v-text-field
						      label="Carrera"
						      v-model="curso.carrera"
						      :readonly="!editando"
						    ></v-text-field>
						    <v-text-field
						      label="Año"
						      v-model="curso.anio"
						      :readonly="!editando"
						    ></v-text-field>
						    <v-text-field
						      label="Semestre"
						      v-model.number="curso.semestre"
						      :readonly="!editando"
						      type="number"
						    ></v-text-field>
						    <v-container fluid>
							    <v-layout row wrap>
							      <v-flex xs12 sm6>
							        <v-menu
							          lazy
							          :close-on-content-click="false"
							          v-model="menu1"
							          transition="scale-transition"
							          offset-y
							          full-width
							          :nudge-left="40"
							          max-width="290px"
							        >
							          <v-text-field
							            slot="activator"
							            label="Fecha Creación"
							            v-model="curso.fechaCreacion"
							            prepend-icon="event"
							            readonly
							          ></v-text-field>
							          <v-date-picker v-model="curso.fechaCreacion" no-title scrollable actions locale="es-sp">
							            <template scope="{ save, cancel }">
							              <v-card-actions>
							                <v-btn flat primary @click.native="cancel()">Cancelar</v-btn>
							                <v-btn flat primary @click.native="save()">Guardar</v-btn>
							              </v-card-actions>
							            </template>
							          </v-date-picker>
							        </v-menu>
							      </v-flex>
							      <v-flex xs12 sm6>
							        <v-menu
							          lazy
							          :close-on-content-click="false"
							          v-model="menu2"
							          transition="scale-transition"
							          offset-y
							          full-width
							          :nudge-left="40"
							          max-width="290px"
							        >
							          <v-text-field
							            slot="activator"
							            label="Fecha Modificación"
							            v-model="curso.fechaModificacion"
							            prepend-icon="event"
							            readonly
							          ></v-text-field>
							          <v-date-picker v-model="curso.fechaModificacion" no-title scrollable actions locale="es-sp">
							            <template scope="{ save, cancel }">
							              <v-card-actions>
							                <v-btn flat primary @click.native="cancel()">Cancelar</v-btn>
							                <v-btn flat primary @click.native="save()">Guardar</v-btn>
							              </v-card-actions>
							            </template>
							          </v-date-picker>
							        </v-menu>
							      </v-flex>
							    </v-layout>
							  </v-container>
					  </v-form>
                    	<!-- <div>{{ curso.profesor }}</div> -->
                    </v-card-text>
                    <v-card-actions >
                    	<v-spacer></v-spacer>
		             	<v-btn :disabled="editando">
		             		Guardar
		             	</v-btn>
		             </v-card-actions>
	             </v-card>
			</v-flex>
		</v-layout>
		<v-snackbar
	      :timeout="timeout"
	      :success="context === 'success'"
	      :info="context === 'info'"
	      :warning="context === 'warning'"
	      :error="context === 'error'"
	      :primary="context === 'primary'"
	      :secondary="context === 'secondary'"
	      :multi-line="mode === 'multi-line'"
	      :vertical="mode === 'vertical'"
	      v-model="snackbar"
	      ligth
	    >
	      {{ text }}
	      <!-- <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn> -->
	      <v-btn class="primary" :disabled="editando">
         		Guardar
         	</v-btn>
	    </v-snackbar>
	</v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    curso () {
      return this.$store.getters.consultaCurso(this.id)
    },
    estaEditando () {
      return this.editando ? 'Editando' : 'Editar'
    }
  },
  data () {
    return {
      editando: false,
      snackbar: false,
      context: 'info',
      mode: '',
      timeout: 6000,
      text: '',
      e3: null,
      menu: false,
      modal: false
    }
  },
  methods: {
    editar () {
      this.editando = !this.editando
      this.snackbar = true
      this.text = this.editando ? 'Editando...' : 'Saliendo de edición...'
      this.timeout = this.editando ? 8000 : 0
      this.context = this.editando ? 'warning' : 'info'
    }
  }
}
</script>