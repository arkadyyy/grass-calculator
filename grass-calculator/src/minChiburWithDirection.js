function MinChiburWithDirection(arrX, arrY) {
  console.log("arrX,arrY:", arrX, arrY);
  let optX = 0;
  let optY = 0;
  let optXPchat = 0;
  let optYPchat = 0;

  for (let i = 0; i < arrX.length; i++) {
    optX += +arrX[i].opt2.amount + +arrX[i].opt3.amount + +arrX[i].opt4.amount;
    optY += +arrY[i].opt2.amount + +arrY[i].opt3.amount + +arrY[i].opt4.amount;
    optXPchat += +arrX[i].pchat;
    optYPchat += +arrY[i].pchat;
    console.log("optX:", optX);
    console.log("optY:", optY);
    console.log("optXPchat:", optXPchat);
    console.log("optyPchat:", optYPchat);
  }
  if (optX < optY) {
    return arrX;
  } else if (optX > optY) {
    return arrY;
  } else {
    if (optXPchat < optYPchat) {
      return arrX;
    } else if (optXPchat > optYPchat) {
      return arrY;
    } else {
      return arrX;
    }
  }
}
export default MinChiburWithDirection;
