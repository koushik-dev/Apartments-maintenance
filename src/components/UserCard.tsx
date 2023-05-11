import { Person, Phone } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { FlatDetails } from "../model";

export const UserCard: React.FC<{ data: FlatDetails }> = ({ data }) => {
  return (
    <Stack
      sx={{ backgroundColor: "#ffffff" }}
      p={2}
      borderRadius={2}
      boxShadow="5px 5px 10px #cccccc"
    >
      <Avatar sx={{ bgcolor: "black" }}>{data.flat}</Avatar>
      <Typography variant="h5" py={2} display="flex" alignItems="center">
        <Person />
        {data.tenant}
      </Typography>
      <Button
        variant="contained"
        sx={{
          borderRadius: "10px",
          backgroundColor: "#5d82e2",
        }}
        LinkComponent="a"
        href={`tel:${data.contact_number}`}
      >
        <Phone />
        Call
      </Button>
    </Stack>
  );
};
