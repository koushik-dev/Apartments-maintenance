import { Stack, Typography } from "@mui/material";
import { Table } from "../components";
import { useStore } from "../Providers";

export const ExpenseSheet = () => {
  const [store] = useStore();
  return (
    <Stack
      flex={1}
      gap={2}
      p={2}
      sx={{ background: (theme) => theme.palette.background.paper }}
    >
      <Typography variant="h5">Expense details for the month</Typography>
      <Table
        rows={store.commonDetails.expenses.map((v, i) => ({
          flat: i + 1,
          ...v,
          expense: v.expense
            .split("_")
            .map((k) => k.charAt(0).toLocaleUpperCase() + k.slice(1))
            .join(" "),
        }))}
        columns={[
          { headerName: "Expenses", field: "expense", minWidth: 250 },
          { headerName: "Reason", field: "reason", minWidth: 250 },
          { headerName: "Purchased on", field: "date", minWidth: 250 },
          { headerName: "Amount", field: "amount", minWidth: 150 },
        ]}
      />
    </Stack>
  );
};
