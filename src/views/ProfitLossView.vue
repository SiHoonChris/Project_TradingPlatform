<template>
  <main id="main-profit-loss">
    <div id="profit-loss-background">
      <div id="profit-loss-select-year">
        <select v-model="selectYear">
          <option v-for="(e, i) in this.year_list" :key="i" :value="e">{{e}}</option>
        </select>
      </div>
      <div id="profit-loss-chart_n_table">
        <div id="profit-loss-chart">
          <ProfitLossChart/>
        </div>
        <div id="profit-loss-table">
          <ProfitLossTable/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProfitLossChart from '@/components/View/ProfitLoss/ProfitLossChart.vue'
import ProfitLossTable from '@/components/View/ProfitLoss/ProfitLossTable.vue'

export default {
  components: { ProfitLossChart, ProfitLossTable },
  data() {
    return {
      selectYear: 0,
      year_list: []
    }
  },
  mounted() {
    this.$http.get("/getTransactionFirstDay")
      .then(res => {
        const startYear = res.data.Year;
        const currentYear = new Date().getFullYear();
        for (let year = startYear; year <= currentYear; year++) {
            this.year_list.push(year);
        }
        this.selectYear = currentYear;
      })
      .catch(err => console.log(err));
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/ProfitLoss/View.scss";
</style>