import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Form } from ".";

export const Modal: React.FC<DialogProps & { onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog {...{ open, onClose }} fullWidth>
      <DialogTitle>Change Resident</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Form {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};
