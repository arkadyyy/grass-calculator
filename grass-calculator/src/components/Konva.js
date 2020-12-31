import React from "react";
import {Stage,Layer,Rect,Text,Group,} from "react-konva";

const Konva = ({ squares }) => {

 

  return (
    <>
      <div>
        <Stage
          style={{ border: "3px solid green", margin: "3rem" }}
          width={window.innerWidth / 2}
          height={window.innerHeight / 2}
        >
          <Layer>
            {squares.map((square, index) => (
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
                    width={square[0]*20}
                    height={square[1]*20}
                    fill={square[2]}
                    stroke='black'
                    strokeWidth='2'
                  />
                  <Text
                    x={120}
                    y={80}
                    text={`${index + 1}`}
                    fontSize={15}
                    fill={"black"}
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
