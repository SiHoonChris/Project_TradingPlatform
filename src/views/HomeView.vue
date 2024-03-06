<template>
  <main id="home" @scroll="scroller">
    <SearchAndSort @datas="setData"/>
    <div id="charts">
      <ThumbnailChart v-for="(e, i) in datasOnPage.slice(0, this.N)" :key="i"
                      :name="e.NAME" :ticker="e.TICKER" :trend="e.TREND" :hold="e.HOLD"/>
    </div>
  </main>
</template>

<script>
import SearchAndSort from "@/components/Home/SearchAndSort.vue"
import ThumbnailChart from "@/components/Home/ThumbnailChart.vue"

export default {
  components: { SearchAndSort, ThumbnailChart },
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
#home {
  width: 96vw;
  height: 92vh;
  padding: 0 2vw;
  margin: 0;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
}
#home::-webkit-scrollbar-track {
	background-color: black;
}
#home::-webkit-scrollbar {
	background-color: black;
	width: 9px;
}
#home::-webkit-scrollbar-thumb {
	border-radius: 30px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #333;
}

#charts {
  width: 98vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

</style>
