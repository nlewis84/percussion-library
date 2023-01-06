import React, { createContext, useReducer } from 'react';

const initialState = {
  ensemblesQueryString: '',
};

export const UIStateContext = createContext(initialState);
export const UIDispatchContext = createContext(undefined);

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'updateEnsemblesQueryString':
      return {
        ...state,
        ensemblesQueryString: action.payload.ensemblesQueryString,
      };

    default:
      throw new Error('Unknown action type');
  }
};

function UIContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    uiReducer,
    initialState,
  );

  return (
    <UIStateContext.Provider value={state}>
      <UIDispatchContext.Provider value={dispatch}>
        {children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
}

export default UIContextProvider;
