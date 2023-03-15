export enum ACTIONTYPES {
  TOGGLESIDEBAR = "togglesidebar",
  FLATDETAILS = "flatdetails",
  COMMONDETAILS = "commondetails",
  CURRENT_USER = "current_user",
}

export type User = {
  flat: string;
  secret: string;
  isOwner: boolean;
  isAdmin?: boolean;
};

export type FlatDetails = {
  tenant: string;
  owner: string;
  flat: string;
  contact_no: number;
  lastUpdated: string;
  overdue_amount: number;
  payment_status: string;
  vehicles: { number: string; model: string }[];
  water_reading: {
    current: Record<string, number>;
    previous: Record<string, number>;
  };
};
export type CommonExpense = {
  commonAmount: number;
  waterAmount: number;
  total_water_usage: number;
  individual_water_usage: Record<string, number>;
  individual_water_percentages: Record<string, number>;
  expenses: {
    expense: string;
    reason?: string;
    amount: number;
    date: string;
  }[];
};
export interface IState {
  isSideBarOpen: boolean;
  flatDetails: FlatDetails[];
  commonDetails: CommonExpense;
}
export interface IAction {
  type: ACTIONTYPES;
  payload?: any;
}
export type IContext = [IState, React.Dispatch<IAction>];
