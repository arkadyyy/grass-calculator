function MinChiburNoDirection(arrX, arrY) {
  let returnedArr = [];

  for (let i = 0; i < arrX.length; i++) {
    let test = arrX[i].opt2;
    console.log("test : ", test);
    let optX = arrX[i].opt2.amount + arrX[i].opt3.amount + arrX[i].opt4.amount;
    console.log(optX);
    let optY = arrY[i].opt2.amount + arrY[i].opt3.amount + arrY[i].opt4.amount;
    console.log(optY);
    if (optX === optY) {
      if (arrX[i].pchat > arrY[i].pchat) {
        returnedArr.push(arrY[i]);
      } else {
        returnedArr.push(arrX[i]);
      }
    }

    if (optX > optY) {
      returnedArr.push(optY[i]);
    } else {
      returnedArr.push(optX[i]);
    }
  }

  return returnedArr;
}

export default MinChiburNoDirection;
