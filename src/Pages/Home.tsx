import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { AddExpenseModal, AddUserModal } from "../components";

export const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [openExp, setOpenExp] = React.useState(false);
  const onClose = () => setOpen(false);
  const onCloseExp = () => setOpenExp(false);

  return (
    <Stack flex={1} direction="column" gap={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Dashboard</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add User
          </Button>
          <Button variant="contained" onClick={() => setOpenExp(true)}>
            Add Expense
          </Button>
        </Stack>
      </Box>
      <Grid
        container
        sx={{ background: "white", height: "100%" }}
        p={2}
        gap={2}
      >
        <Grid item>
          <Card sx={{ p: 2 }} raised>
            <Typography variant="body1">Maintenance Payment Status</Typography>
            <hr />
            <Typography
              variant="body1"
              sx={{ color: (theme) => theme.palette.success.main }}
            >
              Paid
            </Typography>
          </Card>
        </Grid>
        <Grid item flex={1}>
          <Card sx={{ p: 2 }} raised>
            <Typography variant="body1">Notifications</Typography>
            <hr />
            <Typography variant="body2">
              - Initiated Metro Water connection process
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <AddUserModal {...{ open, onClose }} />
      <AddExpenseModal {...{ open: openExp, onClose: onCloseExp }} />
    </Stack>
  );
};
