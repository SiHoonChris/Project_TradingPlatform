<template>
  <header>
    <!-- Header (left) -->
    <div id="period-setter">
      <div id="button">
        <input type="button"
          v-for="p in ['Y', 'Q', 'M']" :key="p" :value="p"
          @click="change_btn_selected(p)"
        >
      </div>
      <div id="selectbox">
        <div v-if="['Y', 'Q', 'M'].includes(btn_selected)" id="year" class="select">
          <span>Year</span>
          <select @change="setPeriodRangeForAll(this.btn_selected)" v-model="selectedYear">
            <option v-for="(e, i) in this.years" :key="i" :value="e">{{e}}</option>
          </select>
        </div>
        <div v-if="btn_selected=='Q'" id="quarter" class="select">
          <span>Quarter</span>
          <select @change="setPeriodRangeForAll(this.btn_selected)" v-model="selectedQuarter">
            <option v-for="q in quarters" :key="q" :value="q">{{q}}</option>
          </select>
        </div>
        <div v-if="btn_selected=='M'" id="month" class="select">
          <span>Month</span>
          <select @change="setPeriodRangeForAll(this.btn_selected)" v-model="selectedMonth">
            <option v-for="m in months" :key="m" :value="m">{{m}}</option>
          </select>
        </div>
      </div>
    </div>
    <!-- Header (right) -->
    <div id="fixed-fx-rate">
      <p>
        <span>* Fixed FX Rate :</span>
        <span>1 USD = 1,200 KRW</span>
        <span>1 RMB = 200 KRW</span>
        <span>1 HKD = 180 KRW</span>
        <span>1 SGD = 900 KRW</span>
      </p>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        btn_selected: 'Y',
        years: [],
        quarters: ['Q4', 'Q3', 'Q2', 'Q1'],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        selectedYear: 0,
        selectedQuarter: 'Q4',
        selectedMonth: 1,
      }
    },
    mounted() {
      this.$http.get("/getTransactionFirstDay")
        .then(res => {
          const startYear = res.data.Year;
          const currentYear = new Date().getFullYear();
          for (let y = startYear; y <= currentYear; y++) {
            this.years.push(y);
          }
          this.selectedYear = currentYear;
        })
        .then(done => 
          this.setPeriodRangeForAll(this.btn_selected)
        )
        .catch(err => console.log(err));
    },
    methods: {
      change_btn_selected(param) {
        this.btn_selected = param;
        this.setPeriodRangeForAll(param);
      },
      setPeriodRangeForAll(period) { /* Expense, Profit 둘 다 적용 */
        let paramString = '';
        switch(period) {
          case 'Y': paramString = `${this.selectedYear}`; break;
          case 'Q': paramString = `${this.selectedYear}-${this.selectedQuarter}`; break;
          case 'M': paramString = `${this.selectedYear}-M${this.selectedMonth}`; break;
        }

        this.$store.commit("setPeriodRange", paramString);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/HeaderComponent.scss";
</style>
