export default { // 2개 이상의 Component에서 사용되는 함수는 plugin으로 정의, 아니면 assets/js에 module로 작성
    install(Vue) {
        Vue.config.globalProperties.$moveTo_1 = 
            function(where) {
                this.$router.push({name: where});
            } 
        // function : $moveTo_1
        Vue.config.globalProperties.$moveTo_2 = 
            function(T) {
                this.$router.push({name: 'trade', params: {ticker: T}});
            }
        // function : $moveTo_2
        Vue.config.globalProperties.$moveTo_3 = 
            function(T) {
                this.$moveTo_2(T);
                this.urlParam = null;
                this.Suggestions = [];
            }
        // function : $moveTo_3
    }
}