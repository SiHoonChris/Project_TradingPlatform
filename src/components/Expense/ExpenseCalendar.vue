<template>
  <div id="period-select" @click="activation()">
    <span id="dateFrom">2023.05.01</span>
    <span>~</span>
    <span id="dateTo">2023.06.01</span>
  </div>
  <!-- <div id="transaction-calendar">
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
  </div> -->
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// import { setCalendarBaseStyle } from '../../assets/js/Transaction/TransactionCalendar.js'

export default {
  components: { flatPickr },
  data() {
    return {
      expansion: false,
      date_from: null, 
      config_from: {
        inline: true,
        enableTime: false, 
        maxDate: "today", 
        onYearChange: function(){ setCalendarBaseStyle(); },
        onMonthChange: function(){ setCalendarBaseStyle(); }
      },
      date_to: null, 
      config_to: {
        inline: true,
        enableTime: false, 
        minDate: null, 
        maxDate: "today", 
        onYearChange: function(){ setCalendarBaseStyle(); },
        onMonthChange: function(){ setCalendarBaseStyle(); }
      }
    }
  },
  created(){
    let today = new Date(); 
    let dataInit = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; 
    [this.date_from, this.date_to] = [dataInit, dataInit]; 
  },
  mounted(){
    // setCalendarBaseStyle(); 
  },
  updated(){
    // setCalendarBaseStyle(); 
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
    activation: function(){
      this.expansion = !this.expansion;
      document.getElementById('period-select').style.position = this.expansion ? 'absolute' : 'relative';
      document.getElementById('period-select').style.marginLeft = this.expansion ? '46px' : '0px';
      document.getElementById('period-select').style.width = this.expansion ? '400px' : '180px';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Expense/Components/Calendar.scss";
</style>