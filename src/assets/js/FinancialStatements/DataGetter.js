// FinancialStatement Plugin => Module 작업은 추후에

const $http = require('axios');
let resultData;

function setPeriodAsc(varPC, addr, varYV) {
    let PeriodCategory, WidePeriod;

    switch(varPC) {
        case 'QUARTER': // Quarter > Year
            PeriodCategory = 'YEAR';
            getDatasPerYear(`${addr}/per-year`);
            WidePeriod = null;
        break;
        case 'MONTH': // Month > Quarter
            PeriodCategory = 'QUARTER';
            getDatasPerQuarter(`${addr}/per-quarter`, varYV);
            WidePeriod = varYV;
        break;
    }

    return [PeriodCategory, resultData, WidePeriod];
}
function setPeriodDesc(varPC, addr, varWP, param_WP, varYV) {
    let PeriodCategory, YearValue, WidePeriod;

    switch(varPC) {
        case 'YEAR': // Year > Quarter
            PeriodCategory = 'QUARTER';
            YearValue = ''; 
            getDatasPerQuarter(`${addr}/per-quarter`, param_WP);
            WidePeriod = param_WP;
        break;
        case 'QUARTER': // Quarter > Month
            PeriodCategory = 'MONTH';
            YearValue = varWP; 
            getDatasPerMonth(`${addr}/per-month`, varYV, param_WP[0]);
            WidePeriod = param_WP;
        break;
    }

    return [PeriodCategory, YearValue, resultData, WidePeriod];
}

function getDatasPerYear(addr) {
    $http.get(addr)
        .then(res => resultData = res.data)
        .catch(err => console.log(err));
}
function getDatasPerQuarter(addr, param_year) {
    $http.get(addr, {params: { YEAR: param_year }})
        .then(res => resultData = res.data)
        .catch(err => console.log(err));
}
function getDatasPerMonth(addr, param_year, param_quarter) {
    $http.get(addr, {params: { YEAR: param_year , QUARTER: param_quarter }})
        .then(res => resultData = res.data)
        .catch(err => console.log(err));
}


export { setPeriodAsc , setPeriodDesc };
