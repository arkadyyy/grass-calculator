const calculateBestOption = (widthInput, lengthInput) => {
  let opt4 = { amount: 0, length: 0 };
  let opt3 = { amount: 0, length: 0 };
  let opt2 = { amount: 0, length: 0 };

  let width = widthInput;
  let length = lengthInput;

  let pchatLength = length;
  let pchatWidth = null;
  let pchat = 0;

  while (width !== 0) {
    if (width % 2 === 0) {
      if (Math.ceil(width) / 4 >= 1) {
        opt4.amount = Math.floor(Math.ceil(width) / 4);
        opt4.length = length;
        if (width - opt4.amount * 4 <= 0) {
          pchatWidth = opt4.amount * 4 - width;

          width = 0;
        } else {
          width = width - opt4.amount * 4;
        }

        continue;
      } else if (Math.ceil(width) / 3 >= 1) {
        opt3.amount = Math.floor(Math.ceil(width) / 3);
        opt3.length = length;
        if (width - opt3.amount * 3 <= 0) {
          pchatWidth = opt3.amount * 3 - width;
          width = 0;
        } else {
          width = width - opt3.amount * 3;
        }
        continue;
      } else {
        opt2.amount = 1;
        opt2.length = length;
        if (width - opt2.amount * 2 < 0) {
          pchatWidth = 2 - width;
          width = 0;
        } else {
          pchatWidth = 0;
          width = 0;
        }

        continue;
      }
    } else if (Math.ceil(width) % 2 !== 0) {
      if (width <= 3 && width >= 2) {
        opt3.amount = 1;
        opt3.length = length;
        pchatWidth = opt3.amount * 3 - width;
        width = 0;
      } else if (width < 2) {
        opt2.amount = 1;
        opt2.length = length;
        pchatWidth = opt2.amount * 2 - width;
        width = 0;
      } else if (width < 4 && width > 3) {
        opt4.amount = 1;
        opt4.length = length;
        pchatWidth = opt4.amount * 4 - width;
        width = 0;
      }

      opt3.amount = 1;
      width -= 3;
      opt3.length = length;
      continue;
    }
  }
  //   console.log(pchatLength);
  //   console.log(pchatWidth);

  pchat = pchatLength * pchatWidth;

  return { opt4, opt3, opt2, pchat };
};

console.log(calculateBestOption(2.5, 2.4));
