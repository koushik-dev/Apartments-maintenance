import { Stack, Typography } from "@mui/material";
import React from "react";
import { Table } from "../components";
import { PeopleCols } from "../constants";
import { useStore } from "../Providers";

export const People = () => {
  const [state] = useStore();

  return (
    <Stack flex={1} gap={2}>
      <Typography variant="h5">People</Typography>
      <Table rows={state.flatDetails} columns={PeopleCols} />
    </Stack>
  );
};
