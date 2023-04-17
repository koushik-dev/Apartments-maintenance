import { ArrowDropDown, Payment } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router";
import { updateFlatDetails } from "../api";
import { useAuth } from "../hooks/useAuth";
import { ACTIONTYPES } from "../model";
import { useStore } from "../Providers";

export const MaintenanceActions: React.FC<{
  params: GridRenderCellParams<any, any, any>;
}> = ({ params }) => {
  const { user } = useAuth();
  const [_, dispatch] = useStore();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateDetails = () => {
    const data = {
      flat: params.row.flat,
      payment_status: params.row.payment_status === "paid" ? "pending" : "paid",
    };
    updateFlatDetails(data).then((data) => {
      dispatch({ type: ACTIONTYPES.FLATDETAILS, payload: data });
      handleClose();
    });
  };
  return (
    <>
      <Box display={"flex"} gap={2}>
        <Tooltip title="View Details">
          <Button
            variant="outlined"
            sx={{ minWidth: "5rem" }}
            onClick={() => navigate(`/apartments/splitup/${params.row.flat}`)}
          >
            Details
          </Button>
        </Tooltip>
        <Tooltip title="Options">
          <Button
            variant="outlined"
            onClick={handleClick}
            aria-controls={open ? "options" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            Actions
            <ArrowDropDown />
          </Button>
        </Tooltip>
      </Box>
      {user?.isAdmin ? (
        <Menu
          anchorEl={anchorEl}
          id="options"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={updateDetails}>
            <ListItemIcon>
              <Payment fontSize="small" />
            </ListItemIcon>
            Update Payment Status
          </MenuItem>
        </Menu>
      ) : null}
    </>
  );
};
