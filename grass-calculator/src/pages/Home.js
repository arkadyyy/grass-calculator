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
        title: `מינימום פחת- ניצול מירבי של משטחי הדשא שהזומנו`,
        description:``,
        opt2: opt2AmountP,
        opt2length: opt2lengthP,
        opt3: opt3AmountP,
        opt3length: opt3lengthP,
        opt4: opt4AmountP,
        opt4length: opt4lengthP,
        pchat: pchatP,
      },
      minPchatWithDirectionSummary: {
        title:`מינימום פחת + כיוון סיב אחיד בין המשטחים - ניצול מירבי של משטחי הדשא שהוזמנו בתנאי של שמירה על כיוון פריסה אחיד של המשטחים`,
        opt2: opt2AmountPD,
        opt2length: opt2lengthPD,
        opt3: opt3AmountPD,
        opt3length: opt3lengthPD,
        opt4: opt4AmountPD,
        opt4length: opt4lengthPD,
        pchat: pchatPD,
      },
      minChiburNoDirection: {
        title:'מינימום חיבורים- האפשרות לכסות את השטח שלכם עם מספר מינימלי של משטחי דשא סינטטי ',
        opt2: opt2AmountC,
        opt2length: opt2lengthC,
        opt3: opt3AmountC,
        opt3length: opt3lengthC,
        opt4: opt4AmountC,
        opt4length: opt4lengthC,
        pchat: pchatC,
      },
      minChiburWithDirection: {
        title:`מינימום חיבורים + כיוון סיב אחיד בין המשטחים`,
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
  // const titleList = [
  //   {description: '  יש להזין את רוחב ואורך המשטח המיועד לכיסוי בדשא הסינטטי.', key: 0},
  //   {description: '  שימו לב! יש להזין את המשטח כאילו הוא מורכב ממלבנים.', key: 1},
  //   {description: '  יש להזין את הרוחב והאורך בסנטימטרים.', key: 2},
  //   {description: '  לאחר מכן - לחיצה על "הוסף מלבן" בכפתור הירוק.', key: 3},
  //   {description: '  אם ישנו מלבן נוסף - יש לחזור על הפעולה, ולהזין מחדש גם אורך וגם רוחב.', key: 4},
  //   { description: '  עם סיום הזנת המלבנים , יש ללחוץ על "חשב" בכפתור הירוק.', key: 5 },
  // ];
  
  return (
    < >
     
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
      <h1 style={{ textAlign: "right", marginBottom:"3rem" }}>  מחשבון דשא סינטטי</h1>

          <Form.Label>
            <strong style={{ textAlign: "right" }}> רוחב בסנטימטרים</strong>
          </Form.Label>
          <FormControl
            // placeholder='הכנס רוחב'
            value={width}
            style={{ width: "35%",height:"2rem", direction: "rtl", maxHeight: "2rem" }}
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            id='width'
            onChange={(e) => {
              setwidth(e.target.value);
            }}
          />
          <Form.Label>
            <strong>אורך בסנטימטרים</strong>
          </Form.Label>
          <FormControl
            // placeholder='הכנס אורך'
            value={length}    
            style={{ width: "35%", direction: "rtl", maxHeight: "2rem"}}
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
                setwidth('');
                setlength('');
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
        <div className='summary'  >
          {/* <Spinner animation='border' variant='success' size='xl' /> */}
          <h3 style={{ textAlign: "center" }}>אלו התוצאות האפשריות עבורכם </h3>
          <Container style={{ textAlign: "right", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Row>
              <Col>
                <Card
                  className='my-5'
                  border='secondary'
                  style={{ width: "100%" }}
                >
                  {Object.entries(summary).map(([key, value], i) => (
                    <>
                      <Card.Header style={{ fontWeight: "bold" }}>{value.title}</Card.Header>
                      <Card.Body>
                        <Card.Title>{value.description}</Card.Title>
                        <Card.Text>
                          {value.opt2 ? ` סה"כ משטחים ברוחב 2 מטר : ${value.opt2} משטחים , באורך ${+value.opt2length} מטר `: null}
                          {value.opt2 ? <br></br> : null}
                          {value.opt3 ? ` סה"כ משטחים ברוחב 3 מטר : ${value.opt3}משטחים, באורך ${+value.opt3length} מטר`: null}
                          {value.opt3 ? <br></br>: null}
                          {value.opt4 ? ` סה"כ משטחים ברוחב 4 מטר : ${value.opt4}משטחים, באורך ${+value.opt4length} מטר`: null}
                          {value.opt4 ? <br></br> : null}
                          {value.pchat ? ` סה"כ פחת במ"ר: ${+value.pchat} ` : `לא יהיה פחת אם תבחר באפשרות זו`}
                          <br></br>                          
                        </Card.Text>
                      </Card.Body>
                    </>
                  ))}
                </Card>
              </Col>
            </Row>
            <Row lg={4} className='d-flex justify-content-around' style={{direction:"rtl",width:"max-content"}}  >

              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header><strong>מינימום פחת-פירוט</strong></Card.Header>
                  {resultForClientPchat.map((square, index) => {
                    return (
                      <>
                        <Card.Body>
                          <Card.Title>מלבן מספר {index + 1}</Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount ? ` סה"כ משטחים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `: null}
                          {square.opt4.amount ? <br></br> : null}
                          {square.opt3.amount ? ` סה"כ משטחים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `: null}
                          {square.opt3.amount ? <br></br> : null}
                          {square.opt2.amount ? ` סה"כ משטחים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `: null}
                          {square.opt2.amount ? <br></br> : null}
                          פחת{square.pchat} מ"ר
                          <hr></hr>
                          </Card.Text>
                        </Card.Body>
                      </>
                    );
                  })}
                </Card>
              </Col>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header><strong>
                    פירוט חישוב ע"פ מינימום פחת + כיוון סיב אחיד בין המשטחים
                    </strong></Card.Header>
                  {resultPchatWithDirection.map((square, index) => {
                    return (
                      <>
                        <Card.Body>
                          <Card.Title>מלבן מספר {index + 1}</Card.Title>
                          <Card.Text>
                            <hr></hr>
                            {square.opt4.amount ? ` סה"כ משטחים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `: null}
                          {square.opt4.amount ? <br></br> : null}
                          {square.opt3.amount ? ` סה"כ משטחים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `: null}
                          {square.opt3.amount ? <br></br> : null}
                          {square.opt2.amount ? ` סה"כ משטחים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `: null}
                          {square.opt2.amount ? <br></br> : null}
                           
                            פחת{square.pchat} מ"ר
                            <hr></hr>
                          </Card.Text>
                        </Card.Body>
                      </>
                    );
                  })}
                </Card>
              </Col>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header><strong>פירוט חישוב ע"פ מינימום חיבורים </strong></Card.Header>
                  {resultMinChiburNoDirection.map((square, index) => (
                    <>
                      <Card.Body>
                        <Card.Title>מלבן מספר {index + 1}</Card.Title>
                        <Card.Text>
                        {square.opt4.amount ? ` סה"כ משטחים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `: null}
                          {square.opt4.amount ? <br></br> : null}
                          {square.opt3.amount ? ` סה"כ משטחים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `: null}
                          {square.opt3.amount ? <br></br> : null}
                          {square.opt2.amount ? ` סה"כ משטחים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `: null}
                          {square.opt2.amount ? <br></br> : null}
                          פחת{square.pchat} מ"ר
                          <hr></hr>
                        </Card.Text>
                      </Card.Body>
                    </>
                  ))}
                </Card>
              </Col>
              <Col>
                <Card border='secondary' style={{ width: "18rem" }}>
                  <Card.Header><strong>פירוט חישוב ע"פ מינימום חיבורים + כיוון סיב אחיד בין המשטחים</strong></Card.Header>
                  {resultMinChiburWithDirection.map((square, index) => (
                    <>
                      <Card.Body>
                        <Card.Title>מלבן מספר {index + 1}</Card.Title>
                        <Card.Text>
                        {square.opt4.amount ? ` סה"כ משטחים ברוחב 4 מטר : ${square.opt4.amount}, באורך ${square.opt4.length} מטר `: null}
                          {square.opt4.amount ? <br></br> : null}
                          {square.opt3.amount ? ` סה"כ משטחים ברוחב 3 מטר : ${square.opt3.amount}, באורך ${square.opt3.length} מטר `: null}
                          {square.opt3.amount ? <br></br> : null}
                          {square.opt2.amount ? ` סה"כ משטחים ברוחב 2 מטר : ${square.opt2.amount}, באורך ${square.opt2.length} מטר `: null}
                          {square.opt2.amount ? <br></br> : null}
                          פחת{square.pchat} מ"ר
                          <hr></hr>
                        </Card.Text>
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


export default Home;
