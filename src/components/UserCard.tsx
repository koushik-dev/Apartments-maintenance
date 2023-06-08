import { DirectionsCarFilled, Person, Phone } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import React from "react";
import { FlatDetails } from "../model";

export const UserCard: React.FC<{ data: FlatDetails }> = ({ data }) => {
  return (
    <Card sx={{ backgroundColor: "#ffffff", padding: 2 }}>
      <Avatar sx={{ color: "black", bgcolor: "white", border: "1px solid" }}>
        {data.flat}
      </Avatar>
      <Typography
        variant="h6"
        pt={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Person />
        {data.tenant}
      </Typography>
      <Box my={1} display="flex" flexDirection={"column"} gap={1}>
        {data.vehicles.map((v) => (
          <Typography
            variant="body1"
            display="flex"
            alignItems="center"
            gap={1}
            key={v.number}
          >
            <DirectionsCarFilled />
            {v.model} / {v.number}
          </Typography>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          borderRadius: "5px",
          backgroundColor: "#5d82e2",
          alignSelf: "flex-end",
        }}
        LinkComponent="a"
        href={`tel:${data.contact_number}`}
      >
        <Phone />
        Call
      </Button>
    </Card>
  );
};
