import React from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Label,
  Tag,
} from "react-konva";

const Konva = ({ squares }) => {
  return (
    <>
      <div style={{ width: "65%" }}>
        <h1>konva !~@#</h1>

        <Stage
          style={{ border: "3px solid green", margin: "3rem" }}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {squares.map((square) => (
              <>
                <Text text={`אורך : ${square[1]}`} fontSize={15} />
                <Rect
                  x={100}
                  y={50}
                  width={square[0] / 2.7}
                  height={square[1] / 2.7}
                  fill='green'
                  stroke='black'
                  strokeWidth='2'
                  draggable
                />
                <Label x={120} y={60}>
                  <Tag
                    fill={"black"}
                    fontFamily={"Calibri"}
                    fontSize={18}
                    padding={5}
                    pointerDirection={"down"}
                    pointerWidth={10}
                    pointerHeight={10}
                    lineJoin={"round"}
                    shadowColor={"black"}
                    shadowBlur={10}
                    shadowOffset={10}
                    shadowOpacity={0.5}
                  />
                  <Text
                    text={"label test"}
                    fontFamily={"Calibri"}
                    fontSize={18}
                    padding={5}
                    fill={"white"}
                  />
                </Label>
              </>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Konva;
