export default {
    install(Vue) {
        Vue.config.globalProperties.$setPeriodAsc = 
            function(addr){
                switch(this.PeriodCategory) {
                    case 'QUARTER': // Quarter > Year
                        this.PeriodCategory = 'YEAR';
                        this.$getDatasPerYear(`${addr}/per-year`);
                        this.WidePeriod = null;
                    break;
                    case 'MONTH': // Month > Quarter
                        this.PeriodCategory = 'QUARTER';
                        this.$getDatasPerQuarter(`${addr}/per-quarter`, this.YearValue);
                        this.WidePeriod = this.YearValue;
                    break;
                }
            };
        Vue.config.globalProperties.$setPeriodDesc = 
            function(addr, d){
                switch(this.PeriodCategory) {
                    case 'YEAR': // Year > Quarter
                        this.PeriodCategory = 'QUARTER';
                        this.$getDatasPerQuarter(`${addr}/per-quarter`, d);
                        this.WidePeriod = d;
                    break;
                    case 'QUARTER': // Quarter > Month
                        this.PeriodCategory = 'MONTH';
                        this.YearValue = this.WidePeriod; 
                        this.$getDatasPerMonth(`${addr}/per-month`, this.YearValue, d[0]);
                        this.WidePeriod = d;
                    break;
                }
            };
        Vue.config.globalProperties.$getDatasPerYear = 
            function(addr){
                this.$http.get(addr)
                    .then(res => this.DATA = res.data)
                    .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
            };
        Vue.config.globalProperties.$getDatasPerQuarter = 
            function(addr, param_year){
                this.$http.get(addr, {params: { YEAR: param_year }})
                    .then(res => this.DATA = res.data)
                    .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
            };
        Vue.config.globalProperties.$getDatasPerMonth = 
            function(addr, param_year, param_quarter){
                this.$http.get(addr, {params: { YEAR: param_year , QUARTER: param_quarter }})
                    .then(res => this.DATA = res.data)
                    .catch(err => {if(err.message.indexOf('Network Error') > -1) alert('Error')});
            };
    }
}