<template>
  <div id="transaction-calendar">
    <div id="from-calendar">
      <p>FROM</p>
      <div id="select-from"></div>
    </div>
    <div id="to-calendar">
      <p>TO</p>
      <div id="select-to"></div>
    </div>
  </div>
</template>

<style scoped>
  #transaction-calendar {
    width: 72%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #from-calendar, #to-calendar {
    width: 100%;
    height: 45%;
  }
  p {
    margin: 0;
    padding-left: 2%;
    padding-bottom: 1%;
    height: 9%;
    color: white;
    font-weight: bold;
  }
  #select-from, #select-to {
    width: 100%;
    height: 90%;
    border: 1px solid gray;
  }
</style>