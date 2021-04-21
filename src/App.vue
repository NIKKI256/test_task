<template>
  <div id="app">
    <v-app class="main-class">
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-application--wrap {
  min-height: 1vh !important;
  display: block;
}

.main-class{
  margin-top: 2%;
}
</style>