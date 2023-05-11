import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { AddUserModal, UserCard } from "../components";
import { useStore } from "../Providers";

export const People = () => {
  const [state] = useStore();
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);

  return (
    <>
      <Stack flex={1} gap={2}>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="h5">Residents</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add User
          </Button>
        </Box>
        <Stack
          display={"grid"}
          gridTemplateColumns={"repeat(auto-fill, minmax(320px, 1fr))"}
          gap={2}
        >
          {state.flatDetails.map((data) => (
            <UserCard key={data.flat} data={data} />
            //   <CardContent>
            //     <Typography variant="h5" color="text.primary" gutterBottom>
            //       {data.flat}
            //     </Typography>
            //     <Typography variant="body1" component="div">
            //       {data.tenant}
            //     </Typography>
            //     <Typography sx={{ mb: 1.5 }} color="text.secondary">
            //       {data.owner}
            //     </Typography>
            //     <Box pb={1}>
            //       <Box display={"flex"} alignItems="center">
            //         <Phone />
            //         <Typography variant="body2" pl={1}>
            //           <a href={`tel:${data.contact_number}`}>
            //             {data.contact_number}
            //           </a>
            //         </Typography>
            //       </Box>
            //       <Fab
            //         variant="extended"
            //         sx={{ backgroundColor: "lightgreen" }}
            //       >
            //         <Phone color="action" />
            //         <Typography variant="body2" pl={1}>
            //           <Link
            //             href={`tel:${data.contact_number}`}
            //             sx={{ textDecoration: "none", color: "#000000" }}
            //           >
            //             {data.contact_number}
            //           </Link>
            //         </Typography>
            //       </Fab>
            //     </Box>
            //     <Divider />
            //   </CardContent>
            // </Card>
          ))}
        </Stack>
      </Stack>
      <AddUserModal {...{ open, onClose }} />
    </>
  );
};
