import { AddCircleOutlined, ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { updateCommon, updateReadings } from "../api";
import { getMonth, water_lines } from "../constants";
import { useScreenSize } from "../hooks/useScreenSize";
import { useWaterReadings } from "../hooks/useWaterReading";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

const Details = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const [state, dispatch] = useStore();

  const [open, setOpen] = React.useState(false);
  const [confirmCalc, setConfirmCalc] = React.useState(false);
  const [activeLine, setActiveLine] = React.useState<Record<string, number>>(
    {}
  );
  const [waterLines, setWaterLines] = React.useState<Record<string, number>>(
    {}
  );

  const isMobile = useScreenSize() < 600;
  const { calculate } = useWaterReadings(
    state.flatDetails.reduce(
      (acc, flat) => ({ ...acc, ...flat.water_reading.previous }),
      {}
    ),
    waterLines
  );

  const handleCalculate = () => {
    let readings: Record<string, Record<string, number>> = {
      F1: {},
      F2: {},
      F3: {},
      S1: {},
      S2: {},
      S3: {},
    };
    Object.entries(waterLines).map(([key, value]) => {
      readings[key.slice(0, 2)][key] = value;
    });
    updateReadings(readings)
      .then((data) =>
        dispatch({ type: ACTIONTYPES.FLATDETAILS, payload: data })
      )
      .then((_) => {
        let details = calculate();
        updateCommon({ ...state.commonDetails, ...details })
          .then((data) =>
            dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
          )
          .then((_) => navigate("/apartments/maintenance"));
      });
  };

  const handleClose = (isAdd: boolean) => {
    if (isAdd) setWaterLines((lines) => ({ ...lines, ...activeLine }));
    setOpen(false);
  };

  React.useEffect(() => {
    if (state.flatDetails.length === 6) {
      setWaterLines(
        state.flatDetails.reduce(
          (acc, val) => ({ ...acc, ...val.water_reading.current }),
          {}
        )
      );
    }
  }, [state.flatDetails]);

  return (
    <>
      <Stack
        flex={1}
        spacing={2}
        p={2}
        sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
      >
        <Box>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack /> Maintenance
          </Button>
        </Box>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Water Readings of {getMonth()}</Typography>
          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={() => setWaterLines({})}>
              Clear Readings
            </Button>
            <Button
              variant="contained"
              onClick={() => setConfirmCalc(true)}
              disabled={
                Object.values(waterLines).reduce((a, v) => (v ? ++a : a), 0) !==
                20
              }
              sx={
                isMobile
                  ? {
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      borderRadius: 0,
                      height: 45,
                      zIndex: 1,
                    }
                  : {}
              }
            >
              Calculate
            </Button>
          </Box>
        </Stack>
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1}>
          {water_lines.map((line) => (
            <React.Fragment key={line}>
              <Card
                sx={{
                  backgroundColor: !!waterLines[line] ? "#8757d130" : "white",
                }}
              >
                <CardActionArea
                  sx={{
                    p: 2,
                  }}
                  onClick={() => {
                    setActiveLine({ [line]: 0 });
                    setOpen(true);
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack>
                      <Typography variant="h6">{line}</Typography>
                      <Typography variant="body2">
                        {waterLines[line] || "-"}
                      </Typography>
                    </Stack>
                    {matches ? <AddCircleOutlined /> : null}
                  </Stack>
                </CardActionArea>
              </Card>
              {line.includes("C") && !line.includes("1") ? <Box></Box> : null}
            </React.Fragment>
          ))}
        </Box>
      </Stack>

      {/* Reading Modal */}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>
          Add Water Reading for - {Object.keys(activeLine)[0]}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            type="number"
            fullWidth
            label="Enter Reading"
            onChange={({ target: { value } }) =>
              setActiveLine((line) => ({
                [Object.keys(line)[0]]: +value * 100,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleClose(true)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Calculate Modal */}
      <Dialog open={confirmCalc} onClose={() => setConfirmCalc(false)}>
        <DialogTitle>Calculation Confirmation</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            Before calculating, make sure you added all the common expenses.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setConfirmCalc(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCalculate}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Details;
