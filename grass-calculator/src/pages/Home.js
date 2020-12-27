import "../App.css";
import Konva from "../components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import calculateBestOption from "../calculator";
import ChiburCalc from "../chiburCalc";
import PchatWithDirection from "../PchatWithDirection";
import MinChiburNoDirection from "../minChiburNoDirection";

function Home({ history }) {
  const [squares, setsquares] = useState([]);
  const [resultForClientPchat, setresultForClientPchat] = useState([]);
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
      } else if (result1.pchat < result2.pchat) {
        setresultForClientPchat([...resultForClientPchat, result1]);
      } else {
        setresultForClientPchat([...resultForClientPchat, result2]);
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
              // console.log(squares);
              console.log(
                "resultPchatWithDirection : ",
                resultPchatWithDirection
              );
              console.log(
                "resultMinChiburNoDirection : ",
                resultMinChiburNoDirection
              );
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

          {/* {sumResultForClient.opt2.width >= 1 ? (
            <>
              <p> משטח ברוחב 2 מטר</p>
              <p> {sumResultForClient.opt2.length} : באורך </p>
            </>
          ) : null}
          {sumResultForClient.opt3.width >= 1 ? (
            <>
              <p> משטח ברוחב 3 מטר</p>
              <p> {sumResultForClient.opt3.length} : באורך </p>
            </>
          ) : null}
          {sumResultForClient.opt4.width >= 1 ? (
            <>
              <p> משטח ברוחב 4 מטר </p>
              <p> {sumResultForClient.opt4.length} : באורך </p>
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
    </div>
  );
}

export default Home;
