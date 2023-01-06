import { useContext } from 'react';

import { UIDispatchContext, UIStateContext } from './UIContextProvider';

export const useUIDispatch = () => useContext(UIDispatchContext);

export const useUIState = () => useContext(UIStateContext);
