export default {
    install(Vue) {
        Vue.config.globalProperties.$Horizontal_Bar_Chart =
            function() {
                console.log('as');
            }
        // $Horizontal_Bar_Chart
    }
}