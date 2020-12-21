import logo from "./logo.svg";
import "./App.css";
import Konva from "./components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import calculateBestOption from "./calculator";

function App() {
  const [squares, setsquares] = useState([]);
  const [resultForClient, setresultForClient] = useState([]);
  const [width, setwidth] = useState(0);
  const [length, setlength] = useState(0);

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

      if (result1.pchat === result2.pchat) {
        setresultForClient([...resultForClient, result1]);
      } else if (result1.pchat < result2.pchat) {
        setresultForClient([...resultForClient, result1]);
      } else {
        setresultForClient([...resultForClient, result2]);
      }

      console.log(result1);
      console.log(result2);
      console.log(resultForClient);
    });
  }

  return (
    <div className='App'>
      <Konva squares={squares} />

      <InputGroup
        style={{ display: "flex", flexDirection: "column" }}
        className='mb-3'
      >
        <h1>חישוב דשא</h1>
        <FormControl
          style={{ width: "50%" }}
          aria-label='Default'
          aria-describedby='inputGroup-sizing-default'
          id='width'
          onChange={(e) => {
            setwidth(e.target.value);
          }}
        />
        <p>רוחב</p>
        <FormControl
          style={{ width: "50%" }}
          aria-label='Default'
          aria-describedby='inputGroup-sizing-default'
          id='length'
          onChange={(e) => {
            setlength(e.target.value);
          }}
        />
        <p>אורך</p>
        <Button
          onClick={() => {
            setsquares([...squares, [+width, +length]]);

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
            console.log(squares);

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
      </InputGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>תוצאת חישוב</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>מצאנו לך את ההזמנה המומלצת</p>
          {resultForClient.map((result, index) => (
            <>
              <hr></hr>
              <p>
                <strong> {`תוצאה למלבן ${index + 1}`}</strong>
              </p>

              <p>{`משטח 4מ ${result.opt4}`}</p>
              <p>{`משטח 3מ ${result.opt3}`}</p>
              <p>{`משטח 2מ ${result.opt2}`}</p>
              <p>{`פחת ${result.pchat}`}</p>
            </>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            חזור ללוח השרטוטים
          </Button>
          <Button variant='primary' onClick={handleClose}>
            הזמן
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
