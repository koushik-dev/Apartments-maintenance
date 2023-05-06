import { Close } from "@mui/icons-material";
import { Typography, Stack, Box, Divider, IconButton } from "@mui/material";
import React from "react";
import { updateCommon } from "../api";
import { ACTIONTYPES, CommonExpense } from "../model";
import { useStore } from "../Providers";

export const Expenses = () => {
  const [{ commonDetails }, dispatch] = useStore();

  const handleAdd = () => {};
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
    <Stack flex={1} gap={2}>
      {/* Expenses */}
      <Typography variant="h5">Expenses</Typography>
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
        p={1}
      >
        {commonDetails.expenses.map((exp, index) => (
          <React.Fragment key={index}>
            <Box display={"flex"} alignItems="center" p={1}>
              <Typography variant="body1" flex={1}>
                {exp.expense
                  .split("_")
                  .map((k) => k.charAt(0).toLocaleUpperCase() + k.slice(1))
                  .join(" ")}
                <Typography variant="body2" color="text.primary">
                  {exp.reason}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {exp.date}
                </Typography>
              </Typography>
              <Typography flex={1}>{exp.amount}</Typography>
              <IconButton
                color="error"
                disabled
                onClick={() => deleteExpense(exp)}
              >
                <Close />
              </IconButton>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Stack>
  );
};
