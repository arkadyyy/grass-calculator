function MinChiburNoDirection(arrX, arrY) {
  let returnedArr = [];

  for (let i = 0; i < arrX.length; i++) {
    let optX = arrX[i].opt2 + arrX[i].opt3 + arrX[i].opt4;
    let optY = arrY[i].opt2 + arrY[i].opt3 + arrY[i].opt4;

    if (optX === optY) {
      if (arrX[i].pchat > arrY[i].pchat) {
        returnedArr.push(arrY[i]);
      } else {
        returnedArr.push(arrX[i]);
      }
    } else if (optX > optY) {
      returnedArr.push(optY[i]);
    } else {
      returnedArr.push(optX[i]);
    }
  }

  return returnedArr;
}

export default MinChiburNoDirection;
