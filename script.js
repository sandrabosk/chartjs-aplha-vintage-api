// official API's docs: https://www.alphavantage.co/documentation/

const api_key = "demo";
const function_name = "TIME_SERIES_DAILY";
const symbol_name = "MSFT";
const api_url = `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol_name}&apikey=${api_key}`;

axios.get(api_url)
.then(responseFromAPI => {
    console.log("The response from API: ", responseFromAPI);
    // printTheChart(responseFromAPI.data);
})
.catch(err => {
    console.log("Error while getting the data: ",  err);
});


const printTheChart = (stockData => {
    let daily_stockData;
    for(let key in stockData){
        if (key === "Time Series (Daily)"){
            daily_stockData = stockData[key];
        }
    }

    const stockLabels = [];
    const stockPrices = [];
    Object.entries(daily_stockData).forEach(singleEntry => {
        stockLabels.push(singleEntry[0]); 
        for(let key in singleEntry[1]){
            if(key === "4. close"){
                stockPrices.push(singleEntry[1][key]);
            }
        }
    });
    // console.log('klklkl ', daily_stockData);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices,
        }]
      }
    });
  }
);