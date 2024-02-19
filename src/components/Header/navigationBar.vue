<template>
  <nav id="header-right">
    <span @click="$moveTo_1('portfolios')">Portfolio</span>
    <span @click="$moveTo_1('transactions')">Transaction</span>
    <span @click="$moveTo_1('financialStatements')">Statements</span>
  </nav>
</template>

<script>
export default {
  
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
  color: whitesmoke;
}
</style>