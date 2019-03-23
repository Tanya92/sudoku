function checkSquare(matrix,i,j,value) {
  const row = i + 3;
  const col = j + 3;
  for (let k = i;k < row;k++) {
    for (let n = j; n < col;n++) {
      if (matrix[k][n] == value) {
        return false;
      } 
    }
  }
  return true;
}

function checkCol(matrix, j,value) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][j] == value) {
      return false;
    }
  }
  return true;
}

function checkRow(matrix, i, value) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] == value) {
      return false;
    }
  }
  return true;
}

function checkValue(matrix,row, col,value) {
  return checkCol(matrix, col, value) &&
        checkRow(matrix, row, value) &&
        checkSquare(
          matrix, 
          Math.floor(row / 3) * 3,
          Math.floor(col / 3) * 3 ,
          value)
        ;
}

function returnZeroCells(matrix) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        result.push([i,j]);
      }
    }
  }
  return result;
}
module.exports = function solveSudoku(matrix) {
  // your solution
  let zeroCells = returnZeroCells(matrix);
  const maxValue = 9;
  for (let k = 0; k < zeroCells.length;) {
    const [i, j] = zeroCells[k];
    let value = matrix[i][j] + 1;
    let solved = false;
    while (!solved && value <= maxValue) {
      if (checkValue(matrix, i, j, value)) {
        solved = true;
        k++;
        matrix[i][j] = value;
      } else {
        value++;
      }
    }
    if (!solved) {
      matrix[i][j] = 0;
      k--;
    }
  }
  return matrix;
}
           