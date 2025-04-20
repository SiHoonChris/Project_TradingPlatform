<template>
  <div id="page-element">

    <div id="selected-page" @click="dropdown = !dropdown">
      <span>{{selectedPage}}</span>
      <img :src="dropdownImg" id="dropdown-img" alt="dropdown" :class="{rotated: dropdown}" />
    </div>
    
    <div v-if="dropdown" id="option-pages">
      <div v-for="(d, i) in optionPages" :key="i" class="option-page"
        @click="selectPage(d.page, d.moveTo)">
        <span>{{d.page}}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dropdownImg: require('@/assets/img/btnImg/Common/dropdown_arrow.png'),
        selectedPage : 'Home',
        optionPages : [
          {
            page: 'Home', 
            moveTo: 'home'
          },
          {
            page: 'Expense', 
            moveTo: 'expense'
          },
          {
            page: 'Profit / Loss', 
            moveTo: 'profit-loss'
          }
        ],
        dropdown: false
      }
    },
    methods: {
      selectPage: function (page, moveTo) {
        this.selectedPage = page;
        this.dropdown = false;
        this.$moveTo_1(moveTo);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/App/Header/PageElement.scss";
</style>
