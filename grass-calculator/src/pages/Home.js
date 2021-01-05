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

  function bestResultPchatWithDirection() {
    let result3 = PchatWithDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );

    setresultPchatWithDirection(result3);
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
      opt2lengthP += square.opt2.length;
      opt3AmountP += square.opt3.amount;
      opt3lengthP += square.opt3.length;
      opt4AmountP += square.opt4.amount;
      opt4lengthP += square.opt4.length;
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
      opt2lengthPD += square.opt2.length;
      opt3AmountPD += square.opt3.amount;
      opt3lengthPD += square.opt3.length;
      opt4AmountPD += square.opt4.amount;
      opt4lengthPD += square.opt4.length;
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
      opt2lengthC += square.opt2.length;
      opt3AmountC += square.opt3.amount;
      opt3lengthC += square.opt3.length;
      opt4AmountC += square.opt4.amount;
      opt4lengthC += square.opt4.length;
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

    resultMinChiburWithDirection.forEach((square) => {
      opt2AmountCD += square.opt2.amount;
      opt2lengthCD += square.opt2.length;
      opt3AmountCD += square.opt3.amount;
      opt3lengthCD += square.opt3.length;
      opt4AmountCD += square.opt4.amount;
      opt4lengthCD += square.opt4.length;
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
        pchat: pchatPD,
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
        pchat: pchatC,
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
        pchat: pchatCD,
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

  function ControlledTabs() {
    const [key, setKey] = useState(
      "מינימום חיבורים + כיוון סיב אחיד בין הגלילים"
    );
    return (
      <>
        <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)}>
          {Object.entries(summary).map(([objKey, value], i) => (
            // {/* <Tab eventKey="מינימום פחת + כיוון סיב אחיד" title= "מינימום פחת + כיוון סיב אחיד"> */}
            <Tab eventKey={value.title} title={value.title}>
              {/* <Container style={{ textAlign: "right", display:"flex", flexDirection:"column", alignItems:"center"}}> */}
              <Row style={{ direction: "rtl" }}>
                <Col sm={6}>
                  <Card
                    className='my-5'
                    border='secondary'
                    style={{ width: "100%" }}
                  >
                    <>
                      <Card.Body
                      // style={{
                      //   display: "grid",
                      //   gridAutoColumns: "auto auto",
                      //   gridTemplateRows:'150px'
                      // }}
                      >
                        <Row md={12}>
                          <Col
                            md={3}
                            style={{ padding: "1rem", margin: "1rem" }}
                          >
                            <Card.Text style={{ textAlign: "right" }}>
                              <strong> סה"כ גלילים ברוחב 2 מטר </strong>
                              <hr></hr>
                              <span>כמות: {value.opt2}</span>
                              <br></br>
                              <span> באורך: {value.opt2length}</span>
                              <br></br>
                            </Card.Text>
                            <Card.Text style={{ textAlign: "right" }}>
                              <strong> סה"כ גלילים ברוחב 3 מטר </strong>
                              <hr></hr>
                              <span>כמות: {value.opt3}</span>
                              <br></br>
                              <span> באורך: {value.opt3length}</span>
                              <br></br>
                            </Card.Text>
                          </Col>
                          <Col>
                            <Card.Text style={{ textAlign: "right" }}>
                              <strong> סה"כ גלילים ברוחב 4 מטר </strong>
                              <hr></hr>
                              <span>כמות: {value.opt4}</span>
                              <br></br>
                              <span> באורך: {value.opt4length}</span>
                              <br></br>
                            </Card.Text>
                            <Card.Text style={{ textAlign: "right" }}>
                              <strong> סה"כ פחת </strong>
                              <hr></hr>
                              <span>מ"ר{value.pchat}</span>
                              <br></br>
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Konva
                    resultForClientPchat={resultForClientPchat}
                    xDirectionSquare={x_directionResultForClient}
                    yDirectionSquare={y_directionResultForClient}
                    summary={summary}
                    tabKey={key}
                    type='bottom'
                    squares={squares}
                    setsquares={setsquares}
                  />
                </Col>
              </Row>
              {/* </Container> */}
            </Tab>
          ))}
        </Tabs>

        <h3 style={{ textAlign: "center" }}>פירוט האפשרויות השונות </h3>

        {key === "מינימום פחת" && (
          <>
            <strong>מינימום פחת-פירוט</strong>
            <br></br>
            <Container>
              <Row>
                {resultForClientPchat.map((square, index) => {
                  return (
                    <>
                      <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                        <Card
                          border='dark'
                          //  bg={'secondary'}
                          // bg={variant.toLowerCase()}
                          // key={idx}
                          // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                          text={"black"}
                          style={{ width: "18rem" }}
                          className='mb-2'
                        >
                          <Card.Title style={{ background: `${square.color}` }}>
                            מלבן מספר {index + 1} אורך {square.initialLength}{" "}
                            רוחב{square.initialWidth}
                          </Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount
                              ? ` סה"כ גלילים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `
                              : null}
                            {square.opt4.amount ? <br></br> : null}
                            {square.opt3.amount
                              ? ` סה"כ גלילים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `
                              : null}
                            {square.opt3.amount ? <br></br> : null}
                            {square.opt2.amount
                              ? ` סה"כ גלילים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `
                              : null}
                            {square.opt2.amount ? <br></br> : null}
                            פחת{square.pchat} מ"ר
                            <hr></hr>
                          </Card.Text>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </>
        )}

        {key === "מינימום פחת + כיוון סיב אחיד בין הגלילים" && (
          <>
            <strong>מינימום פחת + כיוון סיב אחיד בין הגלילים-פירוט</strong>
            <br></br>
            <Container>
              <Row>
                {resultPchatWithDirection.map((square, index) => {
                  return (
                    <>
                      <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                        <Card border='dark' style={{ width: "18rem" }}>
                          <Card.Title style={{ background: `${square.color}` }}>
                            מלבן מספר {index + 1} אורך {square.initialLength}{" "}
                            רוחב{square.initialWidth}
                          </Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount
                              ? ` סה"כ גלילים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `
                              : null}
                            {square.opt4.amount ? <br></br> : null}
                            {square.opt3.amount
                              ? ` סה"כ גלילים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `
                              : null}
                            {square.opt3.amount ? <br></br> : null}
                            {square.opt2.amount
                              ? ` סה"כ גלילים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `
                              : null}
                            {square.opt2.amount ? <br></br> : null}
                            פחת{square.pchat} מ"ר
                            <hr></hr>
                          </Card.Text>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </>
        )}

        {key === "מינימום חיבורים" && (
          <>
            <strong>מינימום חיבורים - פירוט</strong>
            <br></br>
            <Container>
              <Row>
                {resultMinChiburNoDirection.map((square, index) => {
                  return (
                    <>
                      <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                        <Card border='dark' style={{ width: "18rem" }}>
                          <Card.Title style={{ background: `${square.color}` }}>
                            מלבן מספר {index + 1} אורך {square.initialLength}{" "}
                            רוחב{square.initialWidth}
                          </Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount
                              ? ` סה"כ גלילים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `
                              : null}
                            {square.opt4.amount ? <br></br> : null}
                            {square.opt3.amount
                              ? ` סה"כ גלילים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `
                              : null}
                            {square.opt3.amount ? <br></br> : null}
                            {square.opt2.amount
                              ? ` סה"כ גלילים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `
                              : null}
                            {square.opt2.amount ? <br></br> : null}
                            פחת{square.pchat} מ"ר
                            <hr></hr>
                          </Card.Text>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </>
        )}
        {key === "מינימום חיבורים + כיוון סיב אחיד בין הגלילים" && (
          <>
            <strong>מינימום חיבורים+כיוון סיב אחיד בין הגלילים - פירוט</strong>
            <br></br>
            <Container>
              <Row>
                {resultMinChiburWithDirection.map((square, index) => {
                  return (
                    <>
                      <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                        <Card border='dark' style={{ width: "18rem" }}>
                          <Card.Title style={{ background: `${square.color}` }}>
                            מלבן מספר {index + 1} אורך {square.initialLength}{" "}
                            רוחב{square.initialWidth}
                          </Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount
                              ? ` סה"כ גלילים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `
                              : null}
                            {square.opt4.amount ? <br></br> : null}
                            {square.opt3.amount
                              ? ` סה"כ גלילים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `
                              : null}
                            {square.opt3.amount ? <br></br> : null}
                            {square.opt2.amount
                              ? ` סה"כ גלילים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `
                              : null}
                            {square.opt2.amount ? <br></br> : null}
                            פחת{square.pchat} מ"ר
                            <hr></hr>
                          </Card.Text>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Container>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {/* <h4 style={{ textAlign: "right" }}>  הוראות שימוש</h4>

      <ol style={{margin: "2rem", direction:"rtl", float:"right" }}> */}
      {/* {titleList.map(line => {
          return (
            <li key={line.key} style={{ display: "flex" }}>{line.key+1}.{line.description} </li>
          );
        })} */}
      {/* <div style={{textAlign:"start"}}>
         <h5 >בתחתית המסך יופיעו התוצאות האפשריות להזמנה.</h5>
        <h4> בתחילה תופיע רשימה של {<strong>סיכום</strong>}.</h4>
        <h4>לאחר מכן יופיע {<strong>פירוט</strong>}. </h4>
        </div>
      </ol> */}

      <div className='App'>
        <Konva squares={squares} setsquares={setsquares} />

        <InputGroup
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          className='mb-3 p-5'
        >
          <h1 style={{ textAlign: "right", marginBottom: "3rem" }}>
            {" "}
            מחשבון דשא סינטטי
          </h1>

          <Form.Label>
            <strong style={{ textAlign: "right" }}> רוחב במטרים</strong>
          </Form.Label>
          <FormControl
            // placeholder='הכנס רוחב'
            value={width}
            style={{
              width: "35%",
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
          <Form.Label>
            <strong>אורך מטרים</strong>
          </Form.Label>
          <FormControl
            // placeholder='הכנס אורך'
            value={length}
            style={{ width: "35%", direction: "rtl", maxHeight: "2rem" }}
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            id='length'
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />

          <div className='buttons'>
            <Button
              onClick={() => {
                setColor(getRandomColour());
                setTitleColor(getRandomColour());
                setsquares([...squares, [+width, +length, color]]);
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
              className='m-3'
              variant='success'
              onClick={() => {
                setopenSummary(true);

                summaryAllOptions();
              }}
            >
              חשב
            </Button>
            <Button
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
              }}
              className='m-3'
              variant='success'
            >
              נקה
            </Button>
          </div>
        </InputGroup>
      </div>
      <hr></hr>

      {openSummary && (
        <div className='summary'>
          <h3 style={{ textAlign: "center" }}>אלו התוצאות האפשריות עבורכם </h3>
          <ControlledTabs />
        </div>
      )}
    </>
  );
}

export default Home;
