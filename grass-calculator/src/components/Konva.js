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
  Group,
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
                <Group draggable>
                  <Text
                    x={110}
                    y={30}
                    text={`רוחב ${square[0]}`}
                    fontSize={15}
                  />
                  <Text
                    x={110}
                    y={5}
                    text={` אורך ${square[1]}`}
                    fontSize={15}
                  />
                  <Rect
                    x={100}
                    y={50}
                    width={square[0] / 2.7}
                    height={square[1] / 2.7}
                    fill='green'
                    stroke='black'
                    strokeWidth='2'
                  />
                </Group>
              </>
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Konva;
