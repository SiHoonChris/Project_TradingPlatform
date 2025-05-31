<template>
  <header>
    <!-- Header (left) -->
    <div id="period-setter">
      <div id="button">
        <input type="button" value="Y" @click="change_btn_selected('Y')">
        <input type="button" value="Q" @click="change_btn_selected('Q')">
        <input type="button" value="M" @click="change_btn_selected('M')">
      </div>
      <div id="selectbox">
        <div v-if="['Y', 'Q', 'M'].includes(btn_selected)" id="year" class="select">
          <span>Year</span>
          <select>
            <option>2025</option>
          </select>
        </div>
        <div v-if="btn_selected=='Q'" id="quarter" class="select">
          <span>Quarter</span>
          <select>
            <option v-for="q in quarters" :key="q" :value="q">{{q}}</option>
          </select>
        </div>
        <div v-if="btn_selected=='M'" id="month" class="select">
          <span>Month</span>
          <select>
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
        quarters: ['4Q', '3Q', '2Q', '1Q'],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    methods: {
      change_btn_selected(param) {
        this.btn_selected = param;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/HeaderComponent.scss";
</style>
