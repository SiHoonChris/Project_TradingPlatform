<template>
  <div id="financial-report">
    <div id="financial-report-thead">
      <table>
        <thead>
          <tr>
            <th>Form type</th>
            <th>Form Description</th>
            <th>Filing Date</th>
            <th>Reporting Date</th>
          </tr>
        </thead>
      </table>
    </div>
    <div id="financial-report-tbody">
      <table>
        <tbody>
          <tr>
            <td>Form</td>
            <td>Form Description</td>
            <td>F Date</td>
            <td>R Date</td>
          </tr>
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
  #financial-report {
    width: 100%;
    height: 85%;
  }
  #financial-report-thead { 
    height: 12%; 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-top: 1px solid gray;
  }
  #financial-report-thead table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  #financial-report-tbody { 
    height: calc(88% - 0.4% * 2); 
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    overflow-y: scroll;
  }
  #financial-report-tbody table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    color: white;
  }
  th {
    padding: 0.4% 1.0%;
    border-bottom: 1px solid gray;
  }
  th:nth-child(1) { width: 8%; border-right: 1px solid gray; }
  th:nth-child(2) { width: 64%; border-right: 1px solid gray; }
  th:nth-child(3) { width: 14%; border-right: 1px solid gray; }
  th:nth-child(4) { width: 14%; border-left: 1px solid gray; }
  /* tr:nth-child(odd) > th:nth-child(1) , tr:nth-child(odd) > th:nth-child(3) { vertical-align: middle; }
  tr:nth-child(odd) > th:nth-child(2) , tr:nth-child(odd) > th:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: top; }
  tr:nth-child(even) > th { vertical-align: top; } */
  /* #transaction-list-thead > table > thead > tr:nth-child(2) > th:nth-child(3) { border-right: none; } */
  td {
    padding: 0.4% 1.0%;
    border-bottom: 1px solid gray;
  }
  td:nth-child(1) { width: 8%; border-right: 1px solid gray; }
  td:nth-child(2) { width: 64%; border-right: 1px solid gray; }
  td:nth-child(3) { width: 14%; border-right: 1px solid gray; }
  td:nth-child(4) { width: 13.2%; border-left: 1px solid gray; }
  /* tr:nth-child(odd) > td:nth-child(1) , tr:nth-child(odd) > td:nth-child(3) { vertical-align: middle; text-align: center; }
  tr:nth-child(odd) > td:nth-child(2) , tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) { vertical-align: middle; }
  tr:nth-child(even) > td { vertical-align: middle; }
  tr:nth-child(odd) > td:nth-child(4) , tr:nth-child(odd) > td:nth-child(5) , 
  tr:nth-child(even) > td:nth-child(2) , tr:nth-child(even) > td:nth-child(3) { text-align: right; }
  #transaction-list-tbody > table > tbody > tr > td:nth-child(5) { border-right: 1px solid gray; }
  tr:nth-child(4n+1) > td , tr:nth-child(4n+2) > td { background:#1a1a1a; } */

</style>