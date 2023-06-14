import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export const Loader = () => {
  return (
    <Backdrop open sx={{ zIndex: 1 }}>
      <CircularProgress />
    </Backdrop>
  );
};
