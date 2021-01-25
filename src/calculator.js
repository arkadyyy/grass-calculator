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
  }
  

  pchat = pchatLength * pchatWidth;

  return { opt4, opt3, opt2, pchat };
};

export default calculateBestOption;
