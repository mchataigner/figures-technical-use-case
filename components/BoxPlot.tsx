import { percentiles } from "@/lib/percentiles";
import { posAxis, yAxis, yBounds } from "@/lib/chart_utils";
import { Fragment } from "react";

const PERCENTILES = [10, 25, 50, 75, 90];

const YAxis = ({ minY, maxY, pos }) => {
  const salaryYAxis = yAxis(minY, maxY);
  return (
    <>
      {salaryYAxis.map((v, i) => (
        <Fragment key={i}>
          <span
            className="absolute w-full border-2 left-24 border-dashed"
            style={{
              bottom: `calc(${pos(v)} + 0.75rem)`,
              width: "calc(100% - 6rem)",
            }}
          />
          <span className="absolute" style={{ bottom: `calc(${pos(v)})` }}>
            {v}€
          </span>
        </Fragment>
      ))}
    </>
  );
};

export const BoxPlot = ({ salaries, minSalary, maxSalary }) => {
  const [p10, p25, p50, p75, p90] = percentiles(salaries, ...PERCENTILES).map(
    (v) => Math.floor(v / 100)
  );

  const { minY, maxY } = yBounds(minSalary / 100, maxSalary / 100);

  const pos = posAxis(minY, maxY);

  return (
    <div
      className="relative border-2 px-2 overflow-x-auto"
      style={{ height: `calc(100% - 8rem)`, width: "100%" }}
    >
      <YAxis minY={minY} maxY={maxY} pos={pos} />
      <div className="relative left-72 h-full w-96">
        {/* moustaches */}
        {[
          [p10, p25],
          [p75, p90],
        ].map(([low, hi], i) => (
          <span
            key={i}
            className="absolute left-48 w-0 border-2 border-lime-500"
            style={{
              bottom: `calc(${pos(low)} + 1.5rem)`,
              top: `calc(${pos(hi, true)} + 1.5rem)`,
            }}
          />
        ))}

        {/* box */}
        <span
          className="absolute w-full rounded-lg border-4 border-lime-500 bg-pink-300"
          style={{
            bottom: `calc(${pos(p25)} + 0.75rem + 1px)`,
            top: `calc(${pos(p75, true)} + 0.75rem)`,
          }}
        />

        {/* median */}
        <span
          className="absolute w-full border-2 border-lime-500"
          style={{
            bottom: `calc(${pos(p50)} + 0.75rem)`,
          }}
        />

        {/* labels */}
        {[p10, p25, p50, p75, p90].map((pValue, i) => (
          <div
            key={i}
            className="absolute left-36 w-24 flex justify-center mx-auto rounded border-lime-500 box-border border-4 bg-white"
            id={`P${PERCENTILES[i]}`}
            data-testid={`P${PERCENTILES[i]}`}
            style={{
              bottom: `calc(${pos(pValue)} - 2px)`,
            }}
          >
            {pValue}€
          </div>
        ))}
      </div>
    </div>
  );
};
