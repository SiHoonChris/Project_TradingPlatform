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
import { setCalendarBaseStyle } from '../../assets/js/Transaction/TransactionCalendar.js'

export default {
  components: { flatPickr },
  data() {
    return {
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
    setCalendarBaseStyle(); 
  },
  updated(){
    setCalendarBaseStyle(); 
  },
  watch: {
    date_from: function(val){
      this.config_to.minDate = val;
      this.$emit('setDateFrom', val);
    },
    date_to: function(val){
      this.$emit('setDateTo', val);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Transactions/Calendar.scss";
</style>