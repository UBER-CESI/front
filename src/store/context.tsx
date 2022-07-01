import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

const defaultState = {
  loginModal: false,
  registerModal: false,
  addressModal: false,
  accountModals: {
    orders: false,
    profile: false,
    promotions: false,
    about: false,
  },

  userAuth: false,
  userInfo: {},
  typeUser: "",
  customerInfo: {},
  customerHistory: [],
  restaurantInfo: {},
  restaurantHistory: [],
  delivererInfo: {},
  delivererHistory: [],

  allOrders: [],

  restaurants: [],
  selectedRestaurantId: 0,
  menus: [],

  address: "264 Bd Godard, 33300 Bordeaux",

  basket: {},
  orders: [],
  tip: 0,

  registerSponsor: false,
};

export type ActionType =
  | "CHANGE_USER_AUTH"
  | "SET_RESTAURANTS"
  | "CHANGE_LOGIN_MODAL"
  | "CHANGE_REGISTER_MODAL"
  | "SET_ADDRESS"
  | "SET_BASKET"
  | "CHANGE_ADDRESS_MODAL"
  | "CHANGE_USER_INFO"
  | "CHANGE_TYPE_USER"
  | "CHANGE_CUSTOMER_INFO"
  | "CHANGE_CUSTOMER_HISTORY"
  | "CHANGE_RESTAURANT_INFO"
  | "CHANGE_RESTAURANT_HISTORY"
  | "CHANGE_DELIVERER_INFO"
  | "CHANGE_DELIVERER_HISTORY"
  | "CHANGE_USER_INFOS"
  | "SET_ACCOUNT_MODALS"
  | "SET_ORDERS"
  | "SET_SELECTED_RESTAURANT_ID"
  | "SET_MENUS"
  | "CHANGE_TIP"
  | "SET_REGISTER_SPONSOR"
  | "CHANGE_ALL_ORDERS";

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
      return { ...state, userAuth: action.payload };
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
    case "CHANGE_USER_INFO":
      return { ...state, userInfo: action.payload };
    case "CHANGE_TYPE_USER":
      return { ...state, typeUser: action.payload };
    case "CHANGE_CUSTOMER_INFO":
      return { ...state, customerInfo: action.payload };
    case "CHANGE_CUSTOMER_HISTORY":
      return { ...state, customerHistory: action.payload };
    case "CHANGE_RESTAURANT_INFO":
      return { ...state, restaurantInfo: action.payload };
    case "CHANGE_RESTAURANT_HISTORY":
      return { ...state, restaurantHistory: action.payload };
    case "CHANGE_DELIVERER_INFO":
      return { ...state, delivererInfo: action.payload };
    case "CHANGE_DELIVERER_HISTORY":
      return { ...state, delivererHistory: action.payload };
    case "CHANGE_USER_INFOS":
      return { ...state, userInfos: action.payload };
    case "SET_ACCOUNT_MODALS":
      return { ...state, accountModals: action.payload };
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "SET_SELECTED_RESTAURANT_ID":
      return { ...state, selectedRestaurantId: action.payload };
    case "SET_MENUS":
      return { ...state, menus: action.payload };
    case "CHANGE_TIP":
      return { ...state, tip: action.payload };
    case "SET_REGISTER_SPONSOR":
      return { ...state, registerSponsor: true };
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
