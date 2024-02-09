<template>
  <nav id="header-right">
    <span @click="moveTo('portfolios')">Portfolio</span>
    <span @click="moveTo('transactions')">Transaction</span>
    <span @click="moveTo('financialStatements')">Statements</span>
  </nav>
</template>

<script>
export default {
  methods: {
    moveTo(where) {
      this.$router.push({name: where});
    }
  }
}
</script>

<style scoped>
#header-right {
  width: calc(100vw * 0.33);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
}
span {
  font-size: 1.3vw;
  font-weight: bold;
  color: darkgray;
  cursor: pointer;
  margin-left: 2.6vw;
}
span:last-child {
  margin-right: 1.4vw; 
}
span:hover{
  color: white;
}
</style>