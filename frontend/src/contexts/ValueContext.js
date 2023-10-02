import { createContext, useState } from 'react';

const ValueContext = createContext();

const ValueProvider = ({children}) => {
    const [values, setValues] = useState({});

    return (
        <ValueContext.Provider value={{values, setValues}}>
            {children}
        </ValueContext.Provider>
    )
}

export {ValueContext, ValueProvider}