import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../Providers";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getMonth } from "../constants";

export const Home = () => {
  const [{ flatDetails, commonDetails }] = useStore();
  const { user } = useAuth();

  const payment_status = flatDetails.filter((f) => f.flat === user.flat)?.[0]
    ?.payment_status;

  const postMsg = async () => {
    addDoc(collection(db, "notifications"), {
      message: "added maintanence",
      timeStamp: serverTimestamp(),
    }).then((v) => console.log("Notification added."));
  };

  return (
    <Stack flex={1} direction="column" gap={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap={"wrap"}
        gap={2}
      >
        <Typography variant="h5">Dashboard</Typography>
        <Stack direction="row" gap={2}></Stack>
      </Box>
      <Grid
        container
        sx={{ background: "#ffffff50", height: "100%" }}
        p={2}
        gap={2}
        borderRadius={2}
      >
        <Grid item>
          <Card sx={{ p: 2 }} raised>
            <Typography variant="body1">
              {getMonth(commonDetails.expenses[0].date)} month Maintenance
              Payment Status
            </Typography>
            <hr />
            <Typography
              variant="body1"
              sx={{
                color: (theme) =>
                  payment_status === "paid"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {payment_status}
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ p: 2 }} raised>
            <Typography variant="body1">Notifications</Typography>
            <hr />
            <Typography variant="body2">
              - Initiated Metro Water connection process
            </Typography>
            <Typography variant="body2">
              - Initiated Sewage connection process
            </Typography>
            <Typography variant="body2">
              - Initiated CCTV connection process
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
