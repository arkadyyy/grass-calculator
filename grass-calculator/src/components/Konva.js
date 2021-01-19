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
  const [arrayUsed, setarrayUsed] = useState([]);
  const [konvasquares, setkonvasquares] = useState(squares);
  const [isDragging, setisDragging] = useState(false);

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
      setarrayUsed(resultMinChiburNoDirection);
    }
    console.log("xDirectionSquare : ", xDirectionSquare);
    console.log("yDirectionSquare : ", yDirectionSquare);
    console.log("arrayUsed : ", arrayUsed);
  }, [tabKey]);

  function testFunc(e) {
    console.log(e.target);
  }

  return (
    <>
      <div style={{ marginTop: 30 }}>
        <Stage
          style={{
            border: "1px solid #333",
            marginLeft: "5rem",
            marginRight: "5rem",
            borderRadius: "5px",
          }}
          width={window.innerWidth}
          height={window.innerHeight}
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
                }

                return (
                  <>
                    <Group
                      onDragEnd={(e) => {
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
                      draggable
                    >
                      <Text
                        offsetX={-70}
                        offsetY={-100}
                        text={` ${square[0]} רוחב`}
                        fontSize={15}
                      />
                      <Text
                        rotation={270}
                        offsetX={170}
                        offsetY={-50}
                        text={` ${square[1]} אורך`}
                        fontSize={15}
                      />
                    

                      <Rect
                        onClick={() => {
                          console.log(isDragging);
                        }}
                        onDragMove={(e) => {
                          setisDragging(true);
                        }}
                        onDragStart={(event) => {
                          setisDragging(true);
                        }}
                        x={50}
                        y={100}
                        width={square[0] * 30}
                        height={square[1] * 30}
                        fill={square[2]}
                        opacity={0.6}
                      />
                    </Group>
                  </>
                );
              })}

            {/* {end of top konva} */}

            {type === "bottom" &&
              konvasquares.map((square, index) => {
                let width = [];
                let length = [];
                let arrowDirection = [];

                //4 - 140
                //3 - 105
                //2 - 70
                let lineRenderArr = [];
                let numberRenderArr = [];

                arrayUsed.forEach((square) => {
                  let opt4Amount = +square.opt4.amount;
                  let opt3Amount = +square.opt3.amount;
                  let opt2Amount = +square.opt2.amount;
                  let squareLines = [];
                  let renderedNumbers = [];

                  while (opt4Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 110
                      );
                    } else {
                      squareLines.push(110);
                    }
                    renderedNumbers.push(4);
                    opt4Amount--;
                  }
                  while (opt3Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 95
                      );
                    } else {
                      squareLines.push(95);
                    }
                    renderedNumbers.push(3);
                    opt3Amount--;
                  }
                  while (opt2Amount > 0) {
                    if (squareLines.length > 0) {
                      squareLines.push(
                        +squareLines[squareLines.length - 1] + 30
                      );
                    } else {
                      squareLines.push(30);
                    }
                    renderedNumbers.push(2);
                    opt2Amount--;
                  }
                  console.log("lineRenderArr : ", lineRenderArr);
                  lineRenderArr.push(squareLines);
                  numberRenderArr.push(renderedNumbers);
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
                }

                return (
                  <>
                    <Group draggable>
                      {/* {arrow direction } */}
                      {arrowDirection[index] === "vertical" && (
                        <Arrow
                          x={square[3]}
                          y={square[4]}
                          offsetX={-30}
                          offsetY={30}
                          points={[0, 45, 0, 70]}
                          width={30}
                          pointerLength={5}
                          pointerWidth={5}
                          stroke='darkgreen'
                          fill='darkgreen'
                        />
                      )}
                      {arrowDirection[index] === "horizantal" && (
                        <Arrow
                          x={square[3]}
                          y={square[4]}
                          offsetY={-30}
                          points={[30, 0, 50, 0]}
                          pointerLength={5}
                          pointerWidth={5}
                          stroke='darkgreen'
                          fill='darkgreen'
                        />
                      )}

                      {arrowDirection[index] === "horizantal" && (
                        <Text
                          x={square[3]}
                          y={square[4]}
                          offsetX={-25}
                          offsetY={0}
                          text={`אורך ${square[0]} `}
                          fontSize={15}
                        />
                      )}
                      {arrowDirection[index] === "vertical" && (
                        <Text
                          x={square[3]}
                          y={square[4]}
                          rotation={270}
                          offsetX={80}
                          offsetY={0}
                          text={` אורך ${square[1]} `}
                          fontSize={15}
                        />
                      )}

                      {/* {if arrow direction is vertical} */}

                      {arrowDirection[index] === "vertical" &&
                        lineRenderArr.length !== 0 &&
                        lineRenderArr[index].map((pos) => (
                          <>
                            <Line
                              x={square[3]}
                              y={square[4]}
                              draggable={true}
                              points={[pos, 0, pos, 32]}
                              stroke='darkgreen'
                              strokeWidth='6'
                              dash={[10, 10]}
                            ></Line>

                            {lineRenderArr[index].indexOf(pos) + 1 ===
                            lineRenderArr[index].length ? (
                              <>
                                <Text
                                  fontStyle='bold'
                                  textDecoration='underline'
                                  x={square[3]}
                                  y={square[4]}
                                  offsetX={
                                    arrayUsed[index].opt4.amount > 0
                                      ? -pos - 15
                                      : arrayUsed[index].opt3.amount > 0
                                      ? -pos - 15
                                      : arrayUsed[index].opt2.amount > 0
                                      ? -pos - 15
                                      : null
                                  }
                                  text={
                                    "גליל" +
                                    numberRenderArr[index][
                                      lineRenderArr[index].indexOf(pos) + 1
                                    ]
                                  }
                                  fontSize={15}
                                  fill={"black"}
                                />

                                <Text
                                  fontStyle='bold'
                                  textDecoration='underline'
                                  x={square[3]}
                                  y={square[4]}
                                  offsetX={
                                    arrayUsed[index].opt4.amount > 0
                                      ? -pos + 50
                                      : arrayUsed[index].opt3.amount > 0
                                      ? -pos + 50
                                      : arrayUsed[index].opt2.amount > 0
                                      ? -pos + 50
                                      : null
                                  }
                                  text={
                                    "גליל" +
                                    numberRenderArr[index][
                                      lineRenderArr[index].indexOf(pos)
                                    ]
                                  }
                                  fontSize={15}
                                />

                                {lineRenderArr[index].forEach((arr) =>
                                  console.log("arr : ", arr)
                                )}
                              </>
                            ) : (
                              <Text
                                fontStyle='bold'
                                textDecoration='underline'
                                x={square[3]}
                                y={square[4]}
                                offsetX={
                                  arrayUsed[index].opt4.amount > 0
                                    ? -pos + 50
                                    : arrayUsed[index].opt3.amount > 0
                                    ? -pos + 50
                                    : arrayUsed[index].opt2.amount > 0
                                    ? -pos + 50
                                    : null
                                }
                                text={
                                  "גליל" +
                                  numberRenderArr[index][
                                    lineRenderArr[index].indexOf(pos)
                                  ]
                                }
                                fontSize={15}
                              />
                            )}
                          </>
                        ))}
                      {arrowDirection[index] === "vertical" &&
                        lineRenderArr[index].length === 0 && (
                          <Text
                            fontStyle='bold'
                            textDecoration='underline'
                            x={square[3]}
                            y={square[4]}
                            offsetX={-40}
                            text={
                              arrayUsed[index].opt4.amount > 0
                                ? "גליל 4  "
                                : arrayUsed[index].opt3.amount > 0
                                ? "גליל 3"
                                : arrayUsed[index].opt2.amount > 0
                                ? "גליל 2"
                                : null
                            }
                            fontSize={15}
                          />
                        )}

                      {/* {if arrow direction is horizantal} */}

                      {arrowDirection[index] === "horizantal" &&
                        lineRenderArr.length !== 0 &&
                        lineRenderArr[index].map((pos) => (
                          <>
                            <Group>
                              <Line
                                x={square[3]}
                                y={square[4]}
                                draggable={true}
                                points={[0, pos, 32, pos]}
                                stroke='darkgreen'
                                strokeWidth='6'
                                dash={[10, 10]}
                              ></Line>
                              {lineRenderArr[index].indexOf(pos) + 1 ===
                              lineRenderArr[index].length ? (
                                <>
                                  <Text
                                    fontStyle='bold'
                                    textDecoration='underline'
                                    rotation={270}
                                    x={square[3]}
                                    y={square[4]}
                                    offsetX={
                                      arrayUsed[index].opt4.amount > 0
                                        ? pos - 60
                                        : arrayUsed[index].opt3.amount > 0
                                        ? pos - 60
                                        : arrayUsed[index].opt2.amount > 0
                                        ? pos - 60
                                        : null
                                    }
                                    text={
                                      "גליל" +
                                      numberRenderArr[index][
                                        lineRenderArr[index].indexOf(pos)
                                      ]
                                    }
                                    fontSize={15}
                                  />

                                  <Text
                                    fontStyle='bold'
                                    textDecoration='underline'
                                    rotation={270}
                                    x={square[3]}
                                    y={square[4]}
                                    offsetX={
                                      arrayUsed[index].opt4.amount > 0
                                        ? pos + 50
                                        : arrayUsed[index].opt3.amount > 0
                                        ? pos + 50
                                        : arrayUsed[index].opt2.amount > 0
                                        ? pos + 50
                                        : null
                                    }
                                    text={
                                      "גליל" +
                                      numberRenderArr[index][
                                        lineRenderArr[index].indexOf(pos) + 1
                                      ]
                                    }
                                    fontSize={15}
                                  />
                                </>
                              ) : (
                                <Text
                                  fontStyle='bold'
                                  textDecoration='underline'
                                  rotation={270}
                                  x={square[3]}
                                  y={square[4]}
                                  offsetX={
                                    arrayUsed[index].opt4.amount > 0
                                      ? pos - 70
                                      : arrayUsed[index].opt3.amount > 0
                                      ? pos - 70
                                      : arrayUsed[index].opt2.amount > 0
                                      ? pos - 70
                                      : null
                                  }
                                  text={
                                    "גליל" +
                                    numberRenderArr[index][
                                      lineRenderArr[index].indexOf(pos)
                                    ]
                                  }
                                  fontSize={15}
                                />
                              )}
                            </Group>
                          </>
                        ))}
                      {arrowDirection[index] === "horizantal" &&
                        lineRenderArr[index].length === 0 && (
                          <Text
                            fontStyle='bold'
                            textDecoration='underline'
                            x={square[3]}
                            y={square[4]}
                            // offsetY={-40}
                            offsetX={60}
                            rotationDeg={270}
                            text={
                              arrayUsed[index].opt4.amount > 0
                                ? "גליל 4  "
                                : arrayUsed[index].opt3.amount > 0
                                ? "גליל 3"
                                : arrayUsed[index].opt2.amount > 0
                                ? "גליל 2"
                                : null
                            }
                            fontSize={15}
                          />
                        )}
                      {arrowDirection[index] === "horizantal" && (
                        <Rect
                          x={square[3] + 60}
                          y={square[4] - 75}
                          draggable={true}
                          stroke={square[2]}
                          strokeWidth='4'
                          rotationDeg={132}
                        ></Rect>
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
                      {/* {if we are in konva bottom use also square for glilim} */}

                      {type === "bottom" && (
                        <Rect
                          draggable
                          x={square[3]}
                          y={square[4]}
                          width={width[index] * 30}
                          height={length[index] * 30}
                          fill='transparent'
                          stroke='darkgreen'
                          draggable={false}
                          strokeWidth='4'
                          dash={[10, 10]}
                        ></Rect>
                      )}

                      {/* {the original square from top} */}

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
                        width={square[0] * 30}
                        height={square[1] * 30}
                        fill={square[2]}
                        opacity={0.6}
                      />
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
