<template>
  <div id="BuyAndSell">
    <div id="select-trade">
      <label>
        <input type="radio" name="select-trade" id="select-buy" checked/><div>Buy</div>
      </label>
      <label>
        <input type="radio" name="select-trade" id="select-sell"/><div>Sell</div>
      </label>
    </div>
    <div id="select-quantity">
      <input type="number" id="price" placeholder="price"/>
      <input type="number" id="amount" placeholder="amount"/>
      <input type="number" id="total" placeholder="total" readonly/>
    </div>
    <div id="decision">
      <button>BUY</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  #BuyAndSell{
    width: 100%;
    height: 100%;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #select-trade {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  #select-trade label {
    width: 44%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
  }
  #select-trade label:hover { cursor: pointer; }
  #select-trade label:nth-child(1){ background: green; }
  #select-trade label:nth-child(2){ background: red; }
  #select-trade label input { display: none; }
  
  #select-quantity {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #select-quantity input{
    width: 86%;
    height: 20%;
    padding-left: 1%;
    background: black;
    border: 1px solid gray;
    color: white;
  }
  #select-quantity input:nth-child(2){
    margin: 5% 0;
  }
  ::placeholder {
    color: gray;
    font-size: 14px;
  }

  #decision {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #decision button {
    width: 88%;
    height: 60%;
    background: green;
    font-size: 16px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
</style>