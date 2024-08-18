export function portfolioEval(d, nowPrice, fxRates) {
    let latestFxRates = {
        Shanghai : fxRates["CNY/KRW"], 
        Hongkong : fxRates["HKD/KRW"],
        Singapore: fxRates["SGD/KRW"],
        Us       : fxRates["USD/KRW"],
        Korea    : 1
    };

    let nowSumDt = d.ASSETS.map(e => latestFxRates[d.DATAS[e].MARKET] * nowPrice[e] * d.DATAS[e].AMOUNT);
    let nowSum   = nowSumDt.reduce((a, b) => a + b, 0);
    let thenSum  = Object.values(d.CHART_DATA).reduce((a, b) => a + b, 0);

    let res = ((nowSum - thenSum) / thenSum) * 100;

    return [d.CHART_DATA, thenSum, parseFloat(res.toFixed(2))]; 
}
