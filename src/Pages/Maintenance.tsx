import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { ExcelExport, MaintenanceCard } from "../components";
import { getMonth } from "../constants";
import { useStore } from "../Providers";

export const Maintenance = () => {
  const [state] = useStore();
  const navigate = useNavigate();

  return (
    <Stack flex={1} gap={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5">Maintenance For {getMonth()}</Typography>
        <Box>
          <ExcelExport />
          <Button
            variant="outlined"
            onClick={() => navigate("/apartments/details")}
          >
            Add Water Readings
          </Button>
        </Box>
      </Stack>
      <Stack
        display={"grid"}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={2}
      >
        {state.flatDetails.map((flat) => (
          <MaintenanceCard
            name={flat.tenant}
            flat={flat.flat}
            overdueAmount={flat.overdue_amount}
            commonAmount={(state.commonDetails.commonAmount / 6).toFixed(0)}
            waterAmount={
              (state.commonDetails.waterAmount *
                (state.commonDetails.individual_water_percentages[flat.flat] ||
                  0)) /
              100
            }
            status={flat.payment_status}
          />
        ))}
      </Stack>
    </Stack>
  );
};
