import { Delete, Edit } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { useStore } from "../Providers";

export const Expenses = () => {
  const [{ commonDetails }] = useStore();

  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <Stack flex={1} gap={2} p={3} sx={{ bgcolor: "background.paper" }}>
      <List sx={{ width: "50%", border: "1px solid #ccc", borderRadius: 5 }}>
        {commonDetails.expenses.map((exp) => (
          <>
            <ListItem alignItems="flex-start" key={exp.expense + exp.date}>
              <ListItemText
                primary={exp.expense
                  .split("_")
                  .map((k) => k.charAt(0).toLocaleUpperCase() + k.slice(1))
                  .join(" ")}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {exp.reason}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemText>{exp.amount}</ListItemText>
              <Box gap={3} display="flex">
                <IconButton color="secondary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Stack>
  );
};
