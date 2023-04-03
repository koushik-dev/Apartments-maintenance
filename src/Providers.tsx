import React, { Reducer } from "react";
import { ACTIONTYPES, FlatDetails, IAction, IContext, IState } from "./model";

const initialState: IState = {
  isSideBarOpen: false,
  commonDetails: {
    total_water_usage: 0,
    individual_water_usage: {},
    individual_water_percentages: {},
    expenses: [{ expense: "", reason: "", amount: 0, date: "" }],
    commonAmount: 0,
    waterAmount: 0,
  },
  flatDetails: [
    {
      tenant: "",
      owner: "",
      flat: "",
      contact_number: 0,
      overdue_amount: 0,
      lastUpdated: "",
      payment_status: "",
      vehicles: [],
      water_reading: { current: {}, previous: {} },
    },
  ],
};

const sortAlphaNum = (a: FlatDetails, b: FlatDetails) =>
  a.flat.localeCompare(b.flat, "en", { numeric: true });

const reducer: Reducer<IState, IAction> = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONTYPES.TOGGLESIDEBAR:
      return { ...state, isSideBarOpen: !state.isSideBarOpen };
    case ACTIONTYPES.FLATDETAILS:
      return {
        ...state,
        flatDetails: [...action.payload].sort(sortAlphaNum),
      };
    case ACTIONTYPES.COMMONDETAILS:
      return {
        ...state,
        commonDetails: {
          ...state.commonDetails,
          ...action.payload,
          ...action.payload.expenses.reduce(
            (
              acc: { commonAmount: number; waterAmount: number },
              value: { expense: string; amount: number }
            ) => {
              if (value.expense === "water_load_purchased")
                return {
                  ...acc,
                  waterAmount: acc.waterAmount + value.amount,
                };
              return {
                ...acc,
                commonAmount: acc.commonAmount + value.amount,
              };
            },
            { commonAmount: 0, waterAmount: 0 }
          ),
        },
      };
    default:
      return state;
  }
};

const AppContext = React.createContext([] as unknown as IContext);

export const useStore = () => React.useContext(AppContext);

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default Providers;
