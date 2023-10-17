import React, { createContext, useState } from 'react';
import { SettingsContext } from './SettingsContext';

const ValueContext = createContext();

const ValueProvider = ({children}) => {
    const [values, setValues] = useState({});
    const [currentOptions, setCurrentOptions] = useState({})

    return (
        <ValueContext.Provider value={{values, setValues, currentOptions, setCurrentOptions}}>
            {children}
        </ValueContext.Provider>
    )
}

export {ValueContext, ValueProvider}