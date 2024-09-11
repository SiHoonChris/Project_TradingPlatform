<template>
  <div>
    <HeaderComponent/>
    <SidebarComponent/>
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/App/HeaderComponent.vue'
import SidebarComponent from './components/App/SidebarComponent.vue'

export default {
  components: { HeaderComponent, SidebarComponent }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

::-webkit-scrollbar-track {
  background-color: black;
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
</style>