import { ArrowBack, Info, Wallet } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFlatTotalAmount, getMonth, UPI_URL } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useScreenSize } from "../hooks/useScreenSize";
import { useWaterReadings } from "../hooks/useWaterReading";
import { useStore } from "../Providers";

export const SplitUp = () => {
  const [amount, setAmount] = React.useState<{
    waterAmount: number;
    commonAmount: number;
  }>({ waterAmount: 0, commonAmount: 0 });
  const [localState, setLocalState] = useState<any>({});
  const navigate = useNavigate();
  const isMobile450 = useScreenSize() < 450;
  const isMobile1080 = useScreenSize() < 1080;
  const [flat, setFlat] = React.useState<Record<string, any>>({
    water_loads: 0,
    water_load_cost: 0,
    sewage_loads: 0,
    sewage_cost: 0,
    details: {},
  });
  const [{ flatDetails, commonDetails }] = useStore();
  const { calculate } = useWaterReadings(
    flatDetails.reduce((a, f) => ({ ...a, ...f.water_reading.previous }), {})
  );
  const { user } = useAuth();
  const { id = "" } = useParams();

  useEffect(() => {
    if (flatDetails.length > 2)
      setLocalState(
        calculate(
          flatDetails.reduce(
            (a, f) => ({ ...a, ...f.water_reading.current }),
            {}
          )
        )
      );
  }, [flatDetails]);

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
      quantity: localState?.individual_water_usage?.[id],
      price: "",
    },
    {
      description: `${id} - Total water consumption (percentage)`,
      quantity: localState?.individual_water_percentages?.[id],
      price: "",
    },
    {
      description: `${id} - Total water cost`,
      quantity:
        commonDetails.waterAmount +
        " * " +
        localState?.individual_water_percentages?.[id]?.toFixed(6) +
        " / " +
        100,
      price: (
        commonDetails.waterAmount *
          (localState?.individual_water_percentages?.[id] / 100) || 0
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
      quantity: flat?.sewage_loads * flat?.sewage_cost || 0,
      price: "",
    },
    {
      description: `${id} - Sewage cost`,
      quantity: "",
      price: ((flat?.sewage_loads * flat?.sewage_cost || 0) / 6).toFixed(1),
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
      description: `Total cost for ${id} (rounded)`,
      quantity: "",
      price: (
        getFlatTotalAmount(
          flat?.details?.overdue_amount,
          localState?.individual_water_percentages?.[id],
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

    setAmount({
      waterAmount: Math.round(
        commonDetails.waterAmount *
          ((localState?.individual_water_percentages?.[id] || 0) / 100)
      ),
      commonAmount: +(commonDetails.commonAmount / 6).toFixed(0),
    });
  }, [commonDetails, localState]);
  return (
    <Stack flex={1} gap={2}>
      <Box display={"flex"} alignItems="center">
        <Button onClick={() => navigate(-1)}>
          <ArrowBack /> Go Back
        </Button>
      </Box>
      <Stack
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          px: isMobile1080 ? 3 : 24,
          py: 3,
        }}
      >
        {/* Receipt Block */}
        <Box
          display={"flex"}
          gap={3}
          sx={{
            backgroundImage:
              "linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%)",
            borderRadius: 8,
            p: 4,
          }}
        >
          <Box flex={1}>
            <Typography variant="body2" color={"#41596d"}>
              Receipt summary:
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              Maintenance Bill
            </Typography>
            <Typography variant="caption" color={"#41596d"}>
              for the month {getMonth(commonDetails?.expenses?.[0]?.date)}
            </Typography>
            <Stack
              display={"grid"}
              gridTemplateColumns="2fr 1fr"
              rowGap={1}
              alignItems="center"
              pt={2}
            >
              <Typography color={"#40596d"} variant="body2">
                Water Usage Amount
              </Typography>
              <Typography color={"#40596d"} align="right">
                {amount.waterAmount}
              </Typography>
              <Divider />
              <Divider />
              <Typography color={"#40596d"} variant="body2">
                Common Maintanence
              </Typography>
              <Typography color={"#40596d"} align="right">
                {amount.commonAmount}
              </Typography>
              <Divider />
              <Divider />
              <Typography variant="h3" fontWeight={"700"}>
                ₹{" "}
                {amount.waterAmount +
                  amount.commonAmount +
                  (10 - ((amount.waterAmount + amount.commonAmount) % 10))}
              </Typography>
              <Typography color={"#40596d"} variant="h6" align="right">
                Total
              </Typography>

              {/* Pay Button */}
              <a
                href={
                  UPI_URL +
                  `${
                    amount.waterAmount +
                    amount.commonAmount +
                    (10 - ((amount.waterAmount + amount.commonAmount) % 10))
                  }&cu=INR&tn=Maintenance bill for ${getMonth(
                    commonDetails?.expenses[0]?.date
                  )} month`
                }
                style={{
                  pointerEvents: id !== user.flat ? "none" : "auto",
                  textDecoration: "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: ({
                      palette: {
                        common: { black },
                      },
                    }) => black,
                  }}
                >
                  <Wallet />
                  &nbsp; Pay
                </Button>
              </a>
            </Stack>
          </Box>
          {isMobile450 ? null : (
            <Box sx={{ flex: "0.5", alignSelf: "center" }}>
              <img
                src="/receipt.svg"
                alt="image"
                width="100%"
                height={"auto"}
                style={{ maxHeight: 320 }}
              />
            </Box>
          )}
        </Box>
        <List>
          {expenseDetails.map((exp, index) => (
            <ListItem key={exp.description + index} sx={{ py: 0 }}>
              <ListItemText
                primary={exp.description}
                secondary={exp.quantity}
              />
              {exp.component}
              <ListItemText
                primaryTypographyProps={{
                  textAlign: "right",
                  fontWeight: expenseDetails.length - 1 === index ? 700 : 400,
                }}
                primary={exp.price}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};
