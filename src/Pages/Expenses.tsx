import { Delete } from "@mui/icons-material";
import {
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { updateCommon } from "../api";
import { AddExpenseModal, ResetModal } from "../components";
import { getMonth } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useScreenSize } from "../hooks/useScreenSize";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const Expenses = () => {
  const [{ commonDetails }, dispatch] = useStore();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState<{ type: string; payload?: any }>({
    type: "",
    payload: "",
  });

  const isMobile = useScreenSize() < 600;

  const triggerAdd = () => {
    setOpen(true);
    setAction({ type: "Add" });
  };
  const handleEdit = () => {};
  const deleteExpense = (expense: {
    expense: string;
    reason?: string;
    amount: number;
    date: string;
  }) => {
    updateCommon({
      ...commonDetails,
      expenses: [...commonDetails.expenses].filter((exp) => {
        if (
          exp.date === expense.date &&
          exp.expense === expense.expense &&
          exp.amount === expense.amount
        )
          return false;
        return true;
      }),
    }).then((data) =>
      dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
    );
  };

  return (
    <>
      {isMobile && user?.isAdmin ? (
        <Button
          variant="contained"
          onClick={triggerAdd}
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            left: 0,
            borderRadius: 0,
            height: 54,
            zIndex: 1,
          }}
        >
          Add Expense
        </Button>
      ) : null}
      <Stack flex={1} gap={2} pb={isMobile ? 7 : 0}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          {/* Expenses */}
          <Typography variant="h5">
            Expenses for {getMonth(commonDetails.expenses[0].date)} month
          </Typography>
          <Box display={"flex"} justifyContent={"right"} gap={2}>
            {isMobile || !user?.isAdmin ? null : (
              <Button variant="contained" onClick={triggerAdd}>
                Add Expense
              </Button>
            )}
            <ResetModal />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
          p={1}
        >
          {commonDetails.expenses.map((exp, index) => (
            <React.Fragment key={index}>
              <Box display={"flex"} flexDirection={"column"} p={1}>
                <Box display={"flex"} alignItems="center">
                  <Typography variant="subtitle2" fontWeight={500} flex={1}>
                    {exp.expense
                      .split("_")
                      .map((k) => k.charAt(0).toLocaleUpperCase() + k.slice(1))
                      .join(" ")}
                  </Typography>
                  <Typography variant="overline" lineHeight={0}>
                    Rs. {exp.amount}
                  </Typography>
                  {user?.isAdmin ? (
                    <IconButton
                      color="error"
                      sx={{ border: "1px solid", ml: 2 }}
                      onClick={() => {
                        setOpen(true);
                        setAction({ type: "Delete", payload: exp });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  ) : null}
                </Box>
                <Typography variant="body2" color="text.primary">
                  {exp.reason}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {new Date(exp.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
          <Box display={"flex"} alignItems="center" p={1}>
            <Typography variant="h5" flex={1}>
              Total
            </Typography>
            <Typography variant="body1">
              Rs. {commonDetails.commonAmount + commonDetails.waterAmount}
            </Typography>
          </Box>
        </Box>

        {/* Expense Modal */}
        <AddExpenseModal
          {...{
            open: open && action.type === "Add",
            onClose: () => setOpen(false),
          }}
        />

        {/* Confirm Modal */}
        <Dialog
          open={open && action.type !== "Add"}
          fullWidth
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{action.type} Confirmation</DialogTitle>
          <DialogContent dividers>
            Are you sure you want to {action.type.toLocaleLowerCase()} the
            expense?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => deleteExpense(action.payload)}
            >
              {action.type}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};
