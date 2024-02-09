<template>
  <div id="header-center">
    <input id="search-and-go" placeholder="Name, ticker symbol, or code"/>
  </div>
</template>

<style scoped>
#header-center {
  width: calc(100vw * 0.33);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#search-and-go {
  width: 60%;
  height: 50%;
  background: #0a0a0a;
  border: 1px solid gray;
  border-radius: 6px;
  color: white;
}
::placeholder {
  color: gray;
}
</style>