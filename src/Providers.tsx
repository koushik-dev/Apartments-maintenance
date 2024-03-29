import React, { Reducer } from "react";
import { ACTIONTYPES, FlatDetails, IAction, IContext, IState } from "./model";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
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
      owner_contact_number: "0",
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
    case ACTIONTYPES.SIDEBAR:
      return { ...state, isSideBarOpen: action.payload };
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
  const ref = React.useRef<any>(null);
  React.useEffect(() => {
    Notification.requestPermission();
    if (!ref.current) {
      const coll = collection(db, "notifications");
      ref.current = onSnapshot(coll, (doc) => {
        navigator.serviceWorker.ready.then((reg) =>
          reg.active?.postMessage({
            title: doc.docs.at(doc.size - 1)?.data().title,
            message: doc.docs.at(doc.size - 1)?.data().message,
          })
        );
        doc.forEach((d) => {
          // navigator.serviceWorker.getRegistration().then((re) =>
          //   re?.showNotification("new notification", {
          //     body: "javascript react notification",
          //   })
          // );
        });
      });
    }
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default Providers;
