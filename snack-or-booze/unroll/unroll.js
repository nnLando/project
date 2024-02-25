// unroll.js
function unroll(squareArray) {
    const result = [];
  
    while (squareArray.length > 0) {
      // Traverse top row
      result.push(...squareArray.shift());
  
      // Traverse right column
      for (let i = 0; i < squareArray.length; i++) {
        result.push(squareArray[i].pop());
      }
  
      // Traverse bottom row in reverse
      if (squareArray.length > 0) {
        result.push(...squareArray.pop().reverse());
      }
  
      // Traverse left column in reverse
      for (let i = squareArray.length - 1; i >= 0; i--) {
        if (squareArray[i].length > 0) {
          result.push(squareArray[i].shift());
        }
      }
    }
  
    return result;
  }
  
  module.exports = unroll;
  