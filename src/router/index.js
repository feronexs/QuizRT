import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
// Cursos
import Cursos from '@/components/curso/Cursos'
import DetalleCurso from '@/components/curso/DetalleCurso'
import NewCurso from '@/components/curso/NewCurso'
// Quiz
import NewQuiz from '@/components/quiz/NewQuiz'
import Quices from '@/components/quiz/Quices'
// Usuarios
import Estudiantes from '@/components/usuario/Estudiantes'
import NewEstudiante from '@/components/usuario/NewEstudiante'
import NewProfesor from '@/components/usuario/NewProfesor'
import MiPerfil from '@/components/usuario/MiPerfil'
import Login from '@/components/usuario/Login'
import Registro from '@/components/usuario/Registro'
import Configuracion from '@/components/usuario/Configuracion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Cursos',
      name: 'Cursos',
      component: Cursos,
      beforeEnter: AuthGuard
    },
    {
      path: '/DetalleCurso/:id',
      name: 'DetalleCurso',
      props: true,
      component: DetalleCurso,
      beforeEnter: AuthGuard
    },
    {
      path: '/NewCurso',
      name: 'NewCurso',
      component: NewCurso,
      beforeEnter: AuthGuard
    },
    {
      path: '/NewQuiz',
      name: 'NewQuiz',
      component: NewQuiz,
      beforeEnter: AuthGuard
    },
    {
      path: '/Quices',
      name: 'Quices',
      component: Quices,
      beforeEnter: AuthGuard
    },
    {
      path: '/Estudiantes',
      name: 'Estudiantes',
      component: Estudiantes,
      beforeEnter: AuthGuard
    },
    {
      path: '/NewEstudiante',
      name: 'NewEstudiante',
      component: NewEstudiante,
      beforeEnter: AuthGuard
    },
    {
      path: '/NewProfesor',
      name: 'NewProfesor',
      component: NewProfesor,
      beforeEnter: AuthGuard
    },
    {
      path: '/MiPerfil',
      name: 'MiPerfil',
      component: MiPerfil,
      beforeEnter: AuthGuard
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/Configuracion',
      name: 'Configuracion',
      component: Configuracion
    }
  ],
  mode: 'history'
})
