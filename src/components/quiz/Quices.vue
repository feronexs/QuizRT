<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs10 offset-xs1>
				<v-card class=" mb-3" v-for="curso in cursos" :key="curso.id">
	                <v-card-title primary-title>
			                <h4 >{{ curso.nombre}}</h4>
		             </v-card-title>
					<v-card-text class="">
		                <span>{{ curso.profesor}}</span>
		                <v-spacer></v-spacer>
		                <span>{{ curso.carrera}}</span>
					</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
	             	<v-btn router :to="'/DetalleCurso/' + curso.id" >
	             		Ver Curso
	             		<!-- <v-icon flat right>arrow_forward</v-icon> -->
	             	</v-btn>
			    </v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
  name: 'app',
  computed: {
    cursos () {
      return this.$store.getters.consultaCursos
    }
  },
  data () {
    return {}
  }
}
</script>