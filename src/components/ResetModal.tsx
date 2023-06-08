import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { updateCommon } from "../api";
import { useAuth } from "../hooks/useAuth";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const ResetModal = () => {
  const [state, dispatch] = useStore();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleClose = (isAdd: boolean) => {
    if (isAdd) {
      updateCommon({
        ...state.commonDetails,
        expenses: [],
        commonAmount: 0,
        waterAmount: 0,
      }).then((data) =>
        dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
      );
    }
    setOpen(false);
  };
  return (
    <>
      {user.isAdmin ? (
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Reset Common Expenses
        </Button>
      ) : null}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Clearing Old Values</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete the last month's expenses?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleClose(true)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
