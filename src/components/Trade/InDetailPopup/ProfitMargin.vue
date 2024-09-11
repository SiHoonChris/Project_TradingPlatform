<template>
  <div id="profit-margin"></div>
</template>

<script>
export default {
  date(){
    return {
      Data: null
    }
  },
  created(){
    this.Data = [ { "profit": "Rev",      "size": 282836 },
                  { "profit": "Oper_Inc", "size": 74842  },
                  { "profit": "Net_Inc",  "size": 59972  } ];
  },
  mounted(){
    this.$Horizontal_Bar_Chart(this.Data, "#profit-margin");
  }
}
</script>

<style scoped>
  #profit-margin {
    width: 50%;
    height: 100%;
  }
</style>