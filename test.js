//איקס וואי הם האורך והרוחב פעם אחת ופעם שניה הם מתהפכים

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
      width >= 4 ? (width %= 4) : (pchatWidth = 4 - width),
        console.log("width be4 ipus : " + width);
      (width = 0), console.log("pdhactwidth 4 : " + pchatWidth);
      continue;
    } else if (Math.ceil(width) / 3 >= 1) {
      opt3 = Math.floor(Math.ceil(width) / 3);
      width >= 3 ? (width %= 3) : (pchatWidth = 3 - width), (width = 0);

      continue;
    } else if (Math.ceil(width) / 2 >= 1) {
      opt2 = Math.floor(Math.ceil(width) / 2);
      width >= 2 ? (width %= 2) : (pchatWidth = 2 - width), (width = 0);

      continue;
    }
  }
  console.log(pchatLength);
  console.log(pchatWidth);

  pchat = pchatLength * pchatWidth;

  return { opt4, opt3, opt2, pchat };
}

console.log(calculateBestOption(30.2, 2.5));
// else if (width > 0) {
//     opt2 = 1;
//     width >= 2 ? width % 2 : (width = 2 - width);

//     pchatWidth = 2 - width;

//     break;
//   }
