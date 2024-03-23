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
      date_from: null, // 첫 화면 에서는 Today임
      config_from: {
        inline: true,
        enableTime: false,
        maxDate: "today"
      },
      date_to: null, // 첫 화면 에서는 Today임
      config_to: {
        inline: true,
        enableTime: false,
        minDate: null,
        maxDate: "today"
      },
      WIDTH: null,
      HEIGHT: null
    }
  },
  mounted(){
    this.WIDTH = window.getComputedStyle(document.querySelector("#select-from")).width;
    this.HEIGHT = window.getComputedStyle(document.querySelector("#select-from")).height;
    
    for(const E of document.querySelectorAll(".flatpickr-calendar")){
      E.style.width = this.WIDTH;
      E.style.height = this.HEIGHT;
      E.style.top = '0px';
      E.style.bottom = '0px';
    }
    for(const E of document.querySelectorAll(".flatpickr-current-month")){E.style.paddingTop = '1px';}
    for(const E of document.querySelectorAll(".flatpickr-days")){E.style.width = this.WIDTH;}
    for(const E of document.querySelectorAll(".dayContainer")){
      E.style.height = 
        String(
          this.HEIGHT.replace('px', '') 
          - window.getComputedStyle(document.querySelectorAll(".flatpickr-weekdays")[0]).height.replace('px', '')
          - window.getComputedStyle(document.querySelectorAll(".flatpickr-months")[0]).height.replace('px', '')
        )+'px';
      E.style.width = this.WIDTH;
      E.style.maxWidth = this.WIDTH;
    }
    for(const E of document.querySelectorAll(".dayContainer .flatpickr-day")){
      const rowsNum = document.querySelectorAll(".dayContainer .flatpickr-day").length > 35 ? 6 : 5;
      E.style.height = String(
        window.getComputedStyle(document.querySelectorAll(".dayContainer")[0]).height.replace('px', '') / rowsNum
      )+'px';
      E.style.lineHeight = String(
        window.getComputedStyle(document.querySelectorAll(".dayContainer")[0]).height.replace('px', '') / rowsNum
      )+'px';
    }
    for(const E of document.querySelectorAll(".flatpickr-months span")){E.style.paddingTop = '3px';}
    for(const E of document.querySelectorAll(".flatpickr-weekdays")){E.style.width = this.WIDTH;}
  },
  updated(){
    for(const E of document.querySelectorAll(".flatpickr-days")){E.style.width = this.WIDTH;}
    for(const E of document.querySelectorAll(".dayContainer")){
      E.style.height = 
        String(
          this.HEIGHT.replace('px', '') 
          - window.getComputedStyle(document.querySelectorAll(".flatpickr-weekdays")[0]).height.replace('px', '')
          - window.getComputedStyle(document.querySelectorAll(".flatpickr-months")[0]).height.replace('px', '')
        )+'px';
      E.style.width = this.WIDTH;
      E.style.maxWidth = this.WIDTH;
    }
    for(const E of document.querySelectorAll(".dayContainer .flatpickr-day")){
      const rowsNum = document.querySelectorAll(".dayContainer .flatpickr-day").length > 35 ? 6 : 5;
      E.style.height = String(
        window.getComputedStyle(document.querySelectorAll(".dayContainer")[0]).height.replace('px', '') / rowsNum
      )+'px';
      E.style.lineHeight = String(
        window.getComputedStyle(document.querySelectorAll(".dayContainer")[0]).height.replace('px', '') / rowsNum
      )+'px';
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
    height: 9%;
    color: white;
    font-weight: bold;
  }
  #select-from, #select-to {
    width: 100%;
    height: 90%;
  }
  .flatpickr-input {
    display: none;
  }
  
</style>
