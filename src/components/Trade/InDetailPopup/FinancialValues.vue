<template>
  <div id="financial-values">
      <div id="financial-values-thead">
        <table>
          <thead>
            <tr>
              <th rowspan="2">FY</th>
              <th colspan="2">REV</th>
              <th colspan="2">OP INC</th>
              <th colspan="2">NET INC</th>
              <th colspan="2">TA</th>
              <th colspan="2">TL</th>
              <th>CA / CL</th>
              <th>TE</th>
              <th>NI / NCL</th>
              <th>EPS</th>
              <th colspan="2">MARKET CAP.</th>
              <th>DIV</th>
              <th colspan="2">OPER.C/F</th>
            </tr>
            <tr>
              <th colspan="3">REV GROW.</th>
              <th colspan="3">NI / R</th>
              <th>CA</th>
              <th>NCA</th>
              <th>CL</th>
              <th>NCL</th>
              <th>CA / NCL</th>
              <th>TL / TE</th>
              <th>ROE</th>
              <th>PER</th>
              <th>PRICE</th>
              <th>S.OUT</th>
              <th>DIV.Y/R</th>
              <th>R/E</th>
              <th>C &amp; CE</th>
            </tr>
          </thead>
        </table>
      </div>
      <div id="financial-values-tbody">
        <table>
          <tbody>
            <!-- <template v-for="(e,i) in Data" :key="i"> -->
              <tr>
                <td rowspan="2">FY</td>
                <td colspan="2">REV</td>
                <td colspan="2">OP INC</td>
                <td colspan="2">NET INC</td>
                <td colspan="2">TA</td>
                <td colspan="2">TL</td>
                <td>CA / CL</td>
                <td>TE</td>
                <td>NI / NCL</td>
                <td>EPS</td>
                <td colspan="2">MARKET CAP.</td>
                <td>DIV</td>
                <td colspan="2">OPER.C/F</td>
              </tr>
              <tr>
                <td colspan="3">REV GROW.</td>
                <td colspan="3">NI / R</td>
                <td>CA</td>
                <td>NCA</td>
                <td>CL</td>
                <td>NCL</td>
                <td>CA / NCL</td>
                <td>TL / TE</td>
                <td>ROE</td>
                <td>PER</td>
                <td>PRICE</td>
                <td>S.OUT</td>
                <td>DIV.Y/R</td>
                <td>R/E</td>
                <td>C &amp; CE</td>
              </tr>
            <!-- </template> -->
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  #financial-values {
    width: 100%;
    height: 85%;
  }
  #financial-values-thead { 
    width: 140%;
    height: 12%; 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 1px solid gray;
  }
  #financial-values-thead table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  #financial-values-tbody { 
    width: 140%;
    height: calc(88% - 0.4% * 2); 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    overflow: scroll;
  }
  #financial-values-tbody table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  th {
    padding: 0.4% 1.0%;
    border: 1px solid gray;
  }
  /* th:nth-child(1) { width: 12%; border-right: 1px solid gray; }
  th:nth-child(2) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  th:nth-child(4) { width: 24%; border-left: 1px solid gray; }
  th:nth-child(5) { width: 24%; border-left: 1px solid gray; }
  tr:nth-child(odd) > th:nth-child(1) , tr:nth-child(odd) > th:nth-child(3) { vertical-align: middle; }
  tr:nth-child(odd) > th:nth-child(2) , tr:nth-child(odd) > th:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: top; }
  tr:nth-child(even) > th { vertical-align: top; }
  #financial-values-thead > table > thead > tr:nth-child(2) > th:nth-child(3) { border-right: none; }
  */
  td {
    padding: 0.4% 1.0%;
    border: 1px solid gray;
  }
  /*
  td:nth-child(1) { width: 12%; border-right: 1px solid gray; }
  td:nth-child(2) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(3) { width: 20%; border-right: 1px solid gray; }
  td:nth-child(4) { width: 24%; border-left: 1px solid gray; }
  td:nth-child(5) { width: 23.2%; border-left: 1px solid gray; }
  tr:nth-child(odd) > td:nth-child(1) , tr:nth-child(odd) > td:nth-child(3) { vertical-align: middle; text-align: center; }
  tr:nth-child(odd) > td:nth-child(2) , tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: middle; }
  tr:nth-child(even) > td { vertical-align: middle; }
  tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) , 
  tr:nth-child(even) > td:nth-child(2) , tr:nth-child(even) > td:nth-child(3) { text-align: right; }
  #financial-values-tbody > table > tbody > tr > td:nth-child(5) { border-right: 1px solid gray; }
  tr:nth-child(4n+1) > td , tr:nth-child(4n+2) > td { background:#1a1a1a; } */

</style>