function PchatWithDirection(arrX, arrY) {
  let resultX = arrX.reduce((acc, curVal) => {
    acc += curVal.pchat;
  }, 0);
  let resultY = arrY.reduce((acc, curVal) => {
    acc += curVal.pchat;
  }, 0);

  if (resultX === resultY) {
    let resultXConnections = arrX.reduce((acc, curVal) => {
      acc += curVal.opt2 + curVal.opt3 + curVal.opt4;
      
    }, 0);

    let resultYConnections = arrY.reduce((acc, curVal) => {
      acc += curVal.opt2 + curVal.opt3 + curVal.opt4;
    }, 0);

    if (resultXConnections >= resultYConnections) {
      return arrY;
    } else {
      return arrX;
    }
  } else {
    if (resultX > resultY) {
      return arrY;
    } else {
      return arrX;
    }
  }
}

export default PchatWithDirection;
