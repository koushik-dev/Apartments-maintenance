export const water_lines = [
  "F1A",
  "F1B",
  "F1C",
  "F1D",
  "F2A",
  "F2B",
  "F2C",
  "F3A",
  "F3B",
  "F3C",
  "S1A",
  "S1B",
  "S1C",
  "S1D",
  "S2A",
  "S2B",
  "S2C",
  "S3A",
  "S3B",
  "S3C",
];
export const Flats = ["F1", "F2", "F3", "S1", "S2", "S3"];
export const getMonth = (date?: string) =>
  (date ? new Date(date) : new Date()).toLocaleString("en-US", {
    month: "long",
  });
export const getFlatTotalAmount = (
  overdue_amount: number,
  individual_water_percentage: number,
  waterAmount: number,
  commonAmount: number
) => {
  let total =
    overdue_amount +
    (individual_water_percentage / 100) * waterAmount +
    commonAmount / 6;
  return +total + (10 - (+total % 10));
};

export const UPI_URL =
  "upi://pay?pa=vijay.pragalath@okhdfcbank&pn=VIJAYAKUMAR MARKANDEYAN&am=";

export const REACT_APP_ADMIN_PASSWORD = "Admin@123";
