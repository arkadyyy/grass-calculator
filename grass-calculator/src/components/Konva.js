import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Arrow, Line } from "react-konva";

const Konva = ({
  squares,
  setsquares,
  type,
  tabKey,
  summary,
  xDirectionSquare,
  yDirectionSquare,
  resultForClientPchat,
  resultPchatWithDirection,
  resultMinChiburWithDirection,
  resultMinChiburNoDirection,
}) => {
  // {
  //   opt4: { amount: 0, length: 0 },
  //   opt3: { amount: 0, length: 0 },
  //   opt2: { amount: 0, length: 0 },
  //   pchat: 0,
  // }
  const [arrayUsed, setarrayUsed] = useState([]);
  const [konvasquares, setkonvasquares] = useState(squares);

  useEffect(() => {
    if (tabKey === "מינימום חיבורים + כיוון סיב אחיד בין הגלילים") {
      setarrayUsed(resultMinChiburWithDirection);
    }
    if (tabKey === "מינימום פחת") {
      setarrayUsed(resultForClientPchat);
    }
    if (tabKey === "מינימום פחת + כיוון סיב אחיד בין הגלילים") {
      setarrayUsed(resultPchatWithDirection);
    }
    if (tabKey === "מינימום חיבורים") {
      setarrayUsed(resultPchatWithDirection);
    }
    console.log("xDirectionSquare : ", xDirectionSquare);
    console.log("yDirectionSquare : ", yDirectionSquare);
    console.log("arrayUsed : ", arrayUsed);
  }, [tabKey]);

  return (
    <>
      <div>
        <Stage
          style={{
            border: "1px solid #333",
            margin: "3rem",
            borderRadius: "5px",
          }}
          width={window.innerWidth / 2}
          height={window.innerHeight / 2}
        >
          <Layer>
            {type === "top" &&
              squares.map((square, index) => {
                let width = [];
                let length = [];
                let arrowDirection = [];

                if (arrayUsed.length !== 0) {
                  if (
                    arrayUsed[index].opt2.length === square[1] ||
                    arrayUsed[index].opt3.length === square[1] ||
                    arrayUsed[index].opt4.length === square[1]
                  ) {
                    width[index] =
                      arrayUsed[index].opt2.amount * 2 +
                      arrayUsed[index].opt3.amount * 3 +
                      arrayUsed[index].opt4.amount * 4;
                    length[index] = square[1];
                    arrowDirection[index] = "vertical";
                  } else if (
                    arrayUsed[index].opt2.length === square[0] ||
                    arrayUsed[index].opt3.length === square[0] ||
                    arrayUsed[index].opt4.length === square[0]
                  ) {
                    width[index] = square[0];
                    length[index] =
                      arrayUsed[index].opt2.amount * 2 +
                      arrayUsed[index].opt3.amount * 3 +
                      arrayUsed[index].opt4.amount * 4;
                    arrowDirection[index] = "horizantal";
                  }

                  // console.log("width : ", width);
                  // console.log("length : ", length);
                }

                return (
                  <>
                    <Group draggable>
                      {arrowDirection[index] === "vertical" && (
                        <Arrow
                          x={100}
                          y={-45}
                          points={[0, 110, 0, 150]}
                          width={30}
                          pointerLength={5}
                          pointerWidth={5}
                          fill='black'
                          stroke='black'
                        />
                      )}

                      {arrowDirection[index] === "horizantal" && (
                        <Arrow
                          x={-285}
                          y={40}
                          points={[472, 0, 500, 0]}
                          pointerLength={5}
                          pointerWidth={5}
                          fill='black'
                          stroke='black'
                        />
                      )}

                      <Text
                        x={110}
                        y={30}
                        text={` ${square[0]} ר`}
                        fontSize={15}
                      />
                      <Text
                        x={75}
                        y={100}
                        text={` ${square[1]} א`}
                        fontSize={15}
                        rotationDeg={270}
                      />

                      <Rect
                        onClick={(e) => {
                          console.log(e.target.absolutePosition());
                          console.log(e.target);
                          console.log("squares : ", squares);
                          let squaresOriginal = [...squares];
                          squaresOriginal[
                            index
                          ][3] = e.target.absolutePosition().x;
                          squaresOriginal[
                            index
                          ][4] = e.target.absolutePosition().y;
                          setkonvasquares(squaresOriginal);
                        }}
                        x={50}
                        y={100}
                        width={square[0] * 40}
                        height={square[1] * 40}
                        fill={square[2]}
                        opacity={0.6}
                        // stroke='black'
                        // strokeWidth='4'
                      />

                      {type === "bottom" && (
                        <Rect
                          draggable
                          x={square[3]}
                          y={square[4]}
                          width={width[index] * 40}
                          height={length[index] * 40}
                          fill='transparent'
                          stroke={square[2]}
                          draggable={false}
                          strokeWidth='2'
                          dash={[10, 10]}
                        ></Rect>
                      )}
                      {type === "bottom" && (
                        <Text
                          x={square[3] + 20}
                          y={square[4] + 10}
                          text={`אורך דשא ${length[index]}`}
                          fontSize={15}
                          fill={"black"}
                          rotationDeg={270}
                        />
                      )}
                      {type === "bottom" && (
                        <Text
                          x={80}
                          y={0}
                          text={`רוחב דשא ${width[index]}`}
                          fontSize={15}
                          fill={"black"}
                        />
                      )}
                      <Text
                        x={120}
                        y={80}
                        text={`${index + 1}`}
                        fontSize={15}
                        fill={"black"}
                      />
                    </Group>
                  </>
                );
              })}

            {type === "bottom" &&
              konvasquares.map((square, index) => {
                let width = [];
                let length = [];
                let arrowDirection = [];

                //4 - 140
                //3 - 105
                //2 - 70
                let lineRenderArr = [];

                // let lineRenderArr = [
                //   [157, 227, 335],
                //   [80, 230],
                // ];

                arrayUsed.forEach((square) => {
                  let opt4Amount = +square.opt4.amount;
                  let opt3Amount = +square.opt3.amount;
                  let opt2Amount = +square.opt2.amount;
                  let squareLines = [];

                  while (opt4Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 160
                      );
                    } else {
                      squareLines.push(160);
                    }
                    opt4Amount--;
                  }
                  while (opt3Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 125
                      );
                    } else {
                      squareLines.push(125);
                    }
                    opt3Amount--;
                  }
                  while (opt2Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 90
                      );
                    } else {
                      squareLines.push(90);
                    }
                    opt2Amount--;
                  }
                  console.log("lineRenderArr : ", lineRenderArr);
                  lineRenderArr.push(squareLines);
                });

                lineRenderArr.forEach((arr) => {
                  arr.pop();
                });

                if (arrayUsed.length !== 0) {
                  if (
                    arrayUsed[index].opt2.length === square[1] ||
                    arrayUsed[index].opt3.length === square[1] ||
                    arrayUsed[index].opt4.length === square[1]
                  ) {
                    width[index] =
                      arrayUsed[index].opt2.amount * 2 +
                      arrayUsed[index].opt3.amount * 3 +
                      arrayUsed[index].opt4.amount * 4;
                    length[index] = square[1];
                    arrowDirection[index] = "vertical";
                  } else if (
                    arrayUsed[index].opt2.length === square[0] ||
                    arrayUsed[index].opt3.length === square[0] ||
                    arrayUsed[index].opt4.length === square[0]
                  ) {
                    width[index] = square[0];
                    length[index] =
                      arrayUsed[index].opt2.amount * 2 +
                      arrayUsed[index].opt3.amount * 3 +
                      arrayUsed[index].opt4.amount * 4;
                    arrowDirection[index] = "horizantal";
                  }

                  // console.log("width : ", width);
                  // console.log("length : ", length);
                }

                return (
                  <>
                    <Group draggable>
                      {arrowDirection[index] === "vertical" && (
                        <Arrow
                          x={square[3] + 60}
                          y={square[4] - 75}
                          points={[0, 110, 0, 150]}
                          width={30}
                          pointerLength={5}
                          pointerWidth={5}
                          fill='black'
                          stroke='black'
                        />
                      )}
                      {arrowDirection[index] === "vertical" &&
                        lineRenderArr.length !== 0 &&
                        lineRenderArr[index].map((pos) => (
                          <Line
                            x={square[3]}
                            y={square[4]}
                            draggable={true}
                            points={[pos, 0, pos, 32]}
                            stroke={square[2]}
                            strokeWidth='6'
                            dash={[10, 10]}
                          ></Line>
                        ))}
                      {arrowDirection[index] === "horizantal" &&
                        lineRenderArr.length !== 0 &&
                        lineRenderArr[index].map((pos) => (
                          <Line
                            x={square[3]}
                            y={square[4]}
                            draggable={true}
                            points={[0, pos, 32, pos]}
                            stroke={square[2]}
                            strokeWidth='6'
                            dash={[10, 10]}
                            // rotationDeg={90}
                          ></Line>
                        ))}
                      {arrowDirection[index] === "horizantal" && (
                        <Rect
                          x={square[3] + 60}
                          y={square[4] - 75}
                          draggable={true}
                          stroke={square[2]}
                          strokeWidth='2'
                          rotationDeg={132}
                        ></Rect>
                      )}
                      {arrowDirection[index] === "horizantal" && (
                        <Arrow
                          x={square[3] - 410}
                          y={square[4] + 85}
                          points={[472, 0, 500, 0]}
                          pointerLength={5}
                          pointerWidth={5}
                          fill='black'
                          stroke='black'
                        />
                      )}

                      {/* <Text
                        x={square[3]}
                        y={square[4] + 100}
                        text={` ${square[0]} ר`}
                        fontSize={15}
                      />
                      <Text
                        x={square[3]}
                        y={square[4] + 100}
                        text={` ${square[1]} א`}
                        fontSize={15}
                        rotationDeg={270}
                      /> */}

                      <Rect
                        onClick={(e) => {
                          console.log(e.target.absolutePosition());
                          console.log(e.target);
                          console.log("lineRenderArr : ", lineRenderArr);
                          console.log("squares : ", squares);
                          let squaresOriginal = [...squares];
                          squaresOriginal[
                            index
                          ][3] = e.target.absolutePosition().x;
                          squaresOriginal[
                            index
                          ][4] = e.target.absolutePosition().y;
                          setkonvasquares(squaresOriginal);
                        }}
                        x={square[3]}
                        y={square[4]}
                        width={square[0] * 40}
                        height={square[1] * 40}
                        fill={square[2]}
                        opacity={0.6}
                        // stroke='black'
                        // strokeWidth='4'
                      />

                      {type === "bottom" && (
                        <Rect
                          draggable
                          x={square[3]}
                          y={square[4]}
                          width={width[index] * 40}
                          height={length[index] * 40}
                          fill='transparent'
                          stroke={square[2]}
                          draggable={false}
                          strokeWidth='2'
                          dash={[10, 10]}
                        ></Rect>
                      )}
                      {/* {type === "bottom" && (
                        <Text
                          x={square[3] - 30}
                          y={square[4] + 100}
                          text={`אורך דשא ${length[index]}`}
                          fontSize={15}
                          fill={"black"}
                          rotationDeg={270}
                        />
                      )} */}
                      {/* {type === "bottom" && (
                        <Text
                          x={square[3]}
                          y={square[4]}
                          text={`רוחב דשא ${width[index]}`}
                          fontSize={15}
                          fill={"black"}
                        />
                      )} */}
                    </Group>
                  </>
                );
              })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Konva;
