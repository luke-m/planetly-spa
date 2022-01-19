import React, { Dispatch, SetStateAction } from "react";
import { UsageEntries } from './interfaces'

interface GlobalContextInterface {
    usageEntries: UsageEntries;
    setUsageEntries: Dispatch<SetStateAction<UsageEntries>>;
    apiKey: string | undefined;
    setApiKey: Dispatch<SetStateAction<string | undefined>>;
    error: string | undefined;
    setError: Dispatch<SetStateAction<string | undefined>>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
    usageEntries: [],
    setUsageEntries: () => {},
    apiKey: undefined,
    setApiKey: () => {},
    error: undefined,
    setError: () => {},
})

