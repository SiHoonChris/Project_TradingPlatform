export default {
    install(Vue) {
        Vue.config.globalProperties.$moveTo_1 = 
            function(where) {
                this.$router.push({name: where});
            } 
        // function : $moveTo_1
        Vue.config.globalProperties.$moveTo_2 = 
            function(param) {
                this.$router.push({name: 'detail', params: {ticker: param}});
            }
        // function : $moveTo_2
    }
}