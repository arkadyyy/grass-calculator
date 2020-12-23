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
        <Stage
          style={{ border: "3px solid green", margin: "3rem" }}
          width={window.innerWidth / 3}
          height={window.innerHeight / 3}
        >
          <Layer>
            {squares.map((square) => (
              <>
                <Group draggable>
                  <Text x={110} y={30} text={` ${square[0]} ר`} fontSize={15} />
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
                    width={square[0] / 5}
                    height={square[1] / 5}
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
