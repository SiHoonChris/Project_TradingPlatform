<template>
  <div id="popup-container">
    <div id="close-btn">
      <button id="off-btn" @click="PopupOff()">X</button>
    </div>
    <div id="popup-contents">
      <slot name="contents"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    PopupOff: function(){
      this.$emit("PopupSwitchOff", false);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Common/PopupSlot.scss";
</style>