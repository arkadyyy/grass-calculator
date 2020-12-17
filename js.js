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
    let loss =
      width < length ? (2 - width).toFixed(2) : (2 - length).toFixed(2);
    //תמיד עדיך שהצלע הגדולה תהיה הרוחב ע"מ לקבל פחת קטן יותר
    return (
      res2text([0, 0, 1], width < length ? width : length) + printLoss(loss, !1)
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
  let loss = Math.ceil(width),
    e = Math.ceil(length),
    r = loss - width,
    o = e - length,
    n = r * length,
    i = o * width,
    a = dividerList(loss),
    g = dividerList(e);
  console.log("findBestResult resW=", a),
    console.log("findBestResult resL=", g);
  let c = a.reduce((width, length) => width + length, 0),
    u = g.reduce((width, length) => width + length, 0),
    p = "",
    f = "";
  return (
    c < u || (c >= u && n < i)
      ? ((p =
          grassDict.firstSolutionTitle + genSolution(a, width, length, loss)),
        loss % 3 == 0 && (p += printOnly3mRolls(loss, length)),
        n > i &&
          ((f =
            grassDict.secondSolutionTitle + genSolution(g, length, width, e)),
          e % 3 == 0 && (f += printOnly3mRolls(e, width))))
      : ((p = grassDict.firstSolutionTitle + genSolution(g, length, width, e)),
        e % 3 == 0 && (p += printOnly3mRolls(e, width)),
        n < i &&
          ((f =
            grassDict.secondSolutionTitle + genSolution(g, length, width, e)),
          loss % 3 == 0 && (f += printOnly3mRolls(loss, length)))),
    p + f
  );
}
function printOnly3mRolls(width, length) {
  if (0 === length)
    return console.log("printOnly3mRolls len got zero!. internal error"), "";
  let loss = Math.floor(width / 3) * length;
  if (loss <= 25)
    return (
      '<p class="g_answer rollw-3">' +
      grassDict.itsPossible +
      "1 " +
      grassDict.rolls3m +
      grassDict.inLength +
      loss +
      grassDict.meter +
      "</p>"
    );
  let e = Math.floor(loss / 25),
    r = loss % 25;
  console.log("3m fullR=" + e + "  last roll=" + r);
  let o =
    '<p class="g_answer rollw-3">' +
    grassDict.itsPossible +
    e +
    grassDict.rolls3m +
    grassDict.inLength +
    " 25 " +
    grassDict.meter +
    "</p>";
  return (
    r > 0 &&
      (o +=
        '<p class="g_answer rollw-3">' +
        grassDict.lastRoll +
        grassDict.inLength +
        r +
        grassDict.meter +
        "</p>"),
    o
  );
}
function genSolution(width, length, loss, e) {
  if (only2m(width)) return doSingle2m(length, loss);
  let r = e > 4 && e % 4 == 1;
  if (5 === e) {
    let width = (
      (sumRollLength([Math.round((e - 5) / 4), 1, 1]) - length) *
      loss
    ).toFixed(2);
    return (
      res2text([Math.round((e - 5) / 4), 1, 1], loss) + printLoss(width, !1)
    );
  }
  let o = ((sumRollLength(width) - length) * loss).toFixed(2),
    n = res2text(width, loss) + printLoss(o, r);
  return (
    r &&
      ((o = (
        (sumRollLength([Math.round((e - 5) / 4), 1, 1]) - length) *
        loss
      ).toFixed(2)),
      (n +=
        '<p  class="g_answer">-----------------------------------------</p>'),
      (n += '<p  class="g_answer">' + grassDict.lessLossMoreCut + "</p>"),
      (n +=
        res2text([Math.round((e - 5) / 4), 1, 1], loss) + printLoss(o, !1))),
    n
  );
}
function only2m(width) {
  return 0 === width[0] && 0 === width[1] && width[2] > 0;
}
function doSingle2m(width, length) {
  let loss = Math.floor(2 / width),
    e = (length / loss).toFixed(2),
    r = Math.floor(e / 25),
    o = e % 25,
    n = "";
  return (
    r > 0 &&
      (n +=
        1 === loss
          ? '<p  class="g_answer rollw-2">' +
            r +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר</p>"
          : '<p  class="g_answer rollw-2">' +
            r +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר מחולקים ל- " +
            loss +
            " פרוסות לרוחב.</p>"),
    o > 0 &&
      (n +=
        1 === loss
          ? '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            o +
            " מטר </p>"
          : '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            o +
            " מטר מחולק ל- " +
            loss +
            " פרוסות לרוחב.</p>"),
    n
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
    loss = [4, 3, 2];
  for (let e = 0; e < width.length; e++) length += width[e] * loss[e];
  return length;
}
function res2text(width, length) {
  let loss = "",
    e = [4, 3, 2];
  if (length <= 25) {
    for (let i = 0; i < width.length; i++)
      width[i] > 0 &&
        (loss +=
          '<p  class="g_answer rollw-' +
          e[i] +
          '">' +
          width[i] +
          " גליל(ים) ברוחב: " +
          e[i] +
          " מטר, באורך: " +
          length +
          " מטר</p>");

    return loss;
  }
  <p class={`g_answer rollw${e[r]}`}>
    {`גלילים ברוחב ${e[r]} : ${width[r]}`},{`באורך : ${length} מטר`}
  </p>;

  let r = Math.floor(length / 25);
  for (let length = 0; length < width.length; length++)
    width[length] > 0 &&
      (loss +=
        '<p  class="g_answer  rollw-' +
        e[length] +
        '">' +
        r * width[length] +
        " גליל(ים) ברוחב: " +
        e[length] +
        " באורך 25 מטר</p>");
  let o = length % 25;
  if (0 === o) return loss;
  loss += '<p  class="g_answer">למקטע מעבר ל- ' + 25 * r + " מטר, נוסיף: </p>";
  let n = Math.floor(25 / o);
  for (let length = 0; length < width.length; length++)
    if (width[length] > 0) {
      let r = Math.floor(width[length] / n),
        i = width[length] % n;
      r > 0 &&
        (loss +=
          '<p  class="g_answer  rollw-' +
          e[length] +
          '">' +
          r +
          " גליל(ים) ברוחב: " +
          e[length] +
          " מטר, בגליל " +
          n +
          " פרוסות באורך " +
          o.toFixed(2) +
          " מטר, כל אחת </p>"),
        i > 0 &&
          (loss +=
            '<p  class="g_answer  rollw-' +
            e[length] +
            '">1 גליל(ים) ברוחב: ' +
            e[length] +
            " מטר, בגליל " +
            i +
            " פרוסות באורך " +
            o.toFixed(2) +
            " מטר, כל אחת </p>");
    }
  return loss;
}
function dividerList(width) {
  let length = [4, 3, 2],
    loss = [0, 0, 0],
    e = width;
  return (
    e >= parseInt(4) && ((loss[0] = Math.floor(e / 4)), (e %= length[0])),
    e >= parseInt(3) && ((loss[1] = Math.floor(e / 3)), (e %= length[1])),
    e >= parseInt(2) && ((loss[2] = Math.floor(e / 2)), (e %= length[2])),
    e > 0 && (loss[2] += 1),
    loss
  );
}
function validInput(width, length) {
  let loss = [
    "חסרים נתונים",
    "parameters must be > 0",
    "width <= length",
    "width must be <= 500 meters",
    "length must be <= 500 meters",
  ];
  return void 0 === width || void 0 === length
    ? loss[0]
    : isNaN(width) || isNaN(length)
    ? loss[0]
    : 0 === width || 0 === length
    ? loss[1]
    : width > 500 && length > 500
    ? loss[4]
    : "";
}
jQuery("#gcalc").click(function (width) {
  width.preventDefault(), console.log("button click");
  let length = jQuery("#garea").val(),
    loss = parseFloat(jQuery("#gwidth").val()),
    e = parseFloat(jQuery("#glength").val());
  console.log("gcalc areatype=" + length + "  w=" + loss + "  len= " + e),
    jQuery(".g_answer").remove();
  let r = validInput(loss, e);
  if ("" !== r)
    return jQuery(".grassData").append("<p class='g_answer'>" + r + "</p>"), 0;
  console.log(grassDict.rollList);
  let o = findBestResult(loss, e),
    n =
      "<div class='g_answer'><h2  class='g_answer' >" +
      grassDict.rollList +
      "</h2><p class='g_answer' >" +
      o +
      "</p></div>";
  return jQuery(".grassData").append(n), 0;
});
