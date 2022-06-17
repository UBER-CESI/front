import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

let restaurantsJSON = require("../restaurants.json");
let basketJSON = require("../basket.json");
let userJSON = require("../user.json");
let ordersJSON = require("../orders.json");

const defaultState = {
  userAuth: true,
  restaurants: restaurantsJSON,
  loginModal: false,
  registerModal: false,
  addressModal: false,
  address: "264 Bd Godard, 33300 Bordeaux",
  basket: basketJSON,
  userInfos: userJSON,
  accountModals: {
    orders: false,
    paymentsInformation: false,
    profile: false,
    promotions: false,
    about: false,
  },
  orders: ordersJSON,
};

export type ActionType =
  | "CHANGE_USER_AUTH"
  | "SET_RESTAURANTS"
  | "CHANGE_LOGIN_MODAL"
  | "CHANGE_REGISTER_MODAL"
  | "SET_ADDRESS"
  | "SET_BASKET"
  | "CHANGE_ADDRESS_MODAL"
  | "CHANGE_USER_INFOS"
  | "SET_ACCOUNT_MODALS"
  | "SET_ORDERS";

export type ActionWithParamsType = {
  type: ActionType;
  payload: any;
};

export type StateType = typeof defaultState;
export type DispatchType = (action: ActionWithParamsType) => void;

const ModuleContext = createContext<
  { state: StateType; dispatch: DispatchType } | undefined
>(undefined);
export default ModuleContext;

function moduleReducer(state: StateType, action: ActionWithParamsType) {
  console.log("action is", action);
  switch (action.type) {
    case "CHANGE_USER_AUTH":
      return { ...state, userAuth: !state.userAuth };
    case "SET_RESTAURANTS":
      return { ...state, restaurants: action.payload };
    case "CHANGE_LOGIN_MODAL":
      return { ...state, loginModal: !state.loginModal };
    case "CHANGE_REGISTER_MODAL":
      return { ...state, registerModal: !state.registerModal };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_BASKET":
      return { ...state, basket: action.payload };
    case "CHANGE_ADDRESS_MODAL":
      return { ...state, addressModal: !state.addressModal };
    case "CHANGE_USER_INFOS":
      return { ...state, userInfos: action.payload };
    case "SET_ACCOUNT_MODALS":
      return { ...state, accountModals: action.payload };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

export function ModuleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(moduleReducer, defaultState);

  return (
    <ModuleContext.Provider value={{ state, dispatch }}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (!context) throw new Error("useModule must be used inside ModuleProvider");
  return context;
}
