import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { AddUserModal, UserCard } from "../components";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../Providers";

export const People = () => {
  const [state] = useStore();
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  const { user } = useAuth();

  return (
    <>
      <Stack flex={1} gap={2}>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="h5">Residents</Typography>
          {user?.isAdmin ? (
            <Button variant="contained" onClick={() => setOpen(true)}>
              Change Resident
            </Button>
          ) : null}
        </Box>
        <Stack
          display={"grid"}
          gridTemplateColumns={"repeat(auto-fill, minmax(320px, 1fr))"}
          gap={2}
        >
          {state.flatDetails.map((data) => (
            <UserCard key={data.flat} data={data} />
          ))}
        </Stack>
      </Stack>
      <AddUserModal {...{ open, onClose }} />
    </>
  );
};
