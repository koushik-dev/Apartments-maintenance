import React, { Reducer } from "react";
import { ACTIONTYPES, IAction, IContext, IState } from "./model";

const initialState: IState = {
  isSideBarOpen: false,
  commonDetails: {
    total_water_usage: 0,
    individual_water_usage: {},
    individual_water_percentages: {},
    expenses: [{ expense: "", reason: "", amount: 0 }],
    commonAmount: 0,
    waterAmount: 0,
  },
  flatDetails: [
    {
      tenant: "",
      owner: "",
      flat: "",
      contact_no: 0,
      overdue_amount: 0,
      lastUpdated: "",
      payment_status: "",
      vehicles: [],
      water_reading: { current: {}, previous: {} },
    },
  ],
  current_user: {},
};

const reducer: Reducer<IState, IAction> = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONTYPES.TOGGLESIDEBAR:
      return { ...state, isSideBarOpen: !state.isSideBarOpen };
    case ACTIONTYPES.FLATDETAILS:
      return {
        ...state,
        flatDetails: action.payload,
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
    case ACTIONTYPES.CURRENT_USER:
      return { ...state, current_user: action.payload };
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
