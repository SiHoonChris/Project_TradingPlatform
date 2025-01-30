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
        dividend_list: [],
        date_set: '',
        config_set: {
          inline: true,
          enableTime: false,
          onYearChange: function(){  },
          onMonthChange: function(){  }
        }
      }
    },
    mounted(){
      // 1. 선택된 날짜를 서버로 전송
      // 2. 선택된 날짜에 배당 일정이 있는 종목을 검색 (검색 대상 : 보유종목, 관심종목)
      //    (보유종목 테이블과 관심종목 테이블 Union 하기)
      // 3. 결과 전송 - dividend_list 배열에 값 입력
      this.dividend_list = [
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
        ]
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Calendar.scss";
</style>
