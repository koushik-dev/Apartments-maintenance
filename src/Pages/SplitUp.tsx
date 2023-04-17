import { Info } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { getFlatTotalAmount } from "../constants";
import { useStore } from "../Providers";

export const SplitUp = () => {
  const [flat, setFlat] = React.useState<Record<string, any>>({
    water_loads: 0,
    water_load_cost: 0,
    sewage_loads: 0,
    sewage_cost: 0,
    details: {},
  });
  const [{ flatDetails, commonDetails }] = useStore();
  const { id = "" } = useParams();
  const expenseDetails = [
    {
      description: "Total Water load purchased",
      quantity: flat?.water_loads,
      price: "",
    },
    {
      description: "Price per water load",
      quantity: flat?.water_load_cost,
      price: "",
    },
    {
      description: "Total water load cost",
      quantity: flat?.water_loads * flat?.water_load_cost || 0,
      price: "",
    },
    {
      description: `${id} - Total water consumption (litres)`,
      component: (
        <Tooltip
          arrow
          title={
            <Stack>
              <Typography variant="caption">Previous Readings</Typography>
              {Object.keys(flat?.details?.water_reading?.previous || {})?.map(
                (v) => (
                  <Typography variant="caption" key={v}>
                    {v} - {flat?.details?.water_reading?.previous[v]}
                  </Typography>
                )
              )}
              <Typography variant="caption">Current Readings</Typography>
              {Object.keys(flat?.details?.water_reading?.current || {})?.map(
                (v) => (
                  <Typography variant="caption" key={v}>
                    {v} - {flat?.details?.water_reading?.current[v]}
                  </Typography>
                )
              )}
            </Stack>
          }
        >
          <IconButton>
            <Info />
          </IconButton>
        </Tooltip>
      ),
      quantity: commonDetails.individual_water_usage[id],
      price: "",
    },
    {
      description: `${id} - Total water consumption (percentage)`,
      quantity: commonDetails.individual_water_percentages[id],
      price: "",
    },
    {
      description: `${id} - Total water cost`,
      quantity:
        commonDetails.waterAmount +
        " * " +
        commonDetails.individual_water_percentages[id]?.toFixed(6) +
        " / " +
        100,
      price: (
        commonDetails.waterAmount *
          (commonDetails.individual_water_percentages[id] / 100) || 0
      ).toFixed(1),
    },
    {
      description: `Total sewage loads removed`,
      quantity: flat?.sewage_loads,
      price: "",
    },
    {
      description: `Per sewage load cost`,
      quantity: flat?.sewage_cost,
      price: "",
    },
    {
      description: `Total sewage cost`,
      quantity: "",
      price: flat?.sewage_loads * flat?.sewage_cost || 0,
    },
    ...commonDetails.expenses.reduce((acc: any[], details) => {
      if (
        details.expense !== "water_load_purchased" &&
        details.expense !== "sewage_cleaned"
      ) {
        acc.push({
          description: details.reason,
          quantity: details.expense,
          price: (details.amount / 6).toFixed(1),
        });
      }
      return acc;
    }, []),

    {
      description: `Total cost for ${id}`,
      quantity: "",
      price: (
        getFlatTotalAmount(
          flat?.details?.overdue_amount,
          commonDetails.individual_water_percentages[id],
          commonDetails.waterAmount,
          commonDetails.commonAmount
        ) || 0
      ).toFixed(1),
    },
  ];

  React.useEffect(() => {
    if (commonDetails.expenses.length > 0) {
      const water_loads = commonDetails.expenses.filter(
        (v) => v.expense === "water_load_purchased"
      );
      const sewage_loads = commonDetails.expenses.filter(
        (v) => v.expense === "sewage_cleaned"
      );
      setFlat({
        water_loads: water_loads.length,
        water_load_cost: water_loads[0]?.amount,
        sewage_loads: sewage_loads.length,
        sewage_cost: sewage_loads[0]?.amount,
        details: flatDetails.filter((v) => v.flat === id)[0],
      });
    }
  }, [commonDetails]);
  return (
    <Stack flex={1} gap={2}>
      <Typography variant="h5">
        Maintenance split up for flat: <b>{id}</b>
      </Typography>
      <List sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
        {expenseDetails.map((exp, index) => (
          <ListItem key={exp.description + index} sx={{ py: 0 }}>
            <ListItemText primary={exp.description} secondary={exp.quantity} />
            {exp.component}
            <ListItemText
              primaryTypographyProps={{ textAlign: "right", fontWeight: "700" }}
              primary={exp.price}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
