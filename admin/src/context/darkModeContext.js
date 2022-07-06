import { createContext, useReducer } from 'react'
import DarkModeReducer from './darkModeReducer';

const INITIAL_STATE = {
    darkMode: false,
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({children})=>{
    const [state, dispatched] = useReducer(DarkModeReducer, INITIAL_STATE);

    return(
        <DarkModeContext.Provider value={{darkMode: state.darkMode, dispatched}}>
            {children}
        </DarkModeContext.Provider>
    )
}