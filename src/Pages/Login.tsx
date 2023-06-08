import {
  Button,
  CircularProgress,
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
import { Flats, REACT_APP_ADMIN_PASSWORD } from "../constants";
import { User } from "../model";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const adminPassword = React.useRef<HTMLInputElement>();
  const { login, user } = useAuth();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Partial<User>>();
  const hasError = (id: string) => Object.keys(errors).includes(id);

  const onSubmit = (formValues: Partial<User>) => {
    setLoading(true);
    if (isAdmin) {
      if (adminPassword.current?.value === REACT_APP_ADMIN_PASSWORD)
        login({ isAdmin });
      else setErr("Invalid Credentials.");
      setLoading(false);
    } else
      authenticateUser(formValues).then((data) => {
        if (typeof data === "object") {
          login(data);
        } else setErr(data);
        setLoading(false);
      });
  };

  if (user?.flat) return <Navigate to="/apartments/dashboard" />;

  React.useEffect(() => {
    setErr("");
  }, [isAdmin]);

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
        style={{ backgroundColor: "white", borderRadius: "5px", padding: 24 }}
      >
        <Typography variant="h6" textAlign="center" p={2}>
          Sai Adarshya Apartments
        </Typography>
        {!!err ? (
          <Typography variant="body1" color="error" textAlign="center" p={2}>
            {err}
          </Typography>
        ) : null}
        {isAdmin ? (
          <Stack p={2} gap={2} minWidth={320}>
            <TextField value={"Admin"} label={`Username`} />
            <TextField
              key="adminpwd"
              inputRef={adminPassword}
              type="password"
              label={`Secret`}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Button
              type="button"
              onClick={() => setTimeout(() => setIsAdmin(false), 100)}
            >
              Residents Login
            </Button>
          </Stack>
        ) : (
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
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Button type="button" onClick={() => setIsAdmin(true)}>
              Admin Login
            </Button>
          </Stack>
        )}
      </form>
    </Stack>
  );
};
