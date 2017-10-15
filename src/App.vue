<template>
  <v-app id="app" dark toolbar>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      clipped
      :mini-variant.sync="mini"
    >
      <v-list class="pa-1" v-if="esUsuarioAutenticado">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-bind:src="cargaImagen" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title >{{ cargaNombre }}</v-list-tile-title>
          </v-list-tile-content>
        <v-list-tile-action>
            <v-btn icon v-if="!mini" @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" 
        :key="item.title" 
        @click="" 
        router 
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="esUsuarioAutenticado"
        @click="onLogout">
          <v-list-tile-action>
            <v-icon>input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="" fixed >
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">QuizRT</router-link>   
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" >
        <!-- <v-btn v-for="item in items" :key="item.title" 
        flat
        router 
        :to="item.link"
        >
          <v-icon left class="material-icons">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="esUsuarioAutenticado"
        flat
        @click="onLogout">
          <v-icon left class="material-icons">input</v-icon>
          Cerrar Sesión
        </v-btn> -->
      </v-toolbar-items>

      <v-flex id="progressIndeterminate">
      <v-progress-linear class="mt-0" v-bind:indeterminate="true" v-show="loading"></v-progress-linear>
      </v-flex>
  </v-toolbar>

    <main>
      <v-container fluid >
        <v-layout row class="alertMensaje" v-if="error">
          <v-flex xs12>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
        </v-layout>
        <v-layout row class="alertMensaje" v-if="mensaje">
          <v-flex xs12>
            <app-alert-success @dismissed="onDismissedMessage" :text="mensaje.message"></app-alert-success>
          </v-flex>
        </v-layout>
        <router-view></router-view>
        
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: false,
      itemsMenu: [
        'Estudiantes', 'Profesores'
      ],
      right: null,
      imagenUsuario: '',
      text: 'Guardando...',
      mini: true
    }
  },
  computed: {
    items () {
      let items = [
        { title: 'Iniciar Sesión', icon: 'play_for_work', link: '/Login' },
        { title: 'Registro', icon: 'lock_open', link: '/Registro' }
      ]
      if (this.esUsuarioAutenticado) {
        items = [
          { title: 'Quices', icon: 'book', link: '/Quices' },
          { title: 'Cursos', icon: 'assignment', link: '/Cursos' },
          { title: 'Perfil', icon: 'account_circle', link: '/MiPerfil' },
          { title: 'Parámetros', icon: 'settings', link: '/Configuracion' }
        ]
      }
      return items
    },
    esUsuarioAutenticado () {
      return this.$store.getters.usuario !== null && this.$store.getters.usuario !== undefined
    },
    error () {
      return this.$store.getters.error
    },
    mensaje () {
      return this.$store.getters.mensaje
    },
    loading () {
      return this.$store.getters.loading
    },
    cargaImagen () {
      if (this.esUsuarioAutenticado) {
        return this.$store.getters.usuario.photoURL ? this.$store.getters.usuario.photoURL : undefined
      } else {
        return null
      }
    },
    cargaNombre () {
      if (this.esUsuarioAutenticado) {
        return this.$store.getters.usuario.username ? this.$store.getters.usuario.username : undefined
      } else {
        return null
      }
    }
  },
  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    onDismissedMessage () {
      this.$store.dispatch('clearMensaje')
    },
    onLogout () {
      this.$router.push('/Login')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="stylus">
// main.styl
@import '../node_modules/vuetify/src/stylus/main.styl' // Ensure you are using stylus-loader

#progressIndeterminate {
  margin-top: 42px !important;
  position: fixed;
  width: 100%;
}

.alertMensaje {
    position: fixed;
    min-width: 75%;
    max-width: 80%;
    z-index: 10;
}

::-webkit-scrollbar {
  display: none;
}
/*
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  background-color: #0ae;
  
  background-image: -webkit-gradient(linear, 0 0, 0 100%,
                     color-stop(.5, rgba(255, 255, 255, .2)),
             color-stop(.5, transparent), to(transparent));
}
*/


</style>
