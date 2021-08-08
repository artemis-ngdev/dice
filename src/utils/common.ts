  
  export const generateResult = (chance: number, userBet: number): number => {
  
    const array = [1,2,3,4,5,6]
    const newArray = []
    //push x-change times in a new array (
    for (let x = 0; x < chance; x++) {
      newArray.push(userBet)
    }
    //remove userBet from original array
    const userBetIndex = array.indexOf(userBet);
    if (userBetIndex > -1) {
      array.splice(userBetIndex, 1);
    }
    //push x(6-chance) times a random number from the array (without the userBet number ) 
    for (let y = 0; y < (6 -chance); y++) {
         const index = Math.floor(Math.random() * array.length);
         const choice = array[index];
         newArray.push(choice)
    }
    // choose randomly a number from the newarray
    var index_ = Math.floor(Math.random() * newArray.length);
    const comingNumber = newArray[index_];
  
    return comingNumber
    };
  
    export const calculateOdd = (chance: number): number => {
    return ( chance * 100 ) / 6
    };
  
     