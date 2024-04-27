export default {
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