<template>
  <div>
    <HeaderComponent/>
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  components: { HeaderComponent }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
/* Scroll-bar */
::-webkit-scrollbar-track {
  background-color: yellow;
}
::-webkit-scrollbar {
  background-color: black;
  width: 0.55vw;
}
::-webkit-scrollbar-thumb {
  border-radius: 30px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #333;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>