<template>
  <div id="app-body" v-on:drop.prevent v-on:dragover.prevent>
    <div id="app-column">
      <h1>Furl / Unfurl</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app-body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app-column {
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
}
</style>
