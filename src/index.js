function filterPossibleNumbers(row,possibleValues) {
  let result = possibleValues.slice();
  for (let i = 0; i < row.length; i++) {
    if (possibleValues.includes(row[i])) {
      result = result.filter(number => number != row[i]);
    }
  }
  return result;
}

function cutSquare(matrix,i,j) {
  let result = [];
  for (;i < 3;i++) {
    for (; j < 3;j++) {
      result.push(matrix[i][j]);
    }
  }
  return result;
}

function returnCol(matrix, j) {
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix[i][j]);
  }
  return result;
}

function possibleValuesForCell(matrix,row, col,possibleValues) {
  let restRow = matrix[row].slice(col+1);
  possibleValues = filterPossibleNumbers(restRow,possibleValues);
  let fullCol = returnCol(matrix, col);
  possibleValues = filterPossibleNumbers(fullCol, possibleValues);
  let squareArray = cutSquare(
    matrix,
    Math.floor(row / 3),
    Math.floor(col / 3)
  );
  possibleValues = filterPossibleNumbers(squareArray, possibleValues);
  return possibleValues;
}
module.exports = function solveSudoku(matrix) {
  // your solution
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let row = 0; row < matrix.length; row++) {
    let possibleValues = numbers.slice();
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] == 0) {
        possibleValues = possibleValuesForCell(matrix, row, col, possibleValues);
        if (possibleValues.length == 0) {
          return false;
        }
        let solved = false;
        let index = 0;
        do {
          matrix[row][col] = possibleValues[index];
          solved = solveSudoku(matrix);
          index++;
        } while (!solved)
        
      } else {
        possibleValues = possibleValues.filter(number => number != matrix[row][col]);
      }
    }
  }
  return matrix;
}

