<template>
  <div id="component-calendar">
    <flatPickr v-model="date_set" :config="config_set"></flatPickr>
    <div :id="dividendPart">
      <div id="dividend-title" style="border-bottom: 1px solid #333333;">
        <p>Dividend Payment</p>
      </div>
      <ul id="dividend-list">
        <li v-for="(dividend_name, idx) in dividend_list" :key="idx">
          <p @click="this.$moveToChartPage_Click(dividend_name)">{{dividend_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    components: { flatPickr },
    data () {
      return {
        dividendPart: 'list-dividend-payment',
        dividend_list: [
          'AAPL',
          'TSLA',
          'CRM',
          'LLY',
          'NVDA',
          'MSFT',
          'GOOGL',
          'PG',
          'XOM',
          'META',
          '005930'
        ],
        date_set: '',
        config_set: {
          inline: true,
          enableTime: false,
          onYearChange: function(){  },
          onMonthChange: function(){  }
        }
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Calendar.scss";
</style>
