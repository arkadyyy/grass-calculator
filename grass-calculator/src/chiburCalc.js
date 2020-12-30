const ChiburCalc = (widthInput, lengthInput) => {
  let opt4 = { amount: 0, length: 0 };
  let opt3 = { amount: 0, length: 0 };
  let opt2 = { amount: 0, length: 0 };

  let width = widthInput;
  let length = lengthInput;

  let pchatLength = length;
  let pchatWidth = null;
  let pchat = 0;

  while (width !== 0) {
    // console.log("it stuck here XXXXXXXXX");
    if (Math.ceil(width) % 2 === 0) {
      // console.log("it stuck here @@@@@@@@@@");
      if (Math.ceil(width) / 4 >= 1) {
        // console.log("it stuck here #########");
        opt4.amount = Math.floor(Math.ceil(width) / 4);
        opt4.length = length.toFixed(2);
        if (width - opt4.amount * 4 <= 0) {
          pchatWidth = (opt4.amount * 4 - width).toFixed(2);
          // console.log("it stuck here $$$$$$$$$");
          width = 0;
        } else {
          width = (width - opt4.amount * 4).toFixed(2);
          // console.log("it stuck here &&&&&&&&&");
        }

        continue;
      } else if (Math.ceil(width) / 3 >= 1) {
        // console.log("it stuck here ^^^^^^^^^^^");
        opt3.amount = Math.floor(Math.ceil(width) / 3);
        opt3.length = +length.toFixed(2);
        if (width - opt3.amount * 3 <= 0) {
          // console.log("it stuck here %%%%%%%%");
          pchatWidth = (opt3.amount * 3 - width).toFixed(2);
          width = 0;
        } else {
          // console.log("it stuck here ~~~~~~~~");
          width = width - opt3.amount * 3;
        }
        continue;
      } else {
        // console.log("it stuck here ++++++++");
        opt2.amount = 1;
        opt2.length = +length.toFixed(2);
        if (width - opt2.amount * 2 < 0) {
          pchatWidth = (2 - width).toFixed(2);
          width = 0;
        } else {
          pchatWidth = 0;
          width = 0;
          // console.log("it stuck here \\\\\\\\\\");
        }

        continue;
      }
    } else if (Math.ceil(width) % 2 !== 0) {
      // console.log("it stuck here 3333333");
      if (width <= 3 && width >= 2) {
        // console.log("it stuck here 4444444");
        opt3.amount = 1;
        opt3.length = +length.toFixed(2);
        pchatWidth = (opt3.amount * 3 - width).toFixed(2);
        width = 0;
        continue;
      } else if (width < 2) {
        // console.log("it stuck here 555555");
        opt2.amount = 1;
        opt2.length = +length.toFixed(2);
        pchatWidth = (opt2.amount * 2 - width).toFixed(2);
        width = 0;
        continue;
      } else if (width < 4 && width > 3) {
        // console.log("it stuck here 66666666");
        opt4.amount = 1;
        opt4.length = +length.toFixed(2);
        pchatWidth = (opt4.amount * 4 - width).toFixed(2);
        width = 0;
        continue;
      }

      opt3.amount = 1;
      width -= 3;
      opt3.length = +length.toFixed(2);
      continue;
    }
  }

  pchat = +(pchatLength * pchatWidth).toFixed(2);

  return { opt4, opt3, opt2, pchat };
};

// console.log(ChiburCalc(5.01, 2.03));
// console.log(ChiburCalc(2.03, 5.01));
export default ChiburCalc;
