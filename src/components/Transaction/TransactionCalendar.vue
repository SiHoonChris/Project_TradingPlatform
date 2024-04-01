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
        maxDate: "today",
        onYearChange: function(){
          for(const E of document.querySelectorAll(".flatpickr-calendar")){
            E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
            E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
          }
          for(const E of document.querySelectorAll(".flatpickr-months")){
            E.style.height = '15%';
          }
          for(const E of document.querySelectorAll(".flatpickr-innerContainer")){
            E.style.height = '85%';
          }
          for(const E of document.querySelectorAll(".flatpickr-rContainer")){
            E.style.width = '100%';
          }
          for(const E of document.querySelectorAll(".flatpickr-weekdays")){
            E.style.height = '16%';
          }
          for(const E of document.querySelectorAll(".flatpickr-days")){
            E.style.width = '100%'; E.style.height = '84%';
          }
          for(const E of document.querySelectorAll(".dayContainer")){
            E.style.minWidth = 'none'; E.style.maxWidth = 'none';
            E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
          }
          for(const E of document.querySelectorAll(".flatpickr-day")){
            E.style.height = '100%'; E.style.lineHeight = '180%';
            E.style.maxWidth = 'none';
          }
          for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
            // e.style.color = "white";
            e.style.background = "darkgreen";
            e.style.borderColor = "darkgreen";
          }
        },
        onMonthChange: function(){
          for(const E of document.querySelectorAll(".flatpickr-calendar")){
            E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
            E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
          }
          for(const E of document.querySelectorAll(".flatpickr-months")){
            E.style.height = '15%';
          }
          for(const E of document.querySelectorAll(".flatpickr-innerContainer")){
            E.style.height = '85%';
          }
          for(const E of document.querySelectorAll(".flatpickr-rContainer")){
            E.style.width = '100%';
          }
          for(const E of document.querySelectorAll(".flatpickr-weekdays")){
            E.style.height = '16%';
          }
          for(const E of document.querySelectorAll(".flatpickr-days")){
            E.style.width = '100%'; E.style.height = '84%';
          }
          for(const E of document.querySelectorAll(".dayContainer")){
            E.style.minWidth = 'none'; E.style.maxWidth = 'none';
            E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
          }
          for(const E of document.querySelectorAll(".flatpickr-day")){
            E.style.height = '100%'; E.style.lineHeight = '180%';
            E.style.maxWidth = 'none';
          }
          for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
            // e.style.color = "white";
            e.style.background = "darkgreen";
            e.style.borderColor = "darkgreen";
          }
        }
      },
      date_to: null, 
      config_to: {
        inline: true,
        enableTime: false,
        minDate: null,
        maxDate: "today",
        onYearChange: function(){
          for(const E of document.querySelectorAll(".flatpickr-calendar")){
            E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
            E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
          }
          for(const E of document.querySelectorAll(".flatpickr-months")){
            E.style.height = '15%';
          }
          for(const E of document.querySelectorAll(".flatpickr-innerContainer")){
            E.style.height = '85%';
          }
          for(const E of document.querySelectorAll(".flatpickr-rContainer")){
            E.style.width = '100%';
          }
          for(const E of document.querySelectorAll(".flatpickr-weekdays")){
            E.style.height = '16%';
          }
          for(const E of document.querySelectorAll(".flatpickr-days")){
            E.style.width = '100%'; E.style.height = '84%';
          }
          for(const E of document.querySelectorAll(".dayContainer")){
            E.style.minWidth = 'none'; E.style.maxWidth = 'none';
            E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
          }
          for(const E of document.querySelectorAll(".flatpickr-day")){
            E.style.height = '100%'; E.style.lineHeight = '180%';
            E.style.maxWidth = 'none';
          }
          for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
            // e.style.color = "white";
            e.style.background = "darkgreen";
            e.style.borderColor = "darkgreen";
          }
        },
        onMonthChange: function(){
          for(const E of document.querySelectorAll(".flatpickr-calendar")){
            E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
            E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
          }
          for(const E of document.querySelectorAll(".flatpickr-months")){
            E.style.height = '15%';
          }
          for(const E of document.querySelectorAll(".flatpickr-innerContainer")){
            E.style.height = '85%';
          }
          for(const E of document.querySelectorAll(".flatpickr-rContainer")){
            E.style.width = '100%';
          }
          for(const E of document.querySelectorAll(".flatpickr-weekdays")){
            E.style.height = '16%';
          }
          for(const E of document.querySelectorAll(".flatpickr-days")){
            E.style.width = '100%'; E.style.height = '84%';
          }
          for(const E of document.querySelectorAll(".dayContainer")){
            E.style.minWidth = 'none'; E.style.maxWidth = 'none';
            E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
          }
          for(const E of document.querySelectorAll(".flatpickr-day")){
            E.style.height = '100%'; E.style.lineHeight = '180%';
            E.style.maxWidth = 'none';
          }
          for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
            // e.style.color = "white";
            e.style.background = "darkgreen";
            e.style.borderColor = "darkgreen";
          }
        }
      }
    }
  },
  created(){
    let today = new Date();   
    let dataInit = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.date_from = dataInit;
    this.date_to = dataInit;
  },
  mounted(){
    this.setCalendarBase();
  },
  updated(){
    this.setCalendarBase();
  },
  watch: {
    date_from: function(val){
      this.config_to.minDate = val;
      this.$emit('setDateFrom', val);
    },
    date_to: function(val){
      this.$emit('setDateTo', val);
    }
  },
  methods: {
    setCalendarBase: function(){
      for(const E of document.querySelectorAll(".flatpickr-calendar")){
        E.style.width = window.getComputedStyle(document.querySelector("#select-from")).width;
        E.style.height = window.getComputedStyle(document.querySelector("#select-from")).height;
      }
      for(const E of document.querySelectorAll(".flatpickr-months")){
        E.style.height = '15%';
      }
      for(const E of document.querySelectorAll(".flatpickr-innerContainer")){
        E.style.height = '85%';
      }
      for(const E of document.querySelectorAll(".flatpickr-rContainer")){
        E.style.width = '100%';
      }
      for(const E of document.querySelectorAll(".flatpickr-weekdays")){
        E.style.height = '16%';
      }
      for(const E of document.querySelectorAll(".flatpickr-days")){
        E.style.width = '100%'; E.style.height = '84%';
      }
      for(const E of document.querySelectorAll(".dayContainer")){
        E.style.minWidth = 'none'; E.style.maxWidth = 'none';
        E.style.width = '100%'; E.style.height = 'calc(100% / 6)';
      }
      for(const E of document.querySelectorAll(".flatpickr-day")){
        E.style.height = '100%'; E.style.lineHeight = '180%';
        E.style.maxWidth = 'none';
      }
      for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
        // e.style.color = "white";
        e.style.background = "darkgreen";
        e.style.borderColor = "darkgreen";
      }
      // for(const e of document.querySelectorAll(".flatpickr-day")) {e.style.color = "#e8e8e8";}
      // for(const e of document.querySelectorAll(".flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay")) {e.style.color = "#6a6a6a";} 
      // for(const e of document.querySelectorAll(".flatpickr-day.flatpickr-disabled")) {e.style.color = "#2a2a2a";}
      // for(const e of document.querySelectorAll(".flatpickr-day:hover")) {e.style.color = "#1a1a1a";}
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
