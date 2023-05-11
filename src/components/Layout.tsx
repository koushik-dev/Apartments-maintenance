import { Box, Stack, Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { Header, Footer, Sidebar } from ".";
import { getFlatDetails, getCommon } from "../api";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [, dispatch] = useStore();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  React.useEffect(() => {
    getFlatDetails().then((data) =>
      dispatch({
        type: ACTIONTYPES.FLATDETAILS,
        payload: data,
      })
    );
    getCommon().then((data) =>
      dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
    );
  }, []);
  return (
    <Box display="flex" height="100%">
      <Header />
      <Sidebar />
      <Stack flex={1} mt={8} overflow="scroll">
        <Box
          component="main"
          p={matches ? 3 : 1}
          sx={{
            flexGrow: 1,
            display: "flex",
            backgroundImage: `url(
              "https://images.unsplash.com/photo-1574090524868-3aab11301e6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
            )`,
            backgroundSize: "cover",
          }}
        >
          {children}
        </Box>
        <Footer />
      </Stack>
    </Box>
  );
};
