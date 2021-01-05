import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";

const Konva = ({
  squares,
  type,
  tabKey,
  summary,
  xDirectionSquare,
  yDirectionSquare,
  resultForClientPchat,
}) => {
  // {
  //   opt4: { amount: 0, length: 0 },
  //   opt3: { amount: 0, length: 0 },
  //   opt2: { amount: 0, length: 0 },
  //   pchat: 0,
  // }
  const [arrayUsed, setarrayUsed] = useState([]);

  useEffect(() => {
    // if (tabKey === "מינימום חיבורים + כיוון סיב אחיד בין הגלילים") {
    //   setarrayUsed(summary.minChiburWithDirection);
    // }
    if (tabKey === "מינימום פחת") {
      setarrayUsed(resultForClientPchat);
    }
    // if (tabKey === "מינימום פחת + כיוון סיב אחיד בין הגלילים") {
    //   setarrayUsed(summary.minPchatWithDirectionSummary);
    // }
    // if (tabKey === "מינימום חיבורים") {
    //   setarrayUsed(summary.minChiburNoDirection);
    // }
    console.log("xDirectionSquare : ", xDirectionSquare);
    console.log("yDirectionSquare : ", yDirectionSquare);
    console.log("arrayUsed : ", arrayUsed);
  }, [tabKey]);

  return (
    <>
      <div>
        <Stage
          style={{ border: "3px solid green", margin: "3rem" }}
          width={window.innerWidth / 2}
          height={window.innerHeight / 2}
        >
          <Layer>
            {squares.map((square, index) => {
              let width = [];
              let length = [];

              if (arrayUsed.length !== 0) {
                console.log("i am here 777");
                if (
                  arrayUsed[index].opt2.length ||
                  arrayUsed[index].opt3.length ||
                  arrayUsed[index].opt4.length === square[1]
                ) {
                  width[index] =
                    arrayUsed[index].opt2.amount * 2 +
                    arrayUsed[index].opt3.amount * 3 +
                    arrayUsed[index].opt4.amount * 4;
                  length[index] = square[1];
                } else {
                  width[index] = square[1];
                  length[index] =
                    arrayUsed[index].opt2.amount * 2 +
                    arrayUsed[index].opt3.amount * 3 +
                    arrayUsed[index].opt4.amount * 4;
                }

                console.log("width : ", width);
                console.log("length : ", length);
              }

              return (
                <>
                  <Group draggable>
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
                      x={100}
                      y={50}
                      width={square[0] * 30}
                      height={square[1] * 30}
                      fill={square[2]}
                      stroke='black'
                      strokeWidth='4'
                    />
                    {type === "bottom" && (
                      <Rect
                        draggable
                        x={100}
                        y={50}
                        width={width[index] * 30}
                        height={length[index] * 30}
                        fill='transparent'
                        stroke={square[2]}
                        draggable={false}
                        strokeWidth='2'
                        dash={[10, 10]}
                      ></Rect>
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
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Konva;
