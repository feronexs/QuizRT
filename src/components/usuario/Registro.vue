<template>
<v-container >
		<v-layout row wrap>
			<v-flex md5 xs12 offset-md3>
			<v-toolbar class="">
		      <v-toolbar-title >Registro</v-toolbar-title>
		    </v-toolbar>
		    <form @submit.prevent="submit" >
			    <v-card>
			    <v-card-text class="">
            <v-select 
            :items="tiposUsuarios" 
            label="Tipo de Usuario"
            v-model="tipoUsuario"
            required
            ></v-select>
				    <v-text-field
				      label="Correo"
				      v-model="correo"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Contaseña"
				      v-model="password"
				      type="password"
				      required
				    ></v-text-field>
				    <v-text-field
				      label="Confirmar Contaseña"
				      v-model="confirmPassword"
				      :rules="[compararPass]"
				      type="password"
				    ></v-text-field>
				  </v-card-text>
	                <v-card-actions >
		             	<v-btn class="" type="submit" :disabled="loading" :loading="loading">Enviar
		             	<span slot="loader" class="custom-loader">
					      <v-icon light>cached</v-icon>
					    </span>
					    </v-btn>
		             </v-card-actions>
				  </v-card>
			  </form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      correo: '',
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
      tipoUsuario: ''
    }
  },
  computed: {
    compararPass () {
      return this.password !== this.confirmPassword ? 'No coinciden' : ''
    },
    usuario () {
      return this.$store.getters.usuario
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    usuario (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('registrarUsuario', {correo: this.correo, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
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