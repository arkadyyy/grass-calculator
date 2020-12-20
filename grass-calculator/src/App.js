import logo from "./logo.svg";
import "./App.css";
import Konva from "./components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [squares, setsquares] = useState([]);

  // function calculateBestOption(widthInput, lengthInput) {
  //   let opt4 = 0;
  //   let opt3 = 0;
  //   let opt2 = 0;

  //   let width = widthInput;
  //   let length = lengthInput;

  //   let pchatLength = length;
  //   let pchatWidth = null;
  //   let pchat = 0;

  //   while (width !== 0) {
  //     if (Math.ceil(width) / 4 >= 1) {
  //       opt4 = Math.floor(Math.ceil(width) / 4);

  //       if (width - opt4 * 4 <= 0) {
  //         (pchatWidth = opt4 * 4 - width), (width = 0);
  //       } else {
  //         width = width - opt4 * 4;
  //       }

  //       continue;
  //     } else if (Math.ceil(width) / 3 >= 1) {
  //       opt3 = Math.floor(Math.ceil(width) / 3);

  //       if (width - opt3 * 3 <= 0) {
  //         (pchatWidth = opt3 * 3 - width), (width = 0);
  //       } else {
  //         width = width - opt3 * 3;
  //       }
  //       continue;
  //     } else {
  //       opt2 = 1;

  //       if (width - opt2 * 2 < 0) {
  //         (pchatWidth = 2 - width), (width = 0);
  //       } else {
  //         (pchatWidth = 0), (width = 0);
  //       }

  //       continue;
  //     }
  //   }
  //   console.log(pchatLength);
  //   console.log(pchatWidth);

  //   pchat = pchatLength * pchatWidth;

  //   return { opt4, opt3, opt2, pchat };
  // }

  // console.log(calculateBestOption(9.1, 4.6));
  // console.log(calculateBestOption(4.6, 9.1));

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
        />
        <p>רוחב</p>
        <FormControl
          style={{ width: "50%" }}
          aria-label='Default'
          aria-describedby='inputGroup-sizing-default'
          id='length'
        />
        <p>אורך</p>
        <Button
          onClick={() => {
            setsquares([
              ...squares,
              [
                +document.getElementById("width").value,
                +document.getElementById("length").value,
              ],
            ]);
            console.log(document.getElementById("width").value);
            console.log(document.getElementById("length").value);
          }}
          className='m-3'
          variant='success'
        >
          הוסף מלבן
        </Button>
        <Button
          onClick={() => {
            console.log(squares);
          }}
          className='m-3'
          variant='success'
        >
          חשב
        </Button>
        <Button className='m-3' variant='success'>
          נקה
        </Button>
      </InputGroup>
    </div>
  );
}

export default App;
