import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

const defaultState = {
  userAuth: false,
};

export type ActionType = "CHANGE_USER_AUTH";

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
