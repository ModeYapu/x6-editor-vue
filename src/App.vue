<template>
  <div id="app">
    <Editor />
  </div>
</template>

<script>
import Editor from './components/Editor/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.x6-widget-stencil-group-content .x6-graph {
  height: calc(100vh - 60px) !important;
}
</style>
