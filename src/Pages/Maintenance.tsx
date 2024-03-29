import { Add } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ExcelExport, MaintenanceCard } from "../components";
import { getMonth } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useScreenSize } from "../hooks/useScreenSize";
import { useWaterReadings } from "../hooks/useWaterReading";
import { useStore } from "../Providers";

export const Maintenance = () => {
  const [state] = useStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { calculate } = useWaterReadings(
    state.flatDetails.reduce(
      (a, f) => ({ ...a, ...f.water_reading.previous }),
      {}
    )
  );
  const [localState, setLocalState] = useState<any>();
  const isMobile = useScreenSize() < 600;

  useEffect(() => {
    setLocalState(
      calculate(
        state.flatDetails.reduce(
          (a, f) => ({ ...a, ...f.water_reading.current }),
          {}
        )
      )
    );
  }, []);

  useEffect(() => {
    console.log(localState);
  }, [localState]);
  return (
    <Stack flex={1} gap={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5">
          Maintenance For {getMonth(state.commonDetails?.expenses?.[0]?.date)}
        </Typography>
        <Box>
          <ExcelExport />
          {user?.isAdmin ? (
            <Fab
              aria-label="add"
              color="primary"
              variant={isMobile ? "circular" : "extended"}
              sx={
                isMobile
                  ? {
                      position: "absolute",
                      bottom: 24,
                      right: 24,
                      backgroundColor: "#8757d1",
                      zIndex: 0,
                    }
                  : { backgroundColor: "#8757d1", zIndex: 0 }
              }
              onClick={() => navigate("/apartments/details")}
            >
              <Add /> {isMobile ? "" : "Add Readings"}
            </Fab>
          ) : null}
        </Box>
      </Stack>
      <Stack
        display={"grid"}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={2}
        pb={isMobile ? 6 : 0}
      >
        {state.flatDetails.map((flat) => (
          <MaintenanceCard
            key={flat.flat}
            name={flat.tenant}
            flat={flat.flat}
            overdueAmount={flat.overdue_amount}
            commonAmount={(state.commonDetails.commonAmount / 6).toFixed(0)}
            waterAmount={
              (state.commonDetails.waterAmount *
                (localState?.individual_water_percentages[flat.flat] || 0)) /
              100
            }
            status={flat.payment_status}
          />
        ))}
      </Stack>
    </Stack>
  );
};
