import { AddCircleOutlined, Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  List,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { updateCommon, updateReadings } from "../api";
import { getMonth, water_lines } from "../constants";
import { useWaterReadings } from "../hooks/useWaterReading";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

const Details = () => {
  const [open, setOpen] = React.useState(false);
  const [state, dispatch] = useStore();
  const [activeLine, setActiveLine] = React.useState<Record<string, number>>(
    {}
  );
  const [waterLines, setWaterLines] = React.useState<Record<string, number>>(
    {}
  );
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
    updateReadings(readings).then((data) =>
      dispatch({ type: ACTIONTYPES.FLATDETAILS, payload: data })
    );
    let details = calculate();
    updateCommon({ ...state.commonDetails, ...details }).then((data) =>
      dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
    );
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
      <Stack flex={1} spacing={2}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
          subheader={
            <ListSubheader
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography>Water Readings of {getMonth()}</Typography>
              <Button
                variant="contained"
                onClick={handleCalculate}
                disabled={
                  Object.values(waterLines).reduce(
                    (a, v) => (v ? ++a : a),
                    0
                  ) !== 20
                }
              >
                Calculate
              </Button>
            </ListSubheader>
          }
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            gap={1}
            p={2}
            pt={0}
          >
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
                      <AddCircleOutlined />
                    </Stack>
                  </CardActionArea>
                </Card>
                {line.includes("C") && !line.includes("1") ? <Box></Box> : null}
              </React.Fragment>
            ))}
          </Box>
        </List>
      </Stack>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>
          Add Water Reading for - {Object.keys(activeLine)[0]}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justifyContent="space-between">
            <Grid item xs={7}>
              <TextField
                type="number"
                fullWidth
                label="Enter Reading"
                onChange={({ target: { value } }) =>
                  setActiveLine((line) => ({
                    [Object.keys(line)[0]]: +value,
                  }))
                }
              />
            </Grid>
            <Fab color="success" onClick={() => handleClose(true)}>
              <CheckCircle />
            </Fab>
            <Fab color="error" onClick={() => handleClose(false)}>
              <Cancel />
            </Fab>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Details;
