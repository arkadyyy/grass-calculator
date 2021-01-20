function MinChiburNoDirection(arrX, arrY) {
  console.log("result4 : ", arrX, arrY);
  let returnedArr = [];
  for (let i = 0; i < arrX.length; i++) {
    let optX = arrX[i].opt2.amount + arrX[i].opt3.amount + arrX[i].opt4.amount;
    let optY = arrY[i].opt2.amount + arrY[i].opt3.amount + arrY[i].opt4.amount;
    if (optX === optY) {
      if (arrX[i].pchat > arrY[i].pchat) {
        returnedArr.push(arrY[i]);
      } else {
        returnedArr.push(arrX[i]);
      }
    } else {
      if (optX > optY) {
        returnedArr.push(arrY[i]);
      } else {
        returnedArr.push(arrX[i]);
      }
    }
  }
  return returnedArr;
}

export default MinChiburNoDirection;
