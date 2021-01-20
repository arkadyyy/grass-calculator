import "../App.css";
import Konva from "../components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  InputGroup,
  FormControl,
  Modal,
  Form,
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardColumns,
} from "react-bootstrap";
import { useEffect, useState } from "react";
// import calculateBestOption from "../calculator";
import ChiburCalc from "../chiburCalc";
import PchatWithDirection from "../PchatWithDirection";
import MinChiburNoDirection from "../minChiburNoDirection";
import MinChiburWithDirection from "../minChiburWithDirection";
import ControlledTabs from "../components/ControlledTabs";

////////////////////////////////////////////////////////////////////////

function Home({ history }) {
  //all squares entered
  const [squares, setsquares] = useState([]);

  //best result for client considering pchat only ("pchat" = loss)
  const [resultForClientPchat, setresultForClientPchat] = useState([]);

  //best result for client considering pchat and direction ("direction"= means - the direction the grass would streatch out )
  const [resultPchatWithDirection, setresultPchatWithDirection] = useState([]);

  //resultMinChiburNoDirection- "Chibur"= connection."no direction"- not consider the grass direction)
  const [resultMinChiburNoDirection, setResultMinChiburNoDirection] = useState(
    []
  );
  //resultMinChiburWithDirection- "Chibur"= connection."no direction"- not consider the grass direction)
  const [
    resultMinChiburWithDirection,
    setResultMinChiburWithDirection,
  ] = useState([]);

  //best result for client considering connections only ("connections" means- the numbar of piece we use, sometimes the customer prefare to have los but not to have more pieces)
  // considering the grass direction - giving solutions for each direction
  //all x axis
  const [x_directionResultForClient, setX_DirectionResultForClient] = useState(
    []
  );

  //all y axis results
  const [y_directionResultForClient, setY_DirectionResultForClient] = useState(
    []
  );

  //summary state

  const [summary, setSummary] = useState({
    minPchatSummary: {
      opt2: 0,
      opt2length: 0,
      opt3: 0,
      opt3length: 0,
      opt4: 0,
      opt4length: 0,
      pchat: 0,
    },
    minPchatWithDirectionSummary: {
      opt2: 0,
      opt2length: 0,
      opt3: 0,
      opt3length: 0,
      opt4: 0,
      opt4length: 0,
      pchat: 0,
    },
    minChiburNoDirection: {
      opt2: 0,
      opt2length: 0,
      opt3: 0,
      opt3length: 0,
      opt4: 0,
      opt4length: 0,
      pchat: 0,
    },

    minChiburWithDirection: {
      opt2: 0,
      opt2length: 0,
      opt3: 0,
      opt3length: 0,
      opt4: 0,
      opt4length: 0,
      pchat: 0,
    },
  });

  //input values
  const [width, setwidth] = useState(0);
  const [length, setlength] = useState(0);

  //squares color
  const [color, setColor] = useState(getRandomColour());
  const [titleColor, setTitleColor] = useState(getRandomColour());

  function getRandomColour() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + " )";
  }

  const [openSummary, setopenSummary] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    bestResult();
    console.log("summary : ", summary);
  }, [squares]);

  useEffect(() => {
    bestResultPchatWithDirection();
    bestMinChiburNoDirection();
    bestMinChiburWithDirection();
  }, [x_directionResultForClient]);

  function bestMinChiburWithDirection() {
    let result5 = MinChiburWithDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );
    console.log("result5:", result5);
    setResultMinChiburWithDirection(result5);
  }

  function bestMinChiburNoDirection() {
    let result4 = MinChiburNoDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );

    setResultMinChiburNoDirection(result4);
  }

  // function bestResultPchatWithDirection() {
  //   let result3 = PchatWithDirection(
  //     x_directionResultForClient,
  //     y_directionResultForClient
  //   );

  //   setresultPchatWithDirection(result3);
  // }

  function bestResultPchatWithDirection() {
    if (squares.length === 1) {
      setresultPchatWithDirection(resultForClientPchat);
    } else {
      let result3 = PchatWithDirection(
        x_directionResultForClient,
        y_directionResultForClient
      );

      setresultPchatWithDirection(result3);
    }
  }

  function summaryAllOptions() {
    // "P"=Pchat. not considering the direction
    let opt2AmountP = 0;
    let opt2lengthP = 0;
    let opt3AmountP = 0;
    let opt3lengthP = 0;
    let opt4AmountP = 0;
    let opt4lengthP = 0;
    let pchatP = 0;
    resultForClientPchat.forEach((square) => {
      opt2AmountP += square.opt2.amount;
      opt2lengthP += square.opt2.length * square.opt2.amount;
      opt3AmountP += square.opt3.amount;
      opt3lengthP += square.opt3.length * square.opt3.amount;
      opt4AmountP += square.opt4.amount;
      opt4lengthP += square.opt4.length * square.opt4.amount;
      pchatP += square.pchat;
    });
    // "PD"=Pchat+ considering the Direction
    let opt2AmountPD = 0;
    let opt2lengthPD = 0;
    let opt3AmountPD = 0;
    let opt3lengthPD = 0;
    let opt4AmountPD = 0;
    let opt4lengthPD = 0;
    let pchatPD = 0;

    resultPchatWithDirection.forEach((square) => {
      opt2AmountPD += square.opt2.amount;
      opt2lengthPD += square.opt2.length * square.opt2.amount;
      opt3AmountPD += square.opt3.amount;
      opt3lengthPD += square.opt3.length * square.opt3.amount;
      opt4AmountPD += square.opt4.amount;
      opt4lengthPD += square.opt4.length * square.opt4.amount;
      pchatPD += square.pchat;
    });
    // result  of Min "Chiburim" (connections) Not consider Direction
    let opt2AmountC = 0;
    let opt2lengthC = 0;
    let opt3AmountC = 0;
    let opt3lengthC = 0;
    let opt4AmountC = 0;
    let opt4lengthC = 0;
    let pchatC = 0;

    resultMinChiburNoDirection.forEach((square) => {
      opt2AmountC += square.opt2.amount;
      opt2lengthC += square.opt2.length * square.opt2.amount;
      opt3AmountC += square.opt3.amount;
      opt3lengthC += square.opt3.length * square.opt3.amount;
      opt4AmountC += square.opt4.amount;
      opt4lengthC += square.opt4.length * square.opt4.amount;
      pchatC += square.pchat;
    });

    // result  of Min "Chiburim" (connections) + consider Direction
    let opt2AmountCD = 0;
    let opt2lengthCD = 0;
    let opt3AmountCD = 0;
    let opt3lengthCD = 0;
    let opt4AmountCD = 0;
    let opt4lengthCD = 0;
    let pchatCD = 0;

    resultMinChiburWithDirection.forEach((square, index) => {
      opt2AmountCD += square.opt2.amount;
      opt2lengthCD += square.opt2.length * square.opt2.amount;
      opt3AmountCD += square.opt3.amount;
      opt3lengthCD += square.opt3.length * square.opt3.amount;
      opt4AmountCD += square.opt4.amount;
      opt4lengthCD += square.opt4.length * square.opt4.amount;
      pchatCD += square.pchat;
    });

    setSummary({
      ...summary,
      minPchatSummary: {
        title: `מינימום פחת`,
        description: `ניצול מירבי של גלילי הדשא שהזומנו`,
        opt2: opt2AmountP,
        opt2length: opt2lengthP,
        opt3: opt3AmountP,
        opt3length: opt3lengthP,
        opt4: opt4AmountP,
        opt4length: opt4lengthP,
        pchat: pchatP.toFixed(2),
      },
      minPchatWithDirectionSummary: {
        title: `מינימום פחת + כיוון סיב אחיד בין הגלילים`,
        description:
          "  ניצול מירבי של גלילי הדשא שהוזמנו בתנאי של שמירה על כיוון פריסה אחיד של כל הגלילים",
        opt2: opt2AmountPD,
        opt2length: opt2lengthPD,
        opt3: opt3AmountPD,
        opt3length: opt3lengthPD,
        opt4: opt4AmountPD,
        opt4length: opt4lengthPD,
        pchat: pchatPD.toFixed(2),
      },
      minChiburNoDirection: {
        title: "מינימום חיבורים",
        description: "כיסוי השטח עם מספר מינימלי של גלילי דשא סינטטי ",
        opt2: opt2AmountC,
        opt2length: opt2lengthC,
        opt3: opt3AmountC,
        opt3length: opt3lengthC,
        opt4: opt4AmountC,
        opt4length: opt4lengthC,
        pchat: pchatC.toFixed(2),
      },
      minChiburWithDirection: {
        title: `מינימום חיבורים + כיוון סיב אחיד בין הגלילים`,
        description: `מינימום חיבורים + כיוון סיב אחיד בין הגלילים`,
        opt2: opt2AmountCD,
        opt2length: opt2lengthCD,
        opt3: opt3AmountCD,
        opt3length: opt3lengthCD,
        opt4: opt4AmountCD,
        opt4length: opt4lengthCD,
        pchat: pchatCD.toFixed(2),
      },
    });
  }

  function bestResult() {
    squares.forEach((square) => {
      //  פחת מינימלי בלי כיוון פריסה
      // min pchat no direction consider

      let result1 = ChiburCalc(square[0], square[1], square[2]);
      let result2 = ChiburCalc(square[1], square[0], square[2]);
      if (result1.pchat === result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
      } else if (result1.pchat < result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
      } else {
        let inputLength = result2.initialWidth;
        let inputWidth = result2.initialLength;
        result2.initialWidth = inputWidth;
        result2.initialLength = inputLength;
        setresultForClientPchat([...resultForClientPchat, result2]);
      }

      // כיוון פריסה
      setX_DirectionResultForClient([...x_directionResultForClient, result1]);
      let inputLength = result2.initialWidth;
      let inputWidth = result2.initialLength;
      result2.initialWidth = inputWidth;
      result2.initialLength = inputLength;
      setY_DirectionResultForClient([...y_directionResultForClient, result2]);
    });

    summaryAllOptions();
  }

  return (
    <>
      <div className='App'>
        <Container>
          <InputGroup
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
            className=' mt-5  '
          >
            <h1 style={{ textAlign: "right" }}> מחשבון דשא סינטטי</h1>
            <span>
              יש להזין נתוני אורך ורוחב עבור כל משטח שמיועד לכיסוי בדשא
            </span>
            <span>לאחר מכן יש לבחור בכפתור הוסף מלבן </span>
            <span>
              במידה וישנו משטח נוסף לכיסוי יש לחזור על התהליך ולהוסיף מלבן נוסף{" "}
            </span>
            <span>
              לאחר הזנת כל המשטחים יש להקיש חשב ולגלול לתחתית המסך על מנת לראות
              את האפשרויות המוצעות
            </span>
            <span>ניתן לגרור את המשטחים בעזרת העכבר על מנת לדמות את השטח</span>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                className='buttons'
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <Button
                  disabled={display}
                  size='sm'
                  onClick={() => {
                    setColor(getRandomColour());
                    setTitleColor(getRandomColour());
                    setsquares([...squares, [+width, +length, color, 100, 50]]);
                    setwidth("");
                    setlength("");
                    summaryAllOptions();
                  }}
                  className='m-3'
                  variant='success'
                >
                  הוסף מלבן
                </Button>
                <Button
                  disabled={display}
                  size='sm'
                  className='m-3'
                  variant='success'
                  onClick={() => {
                    setopenSummary(true);
                    setDisplay(true);
                    summaryAllOptions();
                  }}
                >
                  חשב
                </Button>
                <Button
                  size='sm'
                  onClick={() => {
                    setsquares([]);
                    setresultForClientPchat([]);
                    setSummary([]);
                    setwidth(0);
                    setlength(0);
                    setResultMinChiburNoDirection([]);
                    setResultMinChiburWithDirection([]);
                    setX_DirectionResultForClient([]);
                    setY_DirectionResultForClient([]);
                    setresultPchatWithDirection([]);
                    setopenSummary(false);
                    setDisplay(false);
                  }}
                  className='m-3'
                  variant='success'
                >
                  נקה
                </Button>
              </div>
              <div>
                <Form.Label>
                  <strong style={{ textAlign: "right" }}> רוחב במטרים</strong>
                </Form.Label>
                <FormControl
                  value={width}
                  style={{
                    height: "2rem",
                    direction: "rtl",
                    maxHeight: "2rem",
                  }}
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                  id='width'
                  onChange={(e) => {
                    setwidth(e.target.value);
                  }}
                />
              </div>
              <div>
                <Form.Label>
                  <strong>אורך מטרים</strong>
                </Form.Label>
                <FormControl
                  value={length}
                  style={{ direction: "rtl", maxHeight: "2rem" }}
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                  id='length'
                  onChange={(e) => {
                    setlength(e.target.value);
                  }}
                />
              </div>
            </div>
          </InputGroup>
        </Container>
      </div>
      <Konva type='top' squares={squares} setsquares={setsquares} />

      <hr></hr>

      {openSummary && (
        <div className='summary'>
          <h3
            style={{
              textAlign: "right",
              marginRight: "3rem",
              marginBottom: "3rem",
            }}
          >
            אלו התוצאות האפשריות עבורכם - יש לבחור את האפשרות המועדפת
          </h3>

          <ControlledTabs
            summary={summary}
            x_directionResultForClient={x_directionResultForClient}
            y_directionResultForClient={y_directionResultForClient}
            resultForClientPchat={resultForClientPchat}
            squares={squares}
            setsquares={setsquares}
            resultPchatWithDirection={resultPchatWithDirection}
            resultMinChiburWithDirection={resultMinChiburWithDirection}
            resultMinChiburNoDirection={resultMinChiburNoDirection}
          />
        </div>
      )}
    </>
  );
}

export default Home;
