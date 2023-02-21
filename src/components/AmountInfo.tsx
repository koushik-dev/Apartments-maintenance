import { QuestionMark } from "@mui/icons-material";
import {
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useStore } from "../Providers";

export const AmountInfo: React.FC<{
  params: GridRenderCellParams<any, any, any>;
}> = ({ params }) => {
  const [state] = useStore();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Stack
        flex={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight="600">{(+params.value).toFixed(1)}</Typography>
        <IconButton color="info" onClick={() => setOpen(true)}>
          <QuestionMark />
        </IconButton>
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Amount Splitup</DialogTitle>
        <DialogContent dividers>
          <Grid container gap={2}>
            <Grid item xs={8}>
              Common Maintenance Expense
            </Grid>
            <Grid item xs={2}>
              {state.commonDetails.commonAmount / 6}
            </Grid>
            <Grid item xs={8}>
              Water Usage Amount
            </Grid>
            <Grid item xs={2}>
              {((state.commonDetails.individual_water_percentages[
                params.row.flat
              ] || 0) /
                100) *
                state.commonDetails.waterAmount}
            </Grid>
            <Grid item xs={8}>
              Overdue Amount
            </Grid>
            <Grid item xs={2}>
              {params.row.overdue_amount}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
