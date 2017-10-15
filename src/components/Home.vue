<template>
	<v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
  <v-carousel icon="stop">
    <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
  </v-carousel>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/static/img1.jpg'
          },
          {
            src: '/static/img2.jpg'
          },
          {
            src: '/static/img3.jpg'
          }
        ]
      }
    }
  }
</script>