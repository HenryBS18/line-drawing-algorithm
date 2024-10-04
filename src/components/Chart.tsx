import { Coordinate } from "../types";
import Block from "./Block";

interface ChartProps {
  coordinates?: Coordinate[];
}

const Chart = ({ coordinates }: ChartProps) => {
  const xVals = coordinates!.map(c => c.x);
  const yVals = coordinates!.map(c => c.y);

  const xMin = Math.min(...xVals);
  const xMax = Math.max(...xVals);
  const yMin = Math.min(...yVals);
  const yMax = Math.max(...yVals);

  const xRange = xMax - xMin + 1;
  const yRange = yMax - yMin + 1;

  const isCoordinate = (xPos: number, yPos: number) => {
    return coordinates!.some(coord => coord.x === xPos && coord.y === yPos);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col">
          {
            Array.from({ length: yRange }).map((_, i) => {
              const yval = yMax - i;
              return (
                <div
                  key={i}
                  className={`w-[50px] h-[50px] border border-black bg-slate-100 flex justify-center items-center`}
                >
                  {yval}
                </div>
              );
            })
          }
        </div>
        <div
          className="scale-x-[-1] w-fit h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${xRange}, 50px)`,
            gridTemplateRows: `repeat(${yRange}, 50px)`,
          }}
        >
          {
            Array.from({ length: xRange * yRange }).map((_, i) => {
              const xPos = (i % xRange) + xMin;
              const yPos = Math.floor(i / xRange) + yMin;
              return <Block key={i} xPos={xPos} yPos={yPos} isCoordinate={isCoordinate} />
            })
          }
        </div>
      </div>
      <div className="flex w-fit">
        <div className={`w-[50px] h-[50px] border border-black bg-slate-100 flex justify-center items-center`}></div>
        {
          Array.from({ length: xRange }).map((_, i) => {
            const xval = i + xMin;
            return (
              <div
                key={i}
                className={`w-[50px] h-[50px] border border-black bg-slate-100 flex justify-center items-center`}
              >
                {xval}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Chart;
