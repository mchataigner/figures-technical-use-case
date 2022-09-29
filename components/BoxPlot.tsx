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
              bottom: `calc(${pos(v)} + 0.5rem)`,
              width: "calc(100% - 6rem)",
              lineHeight: "1rem",
            }}
          />
          <span
            className="absolute"
            style={{ bottom: `calc(${pos(v)})`, lineHeight: "1rem" }}
          >
            {v}€
          </span>
        </Fragment>
      ))}
    </>
  );
};

export const BoxPlot = ({ job, minSalary, maxSalary }) => {
  const [p10, p25, p50, p75, p90] = [
    job.p10,
    job.p25,
    job.p50,
    job.p75,
    job.p90,
  ];

  const { minY, maxY } = yBounds(minSalary, maxSalary);

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
            className="absolute left-48 w-0 border-2 border-emerald-600"
            style={{
              bottom: `calc(${pos(low)} + 1rem)`,
              top: `calc(${pos(hi, true)} + 1rem)`,
            }}
          />
        ))}

        {/* box */}
        <span
          className="absolute w-full rounded-lg border-4 border-emerald-600 bg-pink-300"
          style={{
            bottom: `calc(${pos(p25)} + 0.5rem)`,
            top: `calc(${pos(p75, true)} - 4px + 0.5rem)`,
          }}
        />

        {/* median */}
        <span
          className="absolute w-full border-2 border-emerald-600"
          style={{
            bottom: `calc(${pos(p50)} + 0.5rem)`,
          }}
        />

        {/* labels */}
        {[p10, p25, p50, p75, p90].map((pValue, i) => (
          <div
            key={i}
            className="absolute left-36 w-24 flex justify-center mx-auto rounded border-emerald-600 box-border border-4 bg-white"
            id={`P${PERCENTILES[i]}`}
            data-testid={`P${PERCENTILES[i]}`}
            style={{
              bottom: `calc(${pos(pValue)} - 2px)`,
              lineHeight: "1rem",
            }}
          >
            {pValue}€
          </div>
        ))}
      </div>
    </div>
  );
};
