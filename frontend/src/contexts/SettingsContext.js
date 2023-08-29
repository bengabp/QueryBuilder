// SettingsContext.js
import { createContext, useState, useEffect } from 'react';
import { api_uri } from '../components/queryblocks/AutocompleteField';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState();
    

    async function fetchSettings(){
          try {
            // Fetch the settings from the backend API
            const data = await (
                await fetch(`${api_uri}/settings?includeCompanies=true`, { method: "GET" }))
                .json()
            setSettings(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
      fetchSettings()
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {settings && children}
        </SettingsContext.Provider>
    );
};

export { SettingsContext, SettingsProvider };
