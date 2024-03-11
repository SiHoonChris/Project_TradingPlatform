export default {
    install(Vue) {
        Vue.config.globalProperties.$Donut_Chart =
            function() {
                console.log('as');
            }
        // $Donut_Chart
        Vue.config.globalProperties.$Horizontal_Bar_Chart =
            function() {
                console.log('as');
            }
        // $Horizontal_Bar_Chart
    }
}