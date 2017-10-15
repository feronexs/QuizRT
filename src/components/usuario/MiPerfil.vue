<template>
<v-container >
		<form @submit.prevent="submit" >
		<v-layout row wrap>
			<v-flex md10 xs12 offset-md1>
			<v-toolbar class="">
		      <v-toolbar-title >Información Personal</v-toolbar-title>
		    </v-toolbar>
			    <v-card>
			    <v-card-text class="">
            <v-select 
            :items="tiposUsuarios" 
            label="Tipo de Usuario"
            v-model="perfilUsuario.tipoUsuario"
            item-value="text"
            disabled
            ></v-select>
				    <v-text-field
				      label="Nombres"
				      v-model.set="perfilUsuario.nombres"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Primer Apellido"
				      v-model="perfilUsuario.papellido"
				      required
				      type="text"
				    ></v-text-field>
				    <v-text-field
				      label="Segundo Apellido"
				      v-model="perfilUsuario.sapellido"
				      type="text"
				    ></v-text-field>
				    <v-text-field
				      label="Numero de identificación"
				      v-model="perfilUsuario.num_identificacion"
				      type="text"
				      required
				    ></v-text-field>
				    <v-select 
			            :items="cursos" 
			            label="Curso"
			            v-model="perfilUsuario.cursoSelect"
			            item-text="nombre"
			            item-value="nombre"
			            :hint="`${perfilUsuario.cursoSelect.nombre}, ${perfilUsuario.cursoSelect.profesor}`"
			            persistent-hint
			            single-line
			            ></v-select>
				  </v-card-text>
				  </v-card>
			</v-flex>
			<v-flex md10 xs12 offset-md1>
				<v-toolbar class="">
			      <v-toolbar-title >Información Estudiantil</v-toolbar-title>
			    </v-toolbar>
				    <v-card>
				    <v-card-text class="">
					    <v-text-field
					      label="Código"
					      v-model="perfilUsuario.codigo"
					      type="text"
					    ></v-text-field>
					    <v-select 
			            :items="semestres" 
			            label="Semestre"
			            v-model="perfilUsuario.semetreActual"
			            item-value="text"
			            ></v-select>
			            <v-select 
			            :items="carreras" 
			            label="Carrera"
			            v-model="perfilUsuario.carrera"
			            item-value="text"
			            ></v-select>
				  </v-card-text>
				  </v-card>
			</v-flex>
			<v-flex  md10 xs12 offset-md1>
			<v-toolbar class="">
		      <v-toolbar-title >Información de la Cuenta</v-toolbar-title>
		    </v-toolbar>
			    <v-card>
			    <v-card-text class="">
				    <v-text-field
				      label="Correo"
				      v-model="perfilUsuario.correo"
				    ></v-text-field>
				    <v-text-field
				      label="Contraseña"
				      v-model="perfilUsuario.password"
				      type="password"
				    ></v-text-field>
				    <v-text-field
				      label="Confirmar Contraseña"
				      v-model="perfilUsuario.confirmPassword"
				      :rules="[compararPass]"
				      type="password"
				    ></v-text-field>
				  </v-card-text>
	                <v-card-actions >
		             	<v-btn class="" type="submit" :disabled="loading" :loading="loading">Guardar
		             	<span slot="loader" class="custom-loader">
					      <v-icon light>cached</v-icon>
					    </span>
					    <v-spacer></v-spacer>
					    </v-btn>
					    <!-- <v-btn class="error" type="buttom" :disabled="loading" :loading="loading">Cancelar cuenta
		             	<span slot="loader" class="custom-loader">
					      <v-icon light>cached</v-icon>
					    </span>
					    </v-btn> -->

					  <v-layout row >
					    <v-dialog v-model="dialog" persistent>
					      <v-btn class="error" dark slot="activator"  :disabled="loading" :loading="loading">Borrar cuenta</v-btn>
					      <span slot="loader" class="custom-loader">
					      <v-icon light>cached</v-icon>
					    </span>
					      <v-card>
					        <v-card-title>
					          <div class="headline">¿Seguro desea borrar esta cuenta?</div>
					        </v-card-title>
					        <v-card-text>No podras recuperar estos datos luego de aceptar.</v-card-text>
					        <v-card-actions>
					          <v-spacer></v-spacer>
					          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Cancelar</v-btn>
					          <v-btn color="green darken-1" flat="flat" @click.native="borrarCuenta">Aceptar</v-btn>
					        </v-card-actions>
					      </v-card>
					    </v-dialog>
					  </v-layout>
		             </v-card-actions>
				  </v-card>
			</v-flex>
		</v-layout>
			  </form>
	</v-container>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      editando: false,
      context: 'success',
      text: 'Guardando...',
      e3: null,
      menu: false,
      modal: false,
      perfilUsuario: {},
      valid: false,
      correoRules: [
        (v) => !!v || 'Correo requerido'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Contraseña requerida'
      ],
      confirmPassword: '',
      tiposUsuarios: [
        { text: 'Profesor' },
        { text: 'Estudiante' }
      ],
      carreras: [
        { text: 'Ingeniería de Sistemas' },
        { text: 'Ingeniería de Plasticos' },
        { text: 'Ingeniería Ambiental' }
      ]
    }
  },
  created () {
    const perfil = this.miPerfil
    if (perfil !== null && perfil !== undefined) {
      this.perfilUsuario = perfil
    }
  },
  computed: {
    estaEditando () {
      return this.editando ? 'Editando' : 'Editar'
    },
    compararPass () {
      return this.password !== this.confirmPassword ? 'No coinciden' : ''
    },
    usuario () {
      return this.$store.getters.usuario
    },
    mensaje () {
      return this.$store.getters.mensaje
    },
    loading () {
      return this.$store.getters.loading
    },
    cursos () {
      return this.$store.getters.consultaCursos
    },
    semestres () {
      return this.$store.getters.consultaSemestres
    },
    miPerfil () {
      return this.$store.getters.consultaMiPerfil
    }
  },
  watch: {
    usuario (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    },
    miPerfil (value) {
      if (value !== null && value !== undefined) {
        this.perfilUsuario = value
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('registrarPefil', this.perfilUsuario)
    },
    borrarCuenta () {
      this.dialog = false
      this.$store.dispatch('borrarCuenta')
    },
    onDismissed () {
      this.$store.dispatch('clearMensaje')
    },
    onDismissedMessage () {
      this.$store.dispatch('clearMensaje')
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>