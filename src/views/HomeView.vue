<template>
  <main id="home" @scroll="scroller">
    <div id="charts"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      datasOnPage: [], 
      N: 9
    }
  },
  methods: {
    setData(value){
      this.datasOnPage = [];    // 이전에 받은 데이터를 리셋하고
      this.datasOnPage = value; // 새 데이터를 전송받아 저장한다
      this.N = 9;               // 새로운 검색 결과에 대해서도, 최초에 표시되는 종목 수는 9개 
    },
    scroller(){
      const D = document.querySelector("main");
      if(D.scrollTop > (D.scrollHeight - D.clientHeight) * 0.98) this.N += 6;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/View.scss";
</style>