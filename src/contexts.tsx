import React, { Dispatch, SetStateAction } from "react";
import { UsageEntries } from './interfaces'

interface GlobalContextInterface {
    usageEntries: UsageEntries;
    setUsageEntries: Dispatch<SetStateAction<UsageEntries>>;
    apiKey: string;
    setApiKey: Dispatch<SetStateAction<string>>
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
    usageEntries: [],
    setUsageEntries: () => {},
    apiKey: '',
    setApiKey: () => {},
})

