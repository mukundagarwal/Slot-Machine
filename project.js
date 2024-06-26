//1. Deposit some money
//2. Determine no. of lines to bet
//3. Ask user how much to bet
//4. Spin the slot machine 
//5. Check if the user won 
//6. give user their winnings
//7. play again


//import prompt-sync package to get user input
const prompt = require("prompt-sync")();
//declaring size of machine as global variables
const ROWS = 3;
const COlS = 3;
//symbols in each row
const SYMBOLS_COUNT = {
     A: 8,
     B: 6,
     C: 4,
     D: 4
};
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};





//deposit 
function deposit(){
    while(true){
//input comes in a string
let depositAmount = prompt('Enter a deposit amount: ');
//converting depostAmount to an integer
depositAmount = parseFloat(depositAmount);
 if(isNaN(depositAmount)||depositAmount<=0)
 console.log('Invalid amount ,try again.');
 else 
 return depositAmount;
    }
  
};
const depositAmount = deposit();

const getNumberOfLines = ()=>{
    while(true){
        let numberOfLines = prompt('Enter the no. of lines you want to bet on (1-3): ');
        numberOfLines = parseFloat(numberOfLines);
         if(isNaN(numberOfLines)||numberOfLines<=0 || numberOfLines>3)
         console.log('Invalid no. of lines, try again.');
         else 
         return numberOfLines;
            }
};

//collecting the bet amount 
const getBet = (balance,numberOfLines) => {
    while(true){
        let betAmount = prompt('Enter the amount of bet you want on each line: ');
        betAmount = parseFloat(betAmount);
        //since bet is on each line therefore total money you can bet should be less than balance/no. of lines
         if(isNaN(betAmount)||betAmount<=0 || betAmount>balance/numberOfLines)
         console.log('Invalid bet, try again.');
         else 
         return betAmount;
            }
};

//update balance 
const updateBalance = (balance,betAmount,winnings,numberOfLines)=>{
    return (balance-(betAmount*numberOfLines)+winnings);
};

//spin the slot machine
const spin = () => {
    let symbols = [];
    //object.enteries returns array of arrays
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        //pushing no. of Symbols in symbols using count
        for(let i =0; i<count; i++){
            symbols.push(symbol);
            //all symbols are in the symbols array
        }
    }
    const reels = [];
    for(let i=0; i<COlS; i++){
        reels.push([]);
        //...copies the symbols array to the reelSymbols
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reels;

};


//first transpose the reels array for cols to be vertical
const transpose = (reels)=>{
    const rows = [];
    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0;j<COlS;j++)
        rows[i].push(reels[j][i])
    }
    return rows;
};
 
 //print reels
 const print=(reels)=>{
    for(const row of reels){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString+= symbol;
            if(i!=row.length-1)
            rowString+=" | ";

        }
        console.log(rowString);
    }
 };
  
//check winnings
 const checkWin= (reels,betAmount,numberOfLines) =>{
    let winnings =0;
    for(let row=0 ; row<numberOfLines; row++){
        const symbols = reels[row];
        let allSame = true;

        for(const symbol of symbols){
             if(symbol != symbols[0]){
                allSame = false;
                break;
             }
        }
        if (allSame){
            winnings += betAmount* SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
 }; 


 
 //playing again

 const game = () =>{
    let balance = depositAmount;
    //balance and deposit amount will not be looped 

    while(true){
    const numberOfLines = getNumberOfLines();
    const betAmount = getBet(balance,numberOfLines);
    //displaying all relevant data
    console.log('Your bet amount is: '+ betAmount +'\nLeft Balance is: '+balance);
    let reels = spin();
    reels = transpose(reels);
    print(reels);  
    const winnings = checkWin(reels,betAmount,numberOfLines);
     console.log('Your Winnings are: '+winnings);
     balance = updateBalance(balance,betAmount,winnings,numberOfLines);
    console.log('Your Current Balance is: '+ balance);

    if(balance<=0){
        console.log("Not Enough Balance!");
        break;
    }
    const playAgain = prompt("Do you want to play again (y/n)?");
    if(playAgain != "y"){
        break;
    }
  
    }
 };
 game();
 console.log("Thank you for playing the game.");