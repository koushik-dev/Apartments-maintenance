import { Box, Stack, Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { Header, Loader, Sidebar } from ".";
import { getFlatDetails, getCommon } from "../api";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(0);
  const [, dispatch] = useStore();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  React.useEffect(() => {
    setLoading(2);
    getFlatDetails().then((data) => {
      dispatch({
        type: ACTIONTYPES.FLATDETAILS,
        payload: data,
      });
      setLoading((load) => load - 1);
    });
    getCommon().then((data) => {
      dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] });
      setLoading((load) => load - 1);
    });
  }, []);
  return (
    <Box display="flex" height="100%">
      <Header />
      <Sidebar />
      <Stack flex={1} mt={8} overflow="scroll">
        {loading > 0 ? <Loader /> : null}
        <Box
          component="main"
          p={matches ? 3 : 1}
          sx={{
            flexGrow: 1,
            display: "flex",
            backgroundColor: "#f5f7fa",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
};
