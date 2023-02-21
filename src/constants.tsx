import { Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { AmountInfo } from "./components";
import { MaintenanceActions } from "./components/MaintenanceActions";

const PeopleCols: GridColDef[] = [
  {
    field: "tenant",
    headerName: "Resident",
    width: 160,
  },
  {
    field: "flat",
    headerName: "Flat",
    width: 160,
  },
  {
    field: "contact_number",
    headerName: "Contact Number",
    width: 200,
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 160,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    width: 160,
    renderCell: (params) => <>{new Date(params.value).toDateString()}</>,
  },
];
const MaintenanceCols: GridColDef[] = [
  {
    field: "tenant",
    headerName: "Resident",
    width: 160,
  },
  {
    field: "flat",
    headerName: "Flat",
    width: 75,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    width: 160,
    renderCell: (params) => <>{new Date(params.value).toDateString()}</>,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 200,
    renderCell: (params) => <AmountInfo {...{ params }} />,
  },
  {
    field: "payment_status",
    headerName: "Payment Status",
    width: 160,
    renderCell: ({ value }) => (
      <Chip label={value} color={value === "pending" ? "error" : "success"} />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => <MaintenanceActions {...{ params }} />,
  },
];
export const water_lines = [
  "F1A",
  "F1B",
  "F1C",
  "F1D",
  "F2A",
  "F2B",
  "F2C",
  "F3A",
  "F3B",
  "F3C",
  "S1A",
  "S1B",
  "S1C",
  "S1D",
  "S2A",
  "S2B",
  "S2C",
  "S3A",
  "S3B",
  "S3C",
];
export const Flats = ["F1", "F2", "F3", "S1", "S2", "S3"];
export const getMonth = () =>
  new Date().toLocaleString("en-US", { month: "long" });
export const getFlatTotalAmount = (
  overdue_amount: number,
  individual_water_percentage: number,
  waterAmount: number,
  commonAmount: number
) => {
  return (
    overdue_amount +
    (individual_water_percentage / 100) * waterAmount +
    commonAmount / 6
  );
};

export { PeopleCols, MaintenanceCols };
