import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { API_ENDPOINT } from './config';
import { GlobalContext } from './contexts';
import { ApiKeyPrompt } from './screens/ApiKeyPrompt';
import { CarbonEstimateApplication } from './screens/CarbonEstimateApplication';
import { UsageEntries } from './interfaces'

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [history, setHistory] = useState<UsageEntries>([]);

  useEffect(() => {
    if (apiKey) {
      fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      }).then((response) => {
        response.json().then((data) => {
          setHistory(data);
        })
      })
    }
  }, [apiKey]);

  return (
    <GlobalContext.Provider value={{
      usageEntries: history,
      setUsageEntries: setHistory,
      apiKey: apiKey,
      setApiKey: setApiKey,
    }}>
      <div>
        <Container maxWidth="md">
          <h1>Hello world</h1>
          {!apiKey ? (
            <ApiKeyPrompt />
          ) : (
            <CarbonEstimateApplication apiKey={apiKey ?? ''} />
          )}
        </Container>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
