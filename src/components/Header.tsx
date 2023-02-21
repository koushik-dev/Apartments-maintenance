import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Logout,
  Menu as MenuIcon,
  Person,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import React from "react";
import { useStore } from "../Providers";
import { ACTIONTYPES } from "../model";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const [{ flatDetails }, dispatch] = useStore();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          maxHeight: 64,
          backgroundColor: "#8757d1",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() =>
              dispatch({
                type: ACTIONTYPES.TOGGLESIDEBAR,
              })
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sai Adarshya Apartments
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">
              {flatDetails.filter((flat) => flat.flat === user.flat)[0]?.tenant}
            </Typography>
            <IconButton sx={{ color: "white" }} onClick={handleClick}>
              <Person />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="logout-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
