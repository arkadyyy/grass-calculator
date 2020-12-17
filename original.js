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
function findBestResult(s, t) {
  if (s < 2 && t < 2) {
    let l = s < t ? (2 - s).toFixed(2) : (2 - t).toFixed(2);
    return res2text([0, 0, 1], s < t ? s : t) + printLoss(l, !1);
  }
  let l = Math.ceil(s),
    e = Math.ceil(t),
    r = l - s,
    o = e - t,
    n = r * t,
    i = o * s,
    a = dividerList(l),
    g = dividerList(e);
  console.log("findBestResult resW=", a),
    console.log("findBestResult resL=", g);
  let c = a.reduce((s, t) => s + t, 0),
    u = g.reduce((s, t) => s + t, 0),
    p = "",
    f = "";
  return (
    c < u || (c >= u && n < i)
      ? ((p = grassDict.firstSolutionTitle + genSolution(a, s, t, l)),
        l % 3 == 0 && (p += printOnly3mRolls(l, t)),
        n > i &&
          ((f = grassDict.secondSolutionTitle + genSolution(g, t, s, e)),
          e % 3 == 0 && (f += printOnly3mRolls(e, s))))
      : ((p = grassDict.firstSolutionTitle + genSolution(g, t, s, e)),
        e % 3 == 0 && (p += printOnly3mRolls(e, s)),
        n < i &&
          ((f = grassDict.secondSolutionTitle + genSolution(g, t, s, e)),
          l % 3 == 0 && (f += printOnly3mRolls(l, t)))),
    p + f
  );
}
function printOnly3mRolls(s, t) {
  if (0 === t)
    return console.log("printOnly3mRolls len got zero!. internal error"), "";
  let l = Math.floor(s / 3) * t;
  if (l <= 25)
    return (
      '<p class="g_answer rollw-3">' +
      grassDict.itsPossible +
      "1 " +
      grassDict.rolls3m +
      grassDict.inLength +
      l +
      grassDict.meter +
      "</p>"
    );
  let e = Math.floor(l / 25),
    r = l % 25;
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
function genSolution(s, t, l, e) {
  if (only2m(s)) return doSingle2m(t, l);
  let r = e > 4 && e % 4 == 1;
  if (5 === e) {
    let s = ((sumRollLength([Math.round((e - 5) / 4), 1, 1]) - t) * l).toFixed(
      2
    );
    return res2text([Math.round((e - 5) / 4), 1, 1], l) + printLoss(s, !1);
  }
  let o = ((sumRollLength(s) - t) * l).toFixed(2),
    n = res2text(s, l) + printLoss(o, r);
  return (
    r &&
      ((o = ((sumRollLength([Math.round((e - 5) / 4), 1, 1]) - t) * l).toFixed(
        2
      )),
      (n +=
        '<p  class="g_answer">-----------------------------------------</p>'),
      (n += '<p  class="g_answer">' + grassDict.lessLossMoreCut + "</p>"),
      (n += res2text([Math.round((e - 5) / 4), 1, 1], l) + printLoss(o, !1))),
    n
  );
}
function only2m(s) {
  return 0 === s[0] && 0 === s[1] && s[2] > 0;
}
function doSingle2m(s, t) {
  let l = Math.floor(2 / s),
    e = (t / l).toFixed(2),
    r = Math.floor(e / 25),
    o = e % 25,
    n = "";
  return (
    r > 0 &&
      (n +=
        1 === l
          ? '<p  class="g_answer rollw-2">' +
            r +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר</p>"
          : '<p  class="g_answer rollw-2">' +
            r +
            " גליל(ים) ברוחב: 2 מטר, באורך: 25 מטר מחולקים ל- " +
            l +
            " פרוסות לרוחב.</p>"),
    o > 0 &&
      (n +=
        1 === l
          ? '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            o +
            " מטר </p>"
          : '<p  class="g_answer rollw-2">1 גליל ברוחב: 2 מטר, באורך: ' +
            o +
            " מטר מחולק ל- " +
            l +
            " פרוסות לרוחב.</p>"),
    n
  );
}
function printLoss(s, t) {
  return t
    ? '<p  class="g_answer">' +
        grassDict.lossWillBe +
        s +
        grassDict.saveOn2m +
        "</p>"
    : '<p  class="g_answer">' +
        grassDict.lossWillBe +
        s +
        grassDict.sqm +
        "</p>";
}
function sumRollLength(s) {
  let t = 0,
    l = [4, 3, 2];
  for (let e = 0; e < s.length; e++) t += s[e] * l[e];
  return t;
}
function res2text(s, t) {
  let l = "",
    e = [4, 3, 2];
  if (t <= 25) {
    for (let r = 0; r < s.length; r++)
      s[r] > 0 &&
        (l +=
          '<p  class="g_answer rollw-' +
          e[r] +
          '">' +
          s[r] +
          " גליל(ים) ברוחב: " +
          e[r] +
          " מטר, באורך: " +
          t +
          " מטר</p>");
    return l;
  }
  let r = Math.floor(t / 25);
  for (let t = 0; t < s.length; t++)
    s[t] > 0 &&
      (l +=
        '<p  class="g_answer  rollw-' +
        e[t] +
        '">' +
        r * s[t] +
        " גליל(ים) ברוחב: " +
        e[t] +
        " באורך 25 מטר</p>");
  let o = t % 25;
  if (0 === o) return l;
  l += '<p  class="g_answer">למקטע מעבר ל- ' + 25 * r + " מטר, נוסיף: </p>";
  let n = Math.floor(25 / o);
  for (let t = 0; t < s.length; t++)
    if (s[t] > 0) {
      let r = Math.floor(s[t] / n),
        i = s[t] % n;
      r > 0 &&
        (l +=
          '<p  class="g_answer  rollw-' +
          e[t] +
          '">' +
          r +
          " גליל(ים) ברוחב: " +
          e[t] +
          " מטר, בגליל " +
          n +
          " פרוסות באורך " +
          o.toFixed(2) +
          " מטר, כל אחת </p>"),
        i > 0 &&
          (l +=
            '<p  class="g_answer  rollw-' +
            e[t] +
            '">1 גליל(ים) ברוחב: ' +
            e[t] +
            " מטר, בגליל " +
            i +
            " פרוסות באורך " +
            o.toFixed(2) +
            " מטר, כל אחת </p>");
    }
  return l;
}
function dividerList(s) {
  let t = [4, 3, 2],
    l = [0, 0, 0],
    e = s;
  return (
    e >= parseInt(4) && ((l[0] = Math.floor(e / 4)), (e %= t[0])),
    e >= parseInt(3) && ((l[1] = Math.floor(e / 3)), (e %= t[1])),
    e >= parseInt(2) && ((l[2] = Math.floor(e / 2)), (e %= t[2])),
    e > 0 && (l[2] += 1),
    l
  );
}
function validInput(s, t) {
  let l = [
    "חסרים נתונים",
    "parameters must be > 0",
    "width <= length",
    "width must be <= 500 meters",
    "length must be <= 500 meters",
  ];
  return void 0 === s || void 0 === t
    ? l[0]
    : isNaN(s) || isNaN(t)
    ? l[0]
    : 0 === s || 0 === t
    ? l[1]
    : s > 500 && t > 500
    ? l[4]
    : "";
}
// jQuery("#gcalc").click(function (s) {
//   s.preventDefault(), console.log("button click");
//   let t = jQuery("#garea").val(),
//     l = parseFloat(jQuery("#gwidth").val()),
//     e = parseFloat(jQuery("#glength").val());
//   console.log("gcalc areatype=" + t + "  w=" + l + "  len= " + e),
//     jQuery(".g_answer").remove();
//   let r = validInput(l, e);
//   if ("" !== r)
//     return jQuery(".grassData").append("<p class='g_answer'>" + r + "</p>"), 0;
//   console.log(grassDict.rollList);
//   let o = findBestResult(l, e),
//     n =
//       "<div class='g_answer'><h2  class='g_answer' >" +
//       grassDict.rollList +
//       "</h2><p class='g_answer' >" +
//       o +
//       "</p></div>";
//   return jQuery(".grassData").append(n), 0;
// });

console.log(findBestResult(0.5, 0.5));
