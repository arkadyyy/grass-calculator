function pchatWithDirection(arrX, arrY) {
  resultX = arrX.reduce((acc, curVal) => {
    acc += curVal.pchat;
  }, 0);
  resultY = arrX.reduce((acc, curVal) => {
    acc += curVal.pchat;
  }, 0);

  if (resultX === resultY) {
    resultXConnections = arrX.reduce((acc, curVal) => {
      acc += curVal.forEach((element) => {
        return element.opt2 + element.opt3 + element.opt4;
      });
    }, 0);

    resultYConnections = arrY.reduce((acc, curVal) => {
      acc += curVal.forEach((element) => {
        return element.opt2 + element.opt3 + element.opt4;
      });
    }, 0);

    if (resultXConnections >= resultYConnections) {
      return arrY;
    } else {
      return arrX;
    }
  } else if (resultX > resultY) {
    return arrY;
  } else {
    return arrX;
  }
}

export default pchatWithDirection;
