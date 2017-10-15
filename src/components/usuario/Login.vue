<template>
<v-container >
		<v-layout row wrap>
			<v-flex md5 xs12 offset-md3>
			<v-toolbar class="">
		      <v-toolbar-title >Iniciar Sesión</v-toolbar-title>
		    </v-toolbar>
		    <form @submit.prevent="submit" >
			    <v-card>
			    <v-card-text class="">
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
				  </v-card-text>
	                <v-card-actions >
		             	<v-btn class="" type="submit">Enviar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn class="primary" @click.prevent="submitGoogle" type="buttom">Iniciar con Cuenta de Google</v-btn>
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
      ]
    }
  },
  computed: {
    usuario () {
      return this.$store.getters.usuario
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    usuario (value) {
      if (value !== null && value !== undefined) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('loginUsuario', {correo: this.correo, password: this.password})
    },
    submitGoogle () {
      this.$store.dispatch('loginUsuarioGoogle', {correo: this.correo, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>