<template>
  <div>
    <HeaderComponent/>
    <div id="main-view">
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
  #main-view {
    display: flex;
  }
</style>
