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

<style scoped>
#popup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 21vw;
  top: 20vh;
  width: 58vw;
  height: 60vh;
  border: 4px solid white;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
}
#close-btn {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 99%;
  height: 6%;
}
#off-btn {
  background: none;
  border: none;
  font-weight: bold;
  color: white;
  height: 80%;
}
#off-btn:hover {
  cursor: pointer;
}
#popup-contents {
  width: 95%;
  height: 94%;
  margin: 0.2vh auto 0.8vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* Scroll-bar */
#popup-contents::-webkit-scrollbar {
  	width: 0.6vw;
}
#popup-contents::-webkit-scrollbar-thumb {
  	border-radius: 30px;
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  	background-color: #333;
}

</style>