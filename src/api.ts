import { CommonExpense, FlatDetails, User } from "./model";

const API_BASE =
  "https://ap-south-1.aws.data.mongodb-api.com/app/apartments-kiygc/endpoint";

export const authenticateUser = async (data: Partial<User>) => {
  const response = await fetch(API_BASE + "/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const getFlatDetails = async () => {
  const response = await fetch(API_BASE + "/flatDetails");
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const addFlatDetails = async (data: Partial<FlatDetails>) => {
  const response = await fetch(API_BASE + "/flatDetails", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const updateFlatDetails = async (data: Partial<FlatDetails>) => {
  const response = await fetch(API_BASE + "/updateFlatDetails", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const updateReadings = async (data: any) => {
  const response = await fetch(API_BASE + "/readings", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const getCommon = async () => {
  const response = await fetch(API_BASE + "/common");
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};

export const updateCommon = async (data: CommonExpense) => {
  const response = await fetch(API_BASE + "/common", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error(await response.text());
};
