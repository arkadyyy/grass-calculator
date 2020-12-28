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
} from "react-bootstrap";
import { useEffect, useState } from "react";
import calculateBestOption from "../calculator";
import ChiburCalc from "../chiburCalc";
import PchatWithDirection from "../PchatWithDirection";
import MinChiburNoDirection from "../minChiburNoDirection";

function Home({ history }) {
  const [squares, setsquares] = useState([]);
  const [resultForClientPchat, setresultForClientPchat] = useState([]);

  const [sumResultForClientPchat, setsumResultForClientPchat] = useState(null);

  // const [sumResultForClientPchat, setSumResultForClientPchat] = useState([]);
  const [resultPchatWithDirection, setresultPchatWithDirection] = useState([]);
  const [resultMinChiburNoDirection, setresultMinChiburNoDirection] = useState(
    []
  );
  const [x_directionResultForClient, setX_DirectionResultForClient] = useState(
    []
  );
  const [y_directionResultForClient, setY_DirectionResultForClient] = useState(
    []
  );

  //input values
  const [width, setwidth] = useState(0);
  const [length, setlength] = useState(0);
  const [searchBy, setsearchBy] = useState({
    Pchat: false,
    Direction: false,
    MinCuts: false,
  });

  //squares color
  const [color, setColor] = useState(getRandomColour());

  //modal state

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    bestResult();

    // console.log("minPchatSummaryResult : ", minPchatSummaryResult);
    // console.log("sumResultForClientPchat : ", sumResultForClientPchat);
    // setsumResultForClientPchat(minPchatSummaryResult);
  }, [squares]);

  useEffect(() => {
    bestResultPchatWithDirection();
  }, [x_directionResultForClient]);

  useEffect(() => {
    bestMinChiburNoDirection();
  }, [x_directionResultForClient]);

  function bestMinChiburNoDirection() {
    let result4 = MinChiburNoDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );
    console.log("result 4 : ", result4);
    setresultMinChiburNoDirection(result4);
  }

  function bestResultPchatWithDirection() {
    let result3 = PchatWithDirection(
      x_directionResultForClient,
      y_directionResultForClient
    );

    // console.log("result3:", result3);
    setresultPchatWithDirection(result3);
  }

  function bestResult() {
    squares.forEach((square) => {
      //פחת מינימלי
      let result1 = ChiburCalc(square[0] / 100, square[1] / 100);
      let result2 = ChiburCalc(square[1] / 100, square[0] / 100);
      if (result1.pchat === result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
        // setSumResultForClientPchat([...sumResultForClientPchat, result1]);
      } else if (result1.pchat < result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
        // setSumResultForClientPchat([...sumResultForClientPchat, result1]);
      } else {
        setresultForClientPchat([...resultForClientPchat, result2]);
        // setSumResultForClientPchat([...sumResultForClientPchat, result2]);
      }

      //כיוון פריסה
      setX_DirectionResultForClient([...x_directionResultForClient, result1]);
      setY_DirectionResultForClient([...y_directionResultForClient, result2]);

      //חיבור מינימלי

      console.log("result1:", result1);
      console.log("result2:", result2);
      console.log("resultForClient:", resultForClientPchat);
      console.log("x axis results:", x_directionResultForClient);
      console.log("y axis results:", y_directionResultForClient);
    });
  }

  function getRandomColour() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return "rgb(" + red + "," + green + "," + blue + " )";
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
          <Form style={{ display: "flex" }}>
            {["פחת", "חיתוכים", "כיוון"].map((type) => (
              <div
                style={{
                  direction: "rtl",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: " 1rem 0.3rem",
                }}
                key={`checkbox`}
                className='mb-3'
              >
                <Form.Label>
                  <strong>{type}</strong>
                </Form.Label>
                <Form.Check type='checkbox' id={`default-${type}`} />
              </div>
            ))}
          </Form>
          <div className='buttons'>
            <Button
              onClick={() => {
                setColor(getRandomColour());
                setsquares([...squares, [+width, +length, color]]);
                console.log(width);
                console.log(length);
                setwidth(0);
                setlength(0);
              }}
              className='m-3'
              variant='success'
            >
              הוסף מלבן
            </Button>
            <Button
              onClick={() => {
                handleShow();
              }}
              className='m-3'
              variant='success'
            >
              חשב
            </Button>
            <Button
              onClick={() => {
                setsquares([]);
                setresultForClientPchat([]);
                // setSumResultForClientPchat([]);

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
      <div className='summary'>
        <h3>אלו התוצאות שמצאנו עבורך </h3>
        <Container>
          <Row>
            <Col>
              <Card border='secondary' style={{ width: "18rem" }}>
                <Card.Header>חישוב ע"פ מינימום פחת</Card.Header>
                {resultForClientPchat.map((square, index) => {
                  let minPchatSummaryResult = resultForClientPchat.reduce(
                    (acc, curVal) => {
                      // acc.opt2.amount += +curVal.opt2.amount;
                      // acc.opt2.length += +curVal.opt2.length;

                      // acc.opt3.amount += +curVal.opt3.amount;
                      // acc.opt3.length += +curVal.opt3.length;

                      // acc.opt4.amount += +curVal.opt4.amount;
                      // acc.opt4.length += +curVal.opt4.length;

                      acc += +curVal.pchat;
                    },
                    0
                  );

                  return (
                    <>
                      {<p> xxxxx : {minPchatSummaryResult}</p>}
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
                    {/* <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p> */}
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
                      </Card.Text>
                    </Card.Body>
                  </>
                ))}
              </Card>
            </Col>
            {/* <Col>
              <Card border='secondary' style={{ width: "18rem" }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>Secondary Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card border='secondary' style={{ width: "18rem" }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>Secondary Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            תוצאת חישוב
            <p>מצאנו לך את ההזמנה המומלצת</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>פחת מינימלי</p>
          {resultForClientPchat.map((result, index) => (
            <>
              <hr></hr>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}
          <hr></hr>
          <p>לפי פחת וכיוון סיבים אחיד </p>
          {resultPchatWithDirection.map((result, index) => (
            <>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}

          <hr></hr>

          <p>חישוב לפי כיוון פריסה אחיד אפשרות 1 </p>
          {x_directionResultForClient.map((result, index) => (
            <>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}

          <hr></hr>
          <p>חישוב לפי כיוון פריסה אחיד אפשרות 2 </p>
          {y_directionResultForClient.map((result, index) => (
            <>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}

          <hr></hr>
          <p>חישוב לפי מינימום חיבורים </p>
          {resultMinChiburNoDirection.map((result, index) => (
            <>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}
          <p> חישוב לפי מינימום חיבורים כולל כיוון סיב אחיד</p>
          {resultMinChiburNoDirection.map((result, index) => (
            <>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              {result.opt4.amount >= 1 ? (
                <>
                  <p>{`משטח 4מ ${result.opt4.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt4.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt3.amount >= 1 ? (
                <>
                  <p>{`משטח 3מ ${result.opt3.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt3.length}`}</p>}</p>
                </>
              ) : null}

              {result.opt2.amount >= 1 ? (
                <>
                  <p>{`משטח 2מ ${result.opt2.amount}`}</p>
                  <p>{<p>{`באורך ${result.opt2.length}`}</p>}</p>
                </>
              ) : null}

              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}
          <hr></hr>
          <p> חישוב כולל עבור מינימום פחת</p>

          {/* {sumResultForClientPchat.opt2.width >= 1 ? (
            <>
              <p> משטח ברוחב 2 מטר</p>
              <p> {sumResultForClientPchat.opt2.length} : באורך </p>
            </>
          ) : null}
          {sumResultForClientPchat.opt3.width >= 1 ? (
            <>
              <p> משטח ברוחב 3 מטר</p>
              <p> {sumResultForClientPchat.opt3.length} : באורך </p>
            </>
          ) : null}
          {sumResultForClientPchat.opt4.width >= 1 ? (
            <>
              <p> משטח ברוחב 4 מטר </p>
              <p> {sumResultForClientPchat.opt4.length} : באורך </p>
            </>
          ) : null} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            חזור ללוח השרטוטים
          </Button>
          <Button
            onClick={() => {
              history.push("/summary");
              handleClose();
            }}
            variant='primary'
          >
            הזמן
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
