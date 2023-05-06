import { Box, Typography, Divider, Chip, Button } from "@mui/material";
import React from "react";
import { updateFlatDetails } from "../api";
import { useAuth } from "../hooks/useAuth";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const MaintenanceCard: React.FC<{
  name: string;
  flat: string;
  waterAmount: number;
  commonAmount: string;
  overdueAmount: number;
  status: string;
}> = ({ name, flat, waterAmount, commonAmount, overdueAmount, status }) => {
  const [total, setTotal] = React.useState(0);
  const [, dispatch] = useStore();
  const { user } = useAuth();

  const updateDetails = () => {
    const data = {
      flat: flat,
      payment_status: status === "paid" ? "pending" : "paid",
    };
    updateFlatDetails(data).then((data) => {
      dispatch({ type: ACTIONTYPES.FLATDETAILS, payload: data });
    });
  };

  React.useEffect(() => {
    setTotal(+waterAmount + +commonAmount + overdueAmount);
  }, [waterAmount, commonAmount, overdueAmount]);

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
        border: "1px solid transparent",
        borderRadius: "0.5rem",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px",
      }}
      p={3}
      display="grid"
      gridTemplateColumns={"1fr 1fr"}
      gap={1}
    >
      <Typography variant="h5">
        {name} - {flat}
      </Typography>
      <Typography align="right">
        <Button
          variant="contained"
          color={status === "pending" ? "error" : "success"}
          onClick={user.isAdmin ? updateDetails : () => {}}
        >
          {status.charAt(0).toLocaleUpperCase() + status.slice(1)}
        </Button>
      </Typography>
      <Typography>Water Usage Amount</Typography>
      <Typography align="right">{waterAmount}</Typography>
      <Typography>Common Maintanence</Typography>
      <Typography align="right">{commonAmount}</Typography>
      <Typography>Overdue</Typography>
      <Typography align="right">{overdueAmount || 0}</Typography>
      <Divider />
      <Divider />
      <Typography variant="h6">
        Total
        <Typography variant="subtitle2" fontWeight={400} display={"inline"}>
          (rounded)
        </Typography>
      </Typography>
      <Typography variant="h6" align="right">
        {+total + (10 - (+total % 10))}
      </Typography>
    </Box>
  );
};
