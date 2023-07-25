import React from "react";
import { CommonExpense } from "../model";

type Reading = Record<string, number>;

export const useWaterReadings: (oldReadings: Reading) => {
  calculate: (newReadings: Reading) => Partial<CommonExpense>;
} = (oldReadings) => {
  const getPercentage = (total: number, actual: number) => {
    return +((actual / total) * 100).toFixed(2);
  };

  const calculate = (newReadings: Reading) => {
    const pipelines = Object.keys(newReadings);
    let totalReadings: Reading = { F1: 0, F2: 0, F3: 0, S1: 0, S2: 0, S3: 0 };
    pipelines.map(
      (line) =>
        (totalReadings[line.slice(0, 2)] +=
          newReadings[line] - oldReadings[line])
    );
    const total_water_usage = Object.values(totalReadings).reduce(
      (a: number, v: number) => a + v,
      0
    );
    return {
      total_water_usage,
      individual_water_usage: totalReadings,
      individual_water_percentages: Object.entries(totalReadings).reduce(
        (acc, [flat, actual]) => ({
          ...acc,
          [flat]: getPercentage(total_water_usage, actual),
        }),
        {}
      ),
    };
  };

  return { calculate };
};
