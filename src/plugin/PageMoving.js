export default { // 2개 이상의 Component에서 사용되는 함수는 plugin으로 정의, 아니면 assets/js에 module로 작성
    install(Vue) {
        Vue.config.globalProperties.$moveTo_1 = 
            function(where) {
                this.$router.push({name: where});
            } 
        // function : $moveTo_1

        Vue.config.globalProperties.$moveToChartPage_Click = 
            function(T) {
                this.$router.push({name: 'chart', params: {ticker: T}});
            } 
        // function : $moveToChartPage_Click
        Vue.config.globalProperties.$moveTo_2 = /* $moveToChartPage_Search */
            function(T) {
                this.$router.push({name: 'chart', params: {ticker: T}});
                this.urlParam = null;
                this.$store.commit("saveSearchLog", T);
            }
        // function : $moveTo_2
    }
}