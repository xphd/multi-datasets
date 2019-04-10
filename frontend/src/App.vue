<template>
  <div id="app">    
    <multi-datasets/>
  </div>
</template>

<script>
import MultiDatasets from "./components/MultiDatasets.vue"

export default {
  name: 'app',
  components: {
    MultiDatasets
  },
  sockets:{
    connect(){
      console.log("Client: connecting.")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
