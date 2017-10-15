<template>
  <v-tabs dark fixed centered >
    <v-tabs-bar class="secondary">
      <v-tabs-slider ></v-tabs-slider>
      <v-tabs-item
        v-for="i in items"
        :key="i"
        :href="'#tab-' + i"
      >
        {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in items"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ i }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
export default {
  data () {
    return {
      items: ['Semestres', 'Carreras', 'Años', 'Tipo de preguntas', 'Especialidades'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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