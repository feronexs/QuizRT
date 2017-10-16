import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    consultaCursos: [
      { id: 'isdia1',
        nombre: 'Curso1',
        profesor: 'Profe1',
        carrera: 'Sistemas',
        anio: '2017',
        semestre: 2,
        fechaCreacion: null,
        fechaModificacion: null
      },
      { id: 'isdia2',
        nombre: 'Curso2',
        profesor: 'Profe2',
        carrera: 'Sistemas',
        anio: '2017',
        semestre: 1,
        fechaCreacion: null,
        fechaModificacion: null
      },
      { id: 'isdia3',
        nombre: 'Curso3',
        profesor: 'Profe3',
        carrera: 'Ambiental',
        anio: '2017',
        semestre: 3,
        fechaCreacion: null,
        fechaModificacion: null
      }
    ],
    miPerfil: {
      tipoUsuario: '',
      nombres: '',
      papellido: '',
      sapellido: '',
      num_identificacion: '',
      codigo: '',
      correo: '',
      semetreActual: '',
      carrera: '',
      cursoSelect: ''
    },
    semestres: [],
    carreras: [
      { text: 'Ingeniería de Sistemas' },
      { text: 'Ingeniería de Plasticos' },
      { text: 'Ingeniería Ambiental' }
    ],
    usuario: null,
    loading: false,
    error: null,
    mensaje: null
  },
  mutations: {
    setUser (state, payload) {
      state.usuario = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setMensaje (state, payload) {
      state.mensaje = payload
    },
    clearError (state) {
      state.error = null
    },
    clearMensaje (state) {
      state.mensaje = null
    },
    cargarSemestres (state, payload) {
      state.semestres = payload
    },
    cargarPerfil (state, payload) {
      state.miPerfil = payload
    }
  },
  actions: {
    borrarCuenta ({commit}) {
      commit('setError', { message: 'Se borro la cuenta... adios' })
      setTimeout(function () {
        firebase.auth().signOut()
        commit('setUser', null)
      }, 3000)
    },
    consultaMiPerfil ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('perfiles/' + this.state.usuario.id).on('value', function (data) {
        const miPerfil = []
        const obj = data.val()
        if (obj) {
          miPerfil.push(obj)
          commit('cargarPerfil', obj)
          commit('setLoading', false)
        } else {
          commit('cargarPerfil', {})
          commit('setLoading', false)
        }
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    consultaSemestresFire ({commit}) {
      firebase.database().ref('semestres').once('value')
        .then((data) => {
          const semestres = []
          const obj = data.val()
          for (let key in obj) {
            semestres.push({
              text: obj[key].text
            })
          }
          commit('cargarSemestres', semestres)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    registrarPefil ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      commit('clearMensaje')
      if (this.state.usuario !== null) {
        firebase.database().ref('perfiles/' + this.state.usuario.id).set(
          payload
        ).then(
          result => {
            commit('setLoading', false)
            commit('setMensaje', { message: 'Guardado...' })
          }
        ).catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      } else {
        commit('setError', { message: 'No puede ejecutar...' })
        commit('setLoading', false)
      }
    },
    registrarUsuario ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.correo, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              photoURL: user.photoURL,
              cursos: [],
              username: user.displayName
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    loginUsuario ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.correo, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            photoURL: user.photoURL,
            cursos: [],
            username: user.displayName
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    loginUsuarioGoogle ({commit}, payload) {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        // ...
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          photoURL: user.photoURL,
          cursos: [],
          username: user.displayName
        }
        commit('setUser', newUser)
      }).catch(function (error) {
        var errorMessage = error.message
        console.error(errorMessage)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, photoURL: payload.photoURL, cursos: [], username: payload.displayName })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    clearMensaje ({commit}) {
      commit('clearMensaje')
    }
  },
  getters: {
    consultaCursos (state) {
      return state.consultaCursos
    },
    consultaCurso (state) {
      return (cursoId) => {
        return state.consultaCursos.find((curso) => {
          return curso.id === cursoId
        })
      }
    },
    consultaSemestres (state) {
      return state.semestres
    },
    consultaMiPerfil (state) {
      return state.miPerfil
    },
    usuario (state) {
      return state.usuario
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    mensaje (state) {
      return state.mensaje
    }
  }
}
)
