import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../Providers";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getMonth } from "../constants";
import { Link } from "react-router-dom";

export const Home = () => {
  const [{ flatDetails, commonDetails }] = useStore();
  const { user } = useAuth();

  const payment_status = flatDetails.filter((f) => f.flat === user.flat)?.[0]
    ?.payment_status;

  React.useEffect(() => {
    console.log(import.meta.env.REACT_APP_ADMIN_PASSWORD);
  }, []);

  return (
    <Stack flex={1} direction="column" gap={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap={"wrap"}
        gap={2}
      >
        <Stack direction="row" gap={2}></Stack>
      </Box>
      <Stack
        flex={1}
        sx={{ background: "#ffffff" }}
        p={2}
        gap={2}
        borderRadius={2}
      >
        <Typography variant="h4" alignSelf={"center"} mt={3}>
          Welcome {flatDetails.find((v) => v.flat === user.flat)?.tenant}!
        </Typography>
        <Box display={"flex"} gap={2} alignSelf={"center"}>
          <Link to="/apartments/maintenance">
            <Button variant="outlined">Check my Maintenance Bill</Button>
          </Link>
          <Link to="/apartments/people">
            <Button variant="outlined">Show Apartments Residents</Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};
