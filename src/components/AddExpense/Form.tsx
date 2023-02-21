import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { updateCommon } from "../../api";
import { ACTIONTYPES } from "../../model";
import { useStore } from "../../Providers";

export const Form: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [state, dispatch] = useStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (formValues: any) => {
    updateCommon({
      ...state.commonDetails,
      expenses: [
        ...state.commonDetails.expenses,
        {
          ...formValues,
          amount: +formValues.amount,
          updatedOn: new Date().toISOString(),
        },
      ],
    }).then((data) =>
      dispatch({ type: ACTIONTYPES.COMMONDETAILS, payload: data[0] })
    );
    onClose();
  };
  const hasError = (id: string) => Object.keys(errors).includes(id);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} px={3} pb={3} pt={2}>
        <Controller
          control={control}
          name="expense"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <FormControl sx={{ minWidth: 120, flex: 2 }}>
              <InputLabel id="Expense-label">Expense*</InputLabel>
              <Select
                error={hasError("expense")}
                labelId="Expense-label"
                label="Expense"
                onChange={onChange}
                value={value || ""}
              >
                {[
                  { name: "Water Load Purchased", id: "water_load_purchased" },
                  { name: "Sewage Tank Cleaned", id: "sewage_cleaned" },
                  { name: "Building Maintenance", id: "maintenance" },
                  { name: "Miscellaneous Expenses", id: "misc_expenses" },
                ].map(({ name, id }) => (
                  <MenuItem key={name} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="reason"
          render={({ field: { onChange, value, ref } }) => (
            <Autocomplete
              id="reason"
              sx={{
                opacity: ["maintenance", "misc_expenses"].includes(
                  watch("expense")
                )
                  ? 1
                  : 0.5,
              }}
              freeSolo
              onChange={(event, data) => onChange(data)}
              value={value || ""}
              ref={ref}
              options={[
                "Sump Cleaning",
                "Overhead Tank Cleaning",
                "Common Area Cleaning",
                "Garbage Picking Vehicle",
                "Common Eletrical Bill",
              ].map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  ref={ref}
                  onChange={onChange}
                  label="Reason"
                />
              )}
              disabled={
                !["maintenance", "misc_expenses"].includes(watch("expense"))
              }
            />
          )}
        />

        <TextField
          type="number"
          error={hasError("amount")}
          label={`Amount*`}
          {...register("amount", { required: true })}
        />
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
