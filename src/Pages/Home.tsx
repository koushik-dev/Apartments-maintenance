import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useStore } from "../Providers";
import { Link } from "react-router-dom";

export const Home = () => {
  const [{ flatDetails }] = useStore();
  const { user } = useAuth();

  return (
    <Stack flex={1} direction="column" gap={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap={"wrap"}
        gap={2}
      >
        <Stack direction="row" gap={2}></Stack>
      </Box>
      <Stack
        flex={1}
        sx={{ background: "#ffffff" }}
        p={2}
        gap={2}
        borderRadius={2}
      >
        <Typography variant="h4" alignSelf={"center"} mt={3} textAlign="center">
          Welcome{" "}
          {user?.isAdmin
            ? "Admin"
            : flatDetails.find((v) => v.flat === user.flat)?.tenant}
          !
        </Typography>
        <Box
          display={"grid"}
          gap={2}
          gridTemplateColumns={"1fr 1fr"}
          alignSelf={"center"}
          mt={4}
        >
          {user?.isAdmin ? (
            <>
              <Link to="/apartments/details">
                <Button variant="contained" fullWidth>
                  Add Water Readings
                </Button>
              </Link>
              <Link to="/apartments/monthly-expenses">
                <Button variant="contained" fullWidth>
                  Add Expenses
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/apartments/maintenance">
                <Button variant="contained" fullWidth>
                  Check my Maintenance Bill
                </Button>
              </Link>
              <Link to="/apartments/people">
                <Button variant="contained" fullWidth>
                  Show Apartments Residents
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
