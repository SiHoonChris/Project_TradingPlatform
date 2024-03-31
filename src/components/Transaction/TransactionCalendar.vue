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

        },
        onMonthChange: function(){

        },
        onChange: function(){

        }
      },
      date_to: null, 
      config_to: {
        inline: true,
        enableTime: false,
        minDate: null,
        maxDate: "today",
        onYearChange: function(){

        },
        onMonthChange: function(){

        },
        onChange: function(){
          
        }
      },
      WIDTH: null,
      HEIGHT: null
    }
  },
  created(){
    let today = new Date();   
    let dataInit = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    this.date_from = dataInit;
    this.date_to = dataInit;
  },
  mounted(){
    this.WIDTH = window.getComputedStyle(document.querySelector("#select-from")).width.replace('px', '');
    this.HEIGHT = window.getComputedStyle(document.querySelector("#select-from")).height.replace('px', '');
    
    this.setCalendarBase(this.WIDTH, this.HEIGHT);
    this.setSizeOfDayContainer(this.WIDTH, this.HEIGHT);
    this.setSizeOfDays(this.WIDTH);
    this.setFontColors();
  },
  updated(){
    this.setSizeOfDayContainer(this.WIDTH, this.HEIGHT);
    this.setSizeOfDays(this.WIDTH);
    this.setFontColors();
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
    setCalendarBase: function(w, h){
      for(const E of document.querySelectorAll(".flatpickr-calendar")){
        E.style.width = String(w)+'px';
        E.style.height = String(h)+'px';
        E.style.top = '0px';
        E.style.bottom = '0px';
        // E.style.background= "#000";
      }
      for(const E of document.querySelectorAll(".flatpickr-current-month")){E.style.paddingTop = '2px';}
      for(const E of document.querySelectorAll(".flatpickr-months span")){E.style.paddingTop = '6px';}
      for(const E of document.querySelectorAll(".flatpickr-weekdays")){E.style.width = String(w)+'px';}
    },
    setSizeOfDayContainer: function(w, h) {
      const W = String(w)+'px';
      const H = String(h - window.getComputedStyle(document.querySelectorAll(".flatpickr-weekdays")[0]).height.replace('px', '')
                         - window.getComputedStyle(document.querySelectorAll(".flatpickr-months")[0]).height.replace('px', '')
                )+'px';
      for(const E of document.querySelectorAll(".flatpickr-days")){E.style.width = W;}
      for(const E of document.querySelectorAll(".dayContainer")){
        E.style.height = H;
        E.style.width = W;
        E.style.maxWidth = W;
      }
    },
    setSizeOfDays: function(w) {
      const rowsNum = document.querySelectorAll(".dayContainer .flatpickr-day").length > 35 ? 6 : 5;
      const H = String(window.getComputedStyle(document.querySelectorAll(".dayContainer")[0]).height.replace('px', '') / rowsNum)+'px';
      const W = String(w / 7)+'px';
      for(const E of document.querySelectorAll(".dayContainer .flatpickr-day")){
        E.style.maxWidth = W;
        E.style.height = H;
        E.style.lineHeight = H;
      }
    },
    setFontColors: function() {
      for(const e of document.querySelectorAll(".flatpickr-day.selected")) {
        e.style.background = "darkgreen";
        e.style.borderColor = "darkgreen";
      }
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
