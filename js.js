var grassDict = {
  rollList: "רשימת הגלילים",
  lossWillBe: " הפחת יהיה:",
  lessLossMoreCut: "או פחות פחת וחיתוך אחד נוסף: ",
  sqm: 'מ"ר ',
  saveOn2m: " מטר רבוע. ניתן לחתוך גליל 2 לחצי ולחסוך פחת",
  secondSolutionTitle: "<h5>פתרון פחות פחת</h5>",
  firstSolutionTitle: "<h5>פתרון מינימום חיתוכים</h5>",
  all3mrolls: "<p>אפשרי גם רק גלילים ברוחב 3 מטר: ",
  itsPossible: " אפשרי גם ",
  rolls3m: " גלילים ברוחב 3 מטר",
  inLength: " באורך: ",
  meter: " מטר.",
  lastRoll: "וגליל אחרון ",
};
function findBestResult(width, length) {
  if (width < 2 && length < 2) {
    let width_Ordered_Deshe =
      width < length ? (2 - width).toFixed(2) : (2 - length).toFixed(2);
    //תמיד עדיך שהצלע הגדולה תהיה הרוחב ע"מ לקבל פחת קטן יותר
    return (
      res2text([0, 0, 1], width < length ? width : length) +
      printLoss(width_Ordered_Deshe, !1)
    );

    function printLoss(width, length) {
      return length
        ? '<p  class="g_answer">' +
            grassDict.lossWillBe +
            width +
            grassDict.saveOn2m +
            "</p>"
        : '<p  class="g_answer">' +
            grassDict.lossWillBe +
            //למה לא להכפיל באורך
            width +
            grassDict.sqm +
            "</p>";
    }
  }
  let width_Ordered_Deshe = Math.ceil(width);
  let length_Ordered_Deshe = Math.ceil(length);
  let width_loss = width_Ordered_Deshe - width;
  let length_loss = length_Ordered_Deshe - length;
  let overall_loss_optA = width_loss * length;
  let overall_loss_optB = length_loss * width,
    a = dividerList(width_Ordered_Deshe),
    g = dividerList(length_Ordered_Deshe);
  console.log("findBestResult resW=", a),
    console.log("findBestResult resL=", g);
  let c = a.reduce((width, length) => width + length, 0),
    u = g.reduce((width, length) => width + length, 0),
    p = "",
    f = "";
  return (
    c < u || (c >= u && overall_loss_optA < overall_loss_optB)
      ? ((p =
          grassDict.firstSolutionTitle +
          genSolution(a, width, length, width_Ordered_Deshe)),
        width_Ordered_Deshe % 3 == 0 &&
          (p += printOnly3mRolls(width_Ordered_Deshe, length)),
        overall_loss_optA > overall_loss_optB &&
          ((f =
            grassDict.secondSolutionTitle +
            genSolution(g, length, width, length_Ordered_Deshe)),
          length_Ordered_Deshe % 3 == 0 &&
            (f += printOnly3mRolls(length_Ordered_Deshe, width))))
      : ((p =
          grassDict.firstSolutionTitle +
          genSolution(g, length, width, length_Ordered_Deshe)),
        length_Ordered_Deshe % 3 == 0 &&
          (p += printOnly3mRolls(length_Ordered_Deshe, width)),
        overall_loss_optA < overall_loss_optB &&
          ((f =
            grassDict.secondSolutionTitle +
            genSolution(g, length, width, length_Ordered_Deshe)),
          width_Ordered_Deshe % 3 == 0 &&
            (f += printOnly3mRolls(width_Ordered_Deshe, length)))),
    p + f
  );
}
function printOnly3mRolls(width, length) {
  if (0 === length)
    return console.log("printOnly3mRolls len got zero!. internal error"), "";
  let width_Ordered_Deshe = Math.floor(width / 3) * length;
  if (width_Ordered_Deshe <= 25)
    return (
      '<p class="g_answer rollw-3">' +
      grassDict.itsPossible +
      "1 " +
      grassDict.rolls3m +
      grassDict.inLength +
      width_Ordered_Deshe +
      grassDict.meter +
      "</p>"
    );
  let length_Ordered_Deshe = Math.floor(width_Ordered_Deshe / 25),
    width_loss = width_Ordered_Deshe % 25;
  console.log("3m fullR=" + length_Ordered_Deshe + "  last roll=" + width_loss);
  let length_loss =
    '<p class="g_answer rollw-3">' +
    grassDict.itsPossible +
    length_Ordered_Deshe +
    grassDict.rolls3m +
    grassDict.inLength +
    " 25 " +
    grassDict.meter +
    "</p>";
  return (
    width_loss > 0 &&
      (length_loss +=
        '<p class="g_answer rollw-3">' +
        grassDict.lastRoll +
        grassDict.inLength +
        width_loss +
        grassDict.meter +
        "</p>"),
    length_loss
  );
}
function genSolution(width, length, width_Ordered_Deshe, length_Ordered_Deshe) {
  if (only2m(width)) return doSingle2m(length, width_Ordered_Deshe);
  let width_loss = length_Ordered_Deshe > 4 && length_Ordered_Deshe % 4 == 1;
  if (5 === length_Ordered_Deshe) {
    let width = (
      (sumRollLength([Math.round((length_Ordered_Deshe - 5) / 4), 1, 1]) -
        length) *
      width_Ordered_Deshe
    ).toFixed(2);
    return (
      res2text(
        [Math.round((length_Ordered_Deshe - 5) / 4), 1, 1],
        width_Ordered_Deshe
      ) + printLoss(width, !1)
    );
  }
  let length_loss = (
      (sumRollLength(width) - length) *
      width_Ordered_Deshe
    ).toFixed(2),
    overall_loss_optA =
      res2text(width, width_Ordered_Deshe) + printLoss(length_loss, width_loss);
  return (
    width_loss &&
      ((length_loss = (
        (sumRollLength([Math.round((length_Ordered_Deshe - 5) / 4), 1, 1]) -
          length) *
        width_Ordered_Deshe
      ).toFixed(2)),
      (overall_loss_optA +=
        '<p  class="g_answer">-----------------------------------------</p>'),
      (overall_loss_optA +=
        '<p  class="g_answer">' + grassDict.lessLossMoreCut + "</p>"),
      (overall_loss_optA +=
        res2text(
          [Math.round((length_Ordered_Deshe - 5) / 4), 1, 1],
          width_Ordered_Deshe
        ) + printLoss(length_loss, !1))),
    overall_loss_optA
  );
}
function only2m(width) {
  return 0 === width[0] && 0 === width[1] && width[2] > 0;
}
function doSingle2m(width, length) {
  let width_Ordered_Deshe = Math.floor(2 / width),
    length_Ordered_Deshe = (length / width_Ordered_Deshe).toFixed(2),
    width_loss = Math.floor(length_Ordered_Deshe / 25),
    length_loss = length_Ordered_Deshe % 25,
    overall_loss_optA = "";
  return (
    width_loss > 0 &&
      (overall_loss_optA +=
        1 === width_Ordered_Deshe
          ? '<p  class="g_answer rollw-2">' +
            width_loss +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר</p>"
          : '<p  class="g_answer rollw-2">' +
            width_loss +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר מחולקים ל- " +
            width_Ordered_Deshe +
            " פרוסות לרוחב.</p>"),
    length_loss > 0 &&
      (overall_loss_optA +=
        1 === width_Ordered_Deshe
          ? '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            length_loss +
            " מטר </p>"
          : '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            length_loss +
            " מטר מחולק ל- " +
            width_Ordered_Deshe +
            " פרוסות לרוחב.</p>"),
    overall_loss_optA
  );
}
function printLoss(width, length) {
  return length
    ? '<p  class="g_answer">' +
        grassDict.lossWillBe +
        width +
        grassDict.saveOn2m +
        "</p>"
    : '<p  class="g_answer">' +
        grassDict.lossWillBe +
        width +
        grassDict.sqm +
        "</p>";
}
function sumRollLength(width) {
  let length = 0,
    width_Ordered_Deshe = [4, 3, 2];
  for (
    let length_Ordered_Deshe = 0;
    length_Ordered_Deshe < width.length;
    length_Ordered_Deshe++
  )
    length +=
      width[length_Ordered_Deshe] * width_Ordered_Deshe[length_Ordered_Deshe];
  return length;
}

function res2text(width, length) {
  let width_Ordered_Deshe = "",
    length_Ordered_Deshe = [4, 3, 2];
  if (length <= 25) {
    for (
      let overall_loss_optB = 0;
      overall_loss_optB < width.length;
      overall_loss_optB++
    )
      width[overall_loss_optB] > 0 &&
        (width_Ordered_Deshe +=
          '<p  class="g_answer rollw-' +
          length_Ordered_Deshe[overall_loss_optB] +
          '">' +
          width[overall_loss_optB] +
          " גליל(ים) ברוחב: " +
          length_Ordered_Deshe[overall_loss_optB] +
          " מטר, באורך: " +
          length +
          " מטר</p>");

    return width_Ordered_Deshe;
  }
  <p class={`g_answer rollw${length_Ordered_Deshe[width_loss]}`}>
    {
      (`גלילים ברוחב ${length_Ordered_Deshe[width_loss]} : ${width[width_loss]}`,
      `באורך : ${length} מטר`)
    }
  </p>;

  let width_loss = Math.floor(length / 25);
  for (let length = 0; length < width.length; length++)
    width[length] > 0 &&
      (width_Ordered_Deshe +=
        '<p  class="g_answer  rollw-' +
        length_Ordered_Deshe[length] +
        '">' +
        width_loss * width[length] +
        " גליל(ים) ברוחב: " +
        length_Ordered_Deshe[length] +
        " באורך 25 מטר</p>");
  let length_loss = length % 25;
  if (0 === length_loss) return width_Ordered_Deshe;
  width_Ordered_Deshe +=
    '<p  class="g_answer">למקטע מעבר ל- ' +
    25 * width_loss +
    " מטר, נוסיף: </p>";
  let overall_loss_optA = Math.floor(25 / length_loss);
  for (let length = 0; length < width.length; length++)
    if (width[length] > 0) {
      let width_loss = Math.floor(width[length] / overall_loss_optA),
        overall_loss_optB = width[length] % overall_loss_optA;
      width_loss > 0 &&
        (width_Ordered_Deshe +=
          '<p  class="g_answer  rollw-' +
          length_Ordered_Deshe[length] +
          '">' +
          width_loss +
          " גליל(ים) ברוחב: " +
          length_Ordered_Deshe[length] +
          " מטר, בגליל " +
          overall_loss_optA +
          " פרוסות באורך " +
          length_loss.toFixed(2) +
          " מטר, כל אחת </p>"),
        overall_loss_optB > 0 &&
          (width_Ordered_Deshe +=
            '<p  class="g_answer  rollw-' +
            length_Ordered_Deshe[length] +
            '">1 גליל(ים) ברוחב: ' +
            length_Ordered_Deshe[length] +
            " מטר, בגליל " +
            overall_loss_optB +
            " פרוסות באורך " +
            length_loss.toFixed(2) +
            " מטר, כל אחת </p>");
    }
  return width_Ordered_Deshe;
}

//מחשב לנו כמה חתיכות מגודל מסויים יש להזמין
function dividerList(width) {
  let widthOptions = [4, 3, 2],
    width_Ordered_Deshe = [0, 0, 0],
    width_left = width;
  return (
    width_left >= parseInt(4) &&
      ((width_Ordered_Deshe[0] = Math.floor(width_left / 4)),
      (width_left %= widthOptions[0])),
    width_left >= parseInt(3) &&
      ((width_Ordered_Deshe[1] = Math.floor(width_left / 3)),
      (width_left %= widthOptions[1])),
    width_left >= parseInt(2) &&
      ((width_Ordered_Deshe[2] = Math.floor(width_left / 2)),
      (width_left %= widthOptions[2])),
    width_left > 0 && (width_Ordered_Deshe[2] += 1),
    width_Ordered_Deshe
  );
}
function validInput(width, length) {
  let width_Ordered_Deshe = [
    "חסרים נתונים",
    "parameters must be > 0",
    "width <= length",
    "width must be <= 500 meters",
    "length must be <= 500 meters",
  ];
  return void 0 === width || void 0 === length
    ? width_Ordered_Deshe[0]
    : isNaN(width) || isNaN(length)
    ? width_Ordered_Deshe[0]
    : 0 === width || 0 === length
    ? width_Ordered_Deshe[1]
    : width > 500 && length > 500
    ? width_Ordered_Deshe[4]
    : "";
}
// jQuery("#gcalc").click(function (width) {
//   width.preventDefault(), console.log("button click");
//   let length = jQuery("#garea").val(),
//     width_Ordered_Deshe = parseFloat(jQuery("#gwidth").val()),
//     length_Ordered_Deshe = parseFloat(jQuery("#glength").val());
//   console.log(
//     "gcalc areatype=" +
//       length +
//       "  w=" +
//       width_Ordered_Deshe +
//       "  len= " +
//       length_Ordered_Deshe
//   ),
//     jQuery(".g_answer").remove();
//   let width_loss = validInput(width_Ordered_Deshe, length_Ordered_Deshe);
//   if ("" !== width_loss)
//     return (
//       jQuery(".grassData").append("<p class='g_answer'>" + width_loss + "</p>"),
//       0
//     );
//   console.log(grassDict.rollList);
//   let length_loss = findBestResult(width_Ordered_Deshe, length_Ordered_Deshe),
//     overall_loss_optA =
//       "<div class='g_answer'><h2  class='g_answer' >" +
//       grassDict.rollList +
//       "</h2><p class='g_answer' >" +
//       length_loss +
//       "</p></div>";
//   return jQuery(".grassData").append(overall_loss_optA), 0;
// });

console.log(findBestResult(4, 2));
