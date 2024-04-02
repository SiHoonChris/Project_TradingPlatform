export default {
    install(Vue) {
        Vue.config.globalProperties.$Popup = 
            function(mode) {
                let [on, off] = ['flex', 'none'];
                document.querySelector('#popup-container').style.display = `${eval(mode)}`;
            }
    }
}