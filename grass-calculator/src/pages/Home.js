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
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
// import calculateBestOption from "../calculator";
import ChiburCalc from "../chiburCalc";
import PchatWithDirection from "../PchatWithDirection";
import MinChiburNoDirection from "../minChiburNoDirection";
import minChiburWithDirection from "../minChiburWithDirection";

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
  const [resultMinChiburWithDirection, setResultMinChiburWithDirection] = useState(
    []
  );


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
      title: `סיכום על פי מינימום פחת`,
      opt2: 0,
      opt3: 0,
      opt4: 0,
      pchat: 0,
    },
    minPchatWithDirectionSummary: {
      title: `סיכום  על פי מינימום פחת עם התחשבות בכיוון הסיב`,
      opt2: 0,
      opt3: 0,
      opt4: 0,
      pchat: 0,
    },
    minChiburNoDirection: {
      title: `סיכום  על פי מינימום חיבורים בלי התחשבות בכיוון הסיב בין המלבנים השונים`,
      opt2: 0,
      opt3: 0,
      opt4: 0,
      pchat: 0,
    },
    // בבדיקה
    minChiburWithDirection: {
      title: `סיכום  על פי מינימום פחת`,
      opt2: 0,
      opt3: 0,
      opt4: 0,
      pchat: 0,
    }
  
  });

  //input values
  const [width, setwidth] = useState(0);
  const [length, setlength] = useState(0);

  //squares color
  const [color, setColor] = useState(getRandomColour());

  function getRandomColour() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + " )";
  }

  const [openSummary, setopenSummary] = useState(false);

  useEffect(() => {
    console.log("summary changed !");
  }, [summary]);

  useEffect(() => {
    bestResult();
    bestMinChiburWithDirection();

    console.log("summary : ", summary);
  }, [squares]);

  useEffect(() => {
    bestResultPchatWithDirection();
    bestMinChiburNoDirection();
  }, [x_directionResultForClient]);

  function bestMinChiburNoDirection() {
    let result4 = MinChiburNoDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );

    setResultMinChiburNoDirection(result4);
  }

  function bestMinChiburWithDirection() {
    let result5 = minChiburWithDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );
console.log("result5:",result5);
    setResultMinChiburWithDirection(result5);
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
    let opt3AmountP = 0;
    let opt4AmountP = 0;
    let pchatP = 0;
    resultForClientPchat.forEach((square) => {
      opt2AmountP += square.opt2.amount;
      opt3AmountP += square.opt3.amount;
      opt4AmountP += square.opt4.amount;
      pchatP += square.pchat;
    });
    // "PD"=Pchat+ considering the Direction
    let opt2AmountPD = 0;
    let opt3AmountPD = 0;
    let opt4AmountPD = 0;
    let pchatPD = 0;
    resultPchatWithDirection.forEach((square) => {
      opt2AmountPD += square.opt2.amount;
      opt3AmountPD += square.opt3.amount;
      opt4AmountPD += square.opt4.amount;
      pchatPD += square.pchat;
    });
    // result  of Min "Chiburim" (connections) Not consider Direction
    let opt2AmountC = 0;
    let opt3AmountC = 0;
    let opt4AmountC = 0;
    let pchatC = 0;
    resultMinChiburNoDirection.forEach((square) => {
      opt2AmountC += square.opt2.amount;
      opt3AmountC += square.opt3.amount;
      opt4AmountC += square.opt4.amount;
      pchatC += square.pchat;
    });

    // בשלבי הרצה ובדיקות!!!!!!!!!!!
    // result  of Min "Chiburim" (connections) + consider Direction
    // let opt2AmountCD = 0;
    // let opt3AmountCD = 0;
    // let opt4AmountCD = 0;
    // let pchatCD = 0;
    // resultMinChiburWithDirection.forEach((square) => {
    //   opt2AmountCD += square.opt2.amount;
    //   opt3AmountCD += square.opt3.amount;
    //   opt4AmountCD += square.opt4.amount;
    //   pchatCD += square.pchat;
    // });

    setSummary({
      ...summary,
      minPchatSummary: {
        opt2: opt2AmountP,
        opt3: opt3AmountP,
        opt4: opt4AmountP,
        pchat: pchatP,
      },
      minPchatWithDirectionSummary: {
        opt2: opt2AmountPD,
        opt3: opt3AmountPD,
        opt4: opt4AmountPD,
        pchat: pchatPD,
      },
      minChiburNoDirection: {
        opt2: opt2AmountC,
        opt3: opt3AmountC,
        opt4: opt4AmountC,
        pchat: pchatC,
      }
      // ,
      // minChiburWithDirection: {
      //   opt2: opt2AmountCD,
      //   opt3: opt3AmountCD,
      //   opt4: opt4AmountCD,
      //   pchat: pchatCD,
      // }
      
    });

    console.log("resultForClientPchat : ", resultForClientPchat);
    console.log("resultPchatWithDirection : ", resultPchatWithDirection);
    console.log("resultMinChiburNoDirection : ", resultMinChiburNoDirection);
  }

  function bestResult() {
    squares.forEach((square) => {
      //  פחת מינימלי בלי כיוון פריסה
      // min pchat no direction consider
      let result1 = ChiburCalc(square[0] / 100, square[1] / 100);
      let result2 = ChiburCalc(square[1] / 100, square[0] / 100);
      if (result1.pchat === result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
      } else if (result1.pchat < result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
      } else {
        setresultForClientPchat([...resultForClientPchat, result2]);
      }

      // כיוון פריסה
      setX_DirectionResultForClient([...x_directionResultForClient, result1]);
      setY_DirectionResultForClient([...y_directionResultForClient, result2]);
    });

    summaryAllOptions();
  }

  return (
    <>
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
          <h1>חישוב דשא</h1>
          <Form.Label>
            <strong style={{ textAlign: "right" }}>רוחב</strong>
          </Form.Label>
          <FormControl
            placeholder='הכנס רוחב'
            style={{ width: "35%", direction: "rtl" }}
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            id='width'
            onChange={(e) => {
              setwidth(e.target.value);
            }}
          />
          <Form.Label>
            <strong>אורך</strong>
          </Form.Label>
          <FormControl
            placeholder='הכנס אורך'
            style={{ width: "35%", direction: "rtl" }}
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
                setsquares([...squares, [+width, +length, color]]);
                console.log(width);
                console.log(length);
                setwidth(0);
                setlength(0);
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

                setwidth(0);
                setlength(0);
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
          <Spinner animation='border' variant='success' size='xl' />
          <h3>אלו התוצאות שמצאנו עבורך </h3>
          <Container>
            <Row>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header>חישוב ע"פ מינימום פחת</Card.Header>
                  {resultForClientPchat.map((square, index) => {
                    return (
                      <>
                        <Card.Body>
                          <Card.Title>מרובע {index + 1}</Card.Title>
                          <Card.Text>
                            <hr></hr>
                            משטח 4מ {square.opt4.amount}
                            באורך {square.opt4.length}
                            <br></br>
                            משטח 3מ {square.opt3.amount}
                            באורך {square.opt3.length}
                            <br></br>
                            משטח 2מ {square.opt2.amount}
                            באורך {square.opt2.length}
                            <br></br>
                            פחת{square.pchat} מ"ר
                          </Card.Text>
                        </Card.Body>
                      </>
                    );
                  })}
                </Card>
              </Col>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header>  חישוב ע"פ מינימום פחת + כיוון סיב אחיד בין הכל המשטחים</Card.Header>
                  {resultPchatWithDirection.map((square, index) => {
                    return (
                      <>
                        <Card.Body>
                          <Card.Title>מרובע {index + 1}</Card.Title>
                          <Card.Text>
                            <hr></hr>
                            משטח 4מ {square.opt4.amount}
                            באורך {square.opt4.length}
                            <br></br>
                            משטח 3מ {square.opt3.amount}
                            באורך {square.opt3.length}
                            <br></br>
                            משטח 2מ {square.opt2.amount}
                            באורך {square.opt2.length}
                            <br></br>
                            פחת{square.pchat} מ"ר
                          </Card.Text>
                        </Card.Body>
                      </>
                    );
                  })}
                </Card>
              </Col>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header>חישוב ע"פ מינימום חיבורים</Card.Header>
                  {resultMinChiburNoDirection.map((square, index) => (
                    <>
                      <Card.Body>
                        <Card.Title>מרובע {index + 1}</Card.Title>
                        <Card.Text>
                          משטח 4מ {square.opt4.amount}
                          באורך {square.opt4.length}
                          <br></br>
                          משטח 3מ {square.opt3.amount}
                          באורך {square.opt3.length}
                          <br></br>
                          משטח 2מ {square.opt2.amount}
                          באורך {square.opt2.length}
                          <br></br>
                          פחת{square.pchat} מ"ר
                        </Card.Text>
                      </Card.Body>
                    </>
                  ))}
                </Card>
              </Col>
              {/* <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header>חישוב ע"פ חיבורים לכיוון אחיד</Card.Header>
                  {resultMinChiburWithDirection.map((square, index) => (
                    <>
                      <Card.Body>
                        <Card.Title>מרובע {index + 1}</Card.Title>
                        <Card.Text>
                          משטח 4מ {square.opt4.amount}
                          באורך {square.opt4.length}
                          <br></br>
                          משטח 3מ {square.opt3.amount}
                          באורך {square.opt3.length}
                          <br></br>
                          משטח 2מ {square.opt2.amount}
                          באורך {square.opt2.length}
                          <br></br>
                          פחת{square.pchat} מ"ר
                        </Card.Text>
                      </Card.Body>
                    </>
                  ))}
                </Card>
              </Col> */}
              
            </Row>
            <Row>
              <Col>
                <Card
                  className='my-5'
                  border='secondary'
                  style={{ width: "100%" }}
                >
                  {Object.entries(summary).map(([key, value], i) => (
                    <>
                      <Card.Header>enteries {i}</Card.Header>

                      <Card.Body>
                        <Card.Title>{key}{value.title}</Card.Title>
                        <Card.Text>
                          {value.opt2 ? ` סה"כ משטחים ברוחב 2 מטר : ${ value.opt2 }` : null}
                          <br></br>
                          {/* צריך להוסיף את ה <br> לביטוי הטרנטי */}
                          {value.opt3 ? ` סה"כ משטחים ברוחב 3 מטר : ${ value.opt3 }` : null}
                          <br></br>
                          {/* צריך להוסיף את ה <br> לביטוי הטרנטי */}
                          {value.opt4 ? ` סה"כ משטחים ברוחב 4 מטר : ${ value.opt4 }` : null}
                          <br></br>
                          {/* צריך להוסיף את ה <br> לביטוי הטרנטי */}
                          {value.pchat ? ` סה"כ פחת : ${ value.pchat }` : `לא יהיה פחת אם תבחר באפשרות זו`}
                          <br></br>
                          {/* צריך להוסיף את ה <br> לביטוי הטרנטי */}                        </Card.Text>
                      </Card.Body>
                    </>
                  ))}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

// const [summary, setSummary] = useState({
//   minPchatSummary: {
//     opt2: 0,
//     opt3: 0,
//     opt4: 0,
//     pchat: 0,
//   },
//   minChiburNoDirection: {
//     opt2: 0,
//     opt3: 0,
//     opt4: 0,
//     pchat: 0,
//   },
//   minChiburWithDirection: {
//     opt2: 0,
//     opt3: 0,
//     opt4: 0,
//     pchat: 0,
//   },
// });

export default Home;