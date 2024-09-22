<template>
  <div>
    <HeaderComponent/>
    <div id="main">
      <SidebarComponent/>
      <router-view/>
    </div>
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
#main {
  display: flex;
}
</style>