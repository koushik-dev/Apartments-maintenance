import { Add } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { addFlatDetails } from "../../api";
import { ACTIONTYPES, FlatDetails } from "../../model";
import { useStore } from "../../Providers";

export const Form: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [state, dispatch] = useStore();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { fields, append } = useFieldArray({ control, name: "vehicles" });

  const onSubmit = ({ firstname, lastname, ...values }: FieldValues) => {
    const details: Partial<FlatDetails> = {
      ...values,
      tenant: [firstname, lastname].join(" "),
      // ...(values.isOwner ? { owner: [firstname, lastname].join(" ") } : {}),
      // ...(values.isOwner
      //   ? { owner_contact_number: values.contact_number }
      //   : {}),
      water_reading: { previous: {}, current: {} },
      payment_status: "Pending",
      overdue_amount: 0,
    };
    addFlatDetails(details).then((data) => {
      dispatch({ type: ACTIONTYPES.FLATDETAILS, payload: data });
      onClose();
    });
  };

  const getFlat = (flat: string) => {
    return state.flatDetails.filter((f) => f.flat === flat)[0];
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} px={3} pb={3} pt={2}>
        <Stack direction="row" gap={2}>
          <Controller
            control={control}
            name="flat"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{ minWidth: 120, flex: 2 }}>
                <InputLabel id="Flat-label">Flat*</InputLabel>
                <Select
                  labelId="Flat-label"
                  label="Flat"
                  onChange={onChange}
                  value={value || ""}
                >
                  {[
                    { name: "F1", floor: "First floor" },
                    { name: "F2", floor: "First floor" },
                    { name: "F3", floor: "First floor" },
                    { name: "S1", floor: "Second floor" },
                    { name: "S2", floor: "Second floor" },
                    { name: "S3", floor: "Second floor" },
                  ].map(({ name, floor }) => (
                    <MenuItem value={name} key={name}>
                      {name} - {floor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Stack>
        <Grid container gap={2}>
          <Grid item flex={1}>
            <TextField
              fullWidth
              error={false}
              label="First Name"
              {...register("firstname")}
            />
          </Grid>
          <Grid item flex={1}>
            <TextField
              fullWidth
              error={false}
              label="Last Name"
              {...register("lastname")}
            />
          </Grid>
        </Grid>
        <TextField
          type="number"
          label="Contact No."
          {...register("contact_number")}
        />
        <TextField
          type="number"
          label="Owner Contact No."
          value={getFlat(watch("flat"))?.owner_contact_number || ""}
          disabled={true}
        />
        <Divider textAlign="left">
          Add Vehicles
          <IconButton onClick={() => append({})}>
            <Add />
          </IconButton>
        </Divider>
        {fields.map((item, index) => (
          <Grid container gap={2}>
            <Grid item flex={1}>
              <TextField
                fullWidth
                label="Vehicle Name"
                {...register(`vehicles.${index}.model`)}
              />
            </Grid>
            <Grid item flex={1}>
              <TextField
                fullWidth
                label="Vehicle Number"
                {...register(`vehicles.${index}.number`)}
              />
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Stack direction="row" gap={1} p={1.5} justifyContent="flex-end">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
};
