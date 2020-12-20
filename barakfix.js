function calculateBestOption(widthInput, lengthInput) {
  let opt4 = 0;
  let opt3 = 0;
  let opt2 = 0;

  let width = widthInput;
  let length = lengthInput;

  let pchatLength = length;
  let pchatWidth = null;
  let pchat = 0;

  while (width !== 0) {
    if (Math.ceil(width) / 4 >= 1) {
      opt4 = Math.floor(Math.ceil(width) / 4);

      if (width - opt4 * 4 <= 0) {
        (pchatWidth = opt4 * 4 - width), (width = 0);
      } else {
        width = width - opt4 * 4;
      }

      continue;
    } else if (Math.ceil(width) / 3 >= 1) {
      opt3 = Math.floor(Math.ceil(width) / 3);

      if (width - opt3 * 3 <= 0) {
        (pchatWidth = opt3 * 3 - width), (width = 0);
      } else {
        width = width - opt3 * 3;
      }
      continue;
    } else {
      opt2 = 1;

      if (width - opt2 * 2 < 0) {
        (pchatWidth = 2 - width), (width = 0);
      } else {
        (pchatWidth = 0), (width = 0);
      }

      continue;
    }
  }
  console.log(pchatLength);
  console.log(pchatWidth);

  pchat = pchatLength * pchatWidth;

  return { opt4, opt3, opt2, pchat };
}

console.log(calculateBestOption(9.1, 4.6));
console.log(calculateBestOption(4.6, 9.1));
