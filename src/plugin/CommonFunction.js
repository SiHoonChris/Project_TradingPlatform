export default {
    install(Vue) {
        Vue.config.globalProperties.$moveTo_1 = 
            function(where) {
                this.$router.push({name: where});
            } 
        // function : $moveTo_1
        Vue.config.globalProperties.$moveTo_2 = 
            function(t, n) {
                this.$router.push({name: 'detail', params: {ticker: t}});
                this.urlParam = n;
            }
        // function : $moveTo_2
        Vue.config.globalProperties.$moveTo_3 = 
            function(t) {
                this.$router.push({name: 'detail', params: {ticker: t}});
            }
        // function : $moveTo_3
    }
}