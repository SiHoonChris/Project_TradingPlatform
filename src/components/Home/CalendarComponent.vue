<template>
  <div id="component-calendar">
    <flatPickr v-model="date_set" :config="config_set"></flatPickr>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';

  export default {
    components: { flatPickr },
    data () {
      return {
        date_set: '',
        config_set: {
          inline: true,
          enableTime: false,
          maxDate: "today", 
          onYearChange: function(){  },
          onMonthChange: function(){  }
        }
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/Home/Components/Calendar.scss";
</style>
