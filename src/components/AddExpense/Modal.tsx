import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import React from "react";
import { Form } from ".";
import { getMonth } from "../../constants";

export const Modal: React.FC<DialogProps & { onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog {...{ open, onClose }} fullWidth>
      <DialogTitle>Add Common Expenses</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Form {...{ onClose }} />
      </DialogContent>
    </Dialog>
  );
};
