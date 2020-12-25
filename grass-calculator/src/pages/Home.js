import "../App.css";
import Konva from "../components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import calculateBestOption from "../calculator";

function Home({ history }) {
  const [squares, setsquares] = useState([]);
  const [resultForClient, setresultForClient] = useState([]);
  const [x_directionResultForClient, setX_DirectionResultForClient] = useState([]);
  const [y_directionResultForClient, setY_DirectionResultForClient] = useState([]);

  const [width, setwidth] = useState(0);
  const [length, setlength] = useState(0);
  const [color, setColor] = useState(null);

  //modal state

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    bestResult();
  }, [squares]);

  function bestResult() {
    squares.forEach((square) => {
      let result1 = calculateBestOption(square[0] / 100, square[1] / 100);
      let result2 = calculateBestOption(square[1] / 100, square[0] / 100);
      //פחת מינימלי
      if (result1.pchat === result2.pchat) {
        setresultForClient([...resultForClient, result1]);
      } else if (result1.pchat < result2.pchat) {
        setresultForClient([...resultForClient, result1]);
      } else {
        setresultForClient([...resultForClient, result2]);
      }
      //כיוון פריסה
      setX_DirectionResultForClient([...x_directionResultForClient, result1]);
      setY_DirectionResultForClient([...y_directionResultForClient, result2]);

      // console.log("result1:", result1);
      // console.log("result2:", result2);
      // console.log("resultForClient:", resultForClient);
      // console.log("x result:", x_directionResultForClient);
      // console.log("y result:", y_directionResultForClient);
    });
  }


  function getRandomColour(){
    var red = Math.floor(Math.random()* 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
  
    return "rgb("+red+","+green+"," +blue+" )";  
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
        <div className='buttons'>
          <Button
            onClick={() => {
              setColor(getRandomColour());
              // setsquares([...squares, [+width, +length]]);
              setsquares([...squares, [+width, +length,color]]);

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
              setresultForClient([]);
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
          <Modal.Title>תוצאת חישוב</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>מצאנו לך את ההזמנה המומלצת</p>
          <p>פחת מינימלי</p>
          {resultForClient.map((result, index) => (
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
