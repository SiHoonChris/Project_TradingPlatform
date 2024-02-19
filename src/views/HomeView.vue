<template>
  <main @scroll="scroller">
    <SearchMethod @datas="setData"/>
    <div id="charts">
      <ThumbnailChart v-for="(e, i) in datasOnPage.slice(0, this.N)" :key="i"
        :name="e.name" :ticker="e.ticker" :trend="e.trend" :hold="e.hold"/>
    </div>
  </main>
</template>

<script>
import SearchMethod from "@/components/Home/SearchMethod.vue"
import ThumbnailChart from "@/components/Home/ThumbnailChart.vue"

export default {
  components: { SearchMethod, ThumbnailChart },
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

<style scoped>
main {
  width: 100vw;
  height: 92vh;
  margin: 0;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
}
main::-webkit-scrollbar-track {
	background-color: black;
}
main::-webkit-scrollbar {
	background-color: black;
	width: 10px;
}
main::-webkit-scrollbar-thumb {
	border-radius: 30px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #333;
}

#charts {
    margin-left: 2vw;
    width: 98vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

</style>
