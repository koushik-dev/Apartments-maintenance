import React from "react";
import { CommonExpense } from "../model";

type Reading = Record<string, number>;

export const useWaterReadings: (
  oldReadings: Reading,
  newReadings: Reading
) => { calculate: () => Partial<CommonExpense> } = (
  oldReadings,
  newReadings
) => {
  const getPercentage = (total: number, actual: number) => {
    return +((actual / total) * 100).toFixed(2);
  };

  const calculate = () => {
    const pipelines = Object.keys(newReadings);
    let totalReadings: Reading = {};
    pipelines.map((line) => {
      const index = line.match(/[0-9]/)?.["index"] || -1;
      const flat = line.slice(0, index + 1);
      const sum = totalReadings[flat] ?? 0;
      totalReadings[flat] = sum + (newReadings[line] - oldReadings[line]);
    });
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
