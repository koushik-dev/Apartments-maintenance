import { Button } from "@mui/material";
import React from "react";
import { utils, writeFile } from "xlsx";
import { FlatDetails } from "../model";
import { useStore } from "../Providers";

export const ExcelExport = () => {
  const [{ flatDetails, commonDetails }] = useStore();

  let commonExpenseTotal = 0;
  const reading = [...flatDetails].reduce(
    (acc: any[], { water_reading: { previous, current }, flat }) => {
      const meters = Object.keys(previous);
      const readings = meters.map((key) => ({
        Flat: flat,
        "Meter Number": key,
        "Start Meter Reading": previous[key],
        "End Meter Reading": current[key],
        Difference: current[key] - previous[key],
        "Consumption(End-Initial)": commonDetails.individual_water_usage[flat],
      }));
      return [...acc, ...readings];
    },
    []
  );

  const sheet2 = [...flatDetails].map(({ flat, water_reading }) => {
    const misc_expenses =
      commonDetails.expenses.reduce(
        (sum, v) =>
          v.expense === "water_load_purchased" ? sum : v.amount + sum,
        0
      ) / 6;

    const start = Object.values(water_reading.previous).reduce(
      (a, v) => a + v,
      0
    );
    const end = Object.values(water_reading.current).reduce((a, v) => a + v, 0);
    const total = (
      +(
        commonDetails.waterAmount *
          (commonDetails.individual_water_percentages[flat] / 100) || 0
      ).toFixed(1) + misc_expenses
    ).toFixed(0);

    return {
      Flat: flat,
      "Start Meter Reading": start,
      "End Meter Reading": end,
      "Consumption(End-Initial)": end - start,
      "Percentage Consumption[Water consumed by flat/Total Consumed Water]":
        commonDetails.individual_water_percentages[flat] + "%",
      'Water Charges as per "%" consumption[percentage * Total cost of water]':
        +(
          commonDetails.waterAmount *
            (commonDetails.individual_water_percentages[flat] / 100) || 0
        ).toFixed(1),
      "Misc. Expenses per flat[K/6]": misc_expenses,
      "Total Expense for Each Flat": +total,
      "Total Nearest 10": +total + (10 - (+total % 10)),
    };
  });

  type SH1 = {
    "Expense Type": string;
    "Expense Amount": string;
    "Expense Made on": string;
  };
  const sheet1 = commonDetails.expenses
    .reduce((acc: any[], exp) => {
      commonExpenseTotal += +exp.amount;
      return [
        ...acc,
        {
          "Expense Type": exp.expense
            .split("_")
            .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
            .join(" "),
          Description: exp.reason,
          "Expense Made on": exp.date,
          "Expense Amount": exp.amount,
        },
      ];
    }, [])
    .sort((a: SH1, b: SH1) => (a["Expense Type"] < b["Expense Type"] ? -1 : 1));

  sheet1.push({
    "Expense Type": "Apartments Total Expense for March Month",
    Description: "",
    "Expense Made on": "",
    "Expense Amount": commonExpenseTotal,
  });

  const exportFile = () => {
    const wb = utils.book_new();

    /* Sheet 1 */
    const ws1 = utils.json_to_sheet(sheet1);
    ws1["!merges"] = [
      {
        s: { r: commonDetails.expenses.length + 1, c: 0 },
        e: { r: commonDetails.expenses.length + 1, c: 2 },
      },
    ];
    ws1["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    utils.book_append_sheet(wb, ws1, "Apartment Expenses");

    /* Sheet 2 */
    const ws2 = utils.json_to_sheet(sheet2);
    ws2["!cols"] = [
      { wch: 12 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
    ];
    utils.book_append_sheet(wb, ws2, "Per Flat Charges");

    /* Sheet 3 */
    const ws3 = utils.json_to_sheet(reading);
    ws3["!merges"] = [
      { s: { r: 1, c: 0 }, e: { r: 4, c: 0 } },
      { s: { r: 5, c: 0 }, e: { r: 7, c: 0 } },
      { s: { r: 8, c: 0 }, e: { r: 10, c: 0 } },
      { s: { r: 11, c: 0 }, e: { r: 14, c: 0 } },
      { s: { r: 15, c: 0 }, e: { r: 17, c: 0 } },
      { s: { r: 18, c: 0 }, e: { r: 20, c: 0 } },
      { s: { r: 1, c: 5 }, e: { r: 4, c: 5 } },
      { s: { r: 5, c: 5 }, e: { r: 7, c: 5 } },
      { s: { r: 8, c: 5 }, e: { r: 10, c: 5 } },
      { s: { r: 11, c: 5 }, e: { r: 14, c: 5 } },
      { s: { r: 15, c: 5 }, e: { r: 17, c: 5 } },
      { s: { r: 18, c: 5 }, e: { r: 20, c: 5 } },
    ];
    ws3["!cols"] = [
      { wch: 12 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
    ];

    utils.book_append_sheet(wb, ws3, "WaterReadings");
    writeFile(wb, "Sai Adharshya Flats_Maintenance.xlsx");
  };
  return <Button onClick={() => exportFile()}>Download</Button>;
};
