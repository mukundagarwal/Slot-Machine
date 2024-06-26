var maxProfit = function(prices) {
    let profit = 0;
    if(prices.indexOf(Math.min(...prices))!=prices.length-1)
    {
    let buy=0;
    let sell = 0;
    //you cannot buy on the last day therefore making another array with n-1 elements
    let arr=[];
    for(let i=0;i<prices.length;i++)
    arr.push(prices[i]);

    arr.splice(prices.length-1,1);
    //finding the min in this arr
    const min = Math.min(...arr);
    //finding index of min 
    buy = prices.indexOf(min);
    arr=[];
    for(let i=buy+1; i<prices.length;i++){
        arr.push(prices[i]);
    }

    const max = Math.max(...arr);
    sell = arr.indexOf(max);
    profit = max-min;
    }
    return profit;
};
