<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch('setDictionary');
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  border: 1px solid #7f8da5;
  background-color: #5a6b89;
}
</style>
