import { Wallet } from "@mui/icons-material";
import { Box, Typography, Divider, Button, Fab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { updateFlatDetails } from "../api";
import { getMonth, UPI_URL } from "../constants";
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
  const [state, dispatch] = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

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
        border: (theme) =>
          user?.flat === flat
            ? `3px solid ${theme.palette.primary.main}`
            : "1px solid transparent",
        borderRadius: "0.5rem",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px",
        "&:hover": {
          cursor: "pointer",
        },
        "&:active": {
          boxShadow: "inset rgba(0, 0, 0, 0.1) 2px 2px 10px 0px",
        },
      }}
      p={2.5}
      display="grid"
      gridTemplateColumns={"2fr 1fr"}
      gap={1}
      onClick={() => navigate(`/apartments/splitup/${flat}`)}
    >
      <Box>
        <Fab
          disabled
          sx={{
            "&.Mui-disabled": {
              background: "#aed9f1",
              color: "black",
              fontSize: "1.3rem",
              letterSpacing: "2px",
            },
          }}
        >
          {flat}
        </Fab>
      </Box>
      <Box alignSelf={"center"} textAlign="right">
        {user.isAdmin ? (
          <Button
            variant="contained"
            color={
              status.toLocaleLowerCase() === "pending" ? "error" : "success"
            }
            onClick={updateDetails}
          >
            {status.charAt(0).toLocaleUpperCase() + status.slice(1)}
          </Button>
        ) : (
          <a
            href={`upi://pay?pa=vijay.pragalath@okhdfcbank&pn=VIJAYAKUMAR MARKANDEYAN&am=${
              +total + (10 - (+total % 10))
            }&cu=INR&tn=Maintenance bill for ${getMonth(
              state.commonDetails.expenses[0].date
            )} month`}
            style={{
              pointerEvents: flat !== user.flat ? "none" : "auto",
              textDecoration: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="contained"
              color="success"
              disabled={flat !== user.flat}
              sx={{ px: 1.5 }}
            >
              <Wallet />
              &nbsp; Pay
            </Button>
          </a>
        )}
      </Box>
      <Typography variant="h6">{name}</Typography>
      <Typography></Typography>
      <Typography variant="body2">Water Usage Amount</Typography>
      <Typography align="right">{waterAmount}</Typography>
      <Typography variant="body2">Common Maintanence</Typography>
      <Typography align="right">{commonAmount}</Typography>
      <Typography variant="body2">Overdue</Typography>
      <Typography align="right">{overdueAmount || 0}</Typography>
      <Divider />
      <Divider />
      <Typography variant="h6">
        Total
        <Typography fontSize={12} fontWeight={400} display={"inline"}>
          (rounded)
        </Typography>
      </Typography>
      <Typography variant="h6" align="right">
        Rs. {+total + (10 - (+total % 10))}
      </Typography>
    </Box>
  );
};
