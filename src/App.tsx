import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { AddEntry } from './components/AddEntry';
import { HistoryChart } from './components/HistoryChart';
import { API_ENDPOINT } from './config';
import { GlobalContext } from './contexts';
import { UsageEntries } from './interfaces';
import { ApiKeyPrompt } from './screens/ApiKeyPrompt';

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Planetly Coding Challenge</h1>
            </Grid>
            {!apiKey ? (
              <ApiKeyPrompt />
            ) : (
              <>
                <AddEntry />
                <HistoryChart />
              </>
            )}
          </Grid>
        </Container>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
