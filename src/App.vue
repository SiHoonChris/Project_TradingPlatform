<template>
  <div>
    <HeaderComponent/>
    <div id="app-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HeaderComponent from './components/App/HeaderComponent.vue'

  export default {
    components: {
      HeaderComponent
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  #app-view {
    display: flex;
  }
</style>
