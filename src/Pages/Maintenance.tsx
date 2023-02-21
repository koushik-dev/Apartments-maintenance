import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { Table } from "../components";
import { getFlatTotalAmount, getMonth, MaintenanceCols } from "../constants";
import { useStore } from "../Providers";

export const Maintenance = () => {
  const [state] = useStore();
  const navigate = useNavigate();

  const getMaintenanceRows = () =>
    state.flatDetails.map((flat) => ({
      ...flat,
      totalAmount: getFlatTotalAmount(
        flat.overdue_amount,
        state.commonDetails.individual_water_percentages[flat.flat] || 0,
        state.commonDetails.waterAmount,
        state.commonDetails.commonAmount
      ),
    }));

  return (
    <Stack flex={1} gap={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Maintenance For {getMonth()}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/apartments/details")}
        >
          Add Water Readings
        </Button>
      </Stack>
      <Table rows={getMaintenanceRows()} columns={MaintenanceCols} />
    </Stack>
  );
};
