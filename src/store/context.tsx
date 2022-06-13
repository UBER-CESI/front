import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

let restaurantsJSON = require("../restaurants.json");

const defaultState = {
  userAuth: true,
  restaurants: restaurantsJSON,
  loginModal: false,
  registerModal: false,
  address: "28 bis chemin de Tanaïs, 33320 Le Taillan-Médoc",
};

export type ActionType =
  | "CHANGE_USER_AUTH"
  | "SET_RESTAURANTS"
  | "CHANGE_LOGIN_MODAL"
  | "CHANGE_REGISTER_MODAL"
  | "SET_ADDRESS";

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
  }
  return {
    ...state,
  };
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
