import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { authenticateUser } from "../api";
import { Flats } from "../constants";
import { User } from "../model";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [err, setErr] = React.useState("");
  const { login, user } = useAuth();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Partial<User>>();
  const hasError = (id: string) => Object.keys(errors).includes(id);

  const onSubmit = (formValues: Partial<User>) => {
    authenticateUser(formValues).then((data) => {
      if (typeof data === "object") {
        login(data);
      } else setErr(data);
    });
  };

  if (user?.flat) return <Navigate to="/apartments/dashboard" />;

  return (
    <Stack
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#8757d1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "white", borderRadius: "5px" }}
      >
        <Typography variant="body1" color="error" textAlign="center" p={2}>
          {err}
        </Typography>
        <Stack p={2} gap={2}>
          <Controller
            control={control}
            name="flat"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{ minWidth: 320, flex: 2 }}>
                <InputLabel id="Flat-label">Flat*</InputLabel>
                <Select
                  labelId="Flat-label"
                  label="Flat"
                  onChange={onChange}
                  value={value || ""}
                  error={hasError("flat")}
                >
                  {Flats.map((name) => (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <TextField
            type="password"
            error={hasError("secret")}
            label={`Secret`}
            {...register("secret", { required: true })}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
