<template>
  <div id="transaction-calendar">
    <div id="from-calendar">
      <p>FROM</p>
      <div id="select-from">
        <flat-pickr v-model="date_from" :config="config_from"></flat-pickr>
      </div>
    </div>
    <div id="to-calendar">
      <p>TO</p>
      <div id="select-to">
        <flat-pickr v-model="date_to" :config="config_to"></flat-pickr>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: { flatPickr },
  data() {
    return {
      date_from: null,
      config_from: {
        inline: true,
        enableTime: false,
      },
      date_to: null,
      config_to: {
        inline: true,
        enableTime: false,
        minDate: null
      }
    }
  },
  created(){
    },
  mounted(){
    const WIDTH = window.getComputedStyle(document.querySelector("#select-from")).width;
    const HEIGHT = window.getComputedStyle(document.querySelector("#select-from")).height;
    for(const E of document.querySelectorAll(".flatpickr-calendar")){
      E.style.width = WIDTH;
      E.style.height = HEIGHT;
    }
  },
  watch: {
    date_from: function(val){
      this.config_to.minDate = val;
    }
  }
}
</script>

<style scoped>
  #transaction-calendar {
    width: 72%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #from-calendar, #to-calendar {
    width: 100%;
    height: 50%;
  }
  p {
    margin: 0;
    padding-left: 2%;
    padding-bottom: 1%;
    height: 9%;
    color: white;
    font-weight: bold;
  }
  #select-from, #select-to {
    width: 100%;
    height: 90%;
    border: 1px solid gray;
  }
  .flatpickr-input {
    display: none;
  }
  .flatpickr-calendar{
    width: 330px;
    height: 260px;
  }
</style>
