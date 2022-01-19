import { Alert, AlertTitle, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddEntry } from './components/AddEntry';
import { HistoryChart } from './components/HistoryChart';
import { API_ENDPOINT } from './config';
import { GlobalContext } from './contexts';
import { UsageEntries } from './interfaces';
import { ApiKeyPrompt } from './screens/ApiKeyPrompt';
import { makeGET } from './utils/makeGET';

function App() {
  const [apiKey, setApiKey] = useState<string>();
  const [history, setHistory] = useState<UsageEntries>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function makeApiCall() {
      if (apiKey) {
        try {
          const data = await makeGET<UsageEntries>(API_ENDPOINT, apiKey);
          setHistory(data);
        } catch (e) {
          setError((e as any).toString());
        }
      }
    }

    makeApiCall();
  }, [apiKey]);

  return (
    <GlobalContext.Provider value={{
      usageEntries: history,
      setUsageEntries: setHistory,
      apiKey,
      setApiKey,
      error,
      setError,
    }}>
      <div>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Planetly Coding Challenge</h1>
            </Grid>
            {error ? <Grid item xs={12}>
              <Alert severity='error' onClose={() => setError(undefined)}>
                <AlertTitle>Oops! Something went wrong, try again later.</AlertTitle>
                <pre>Error: {error}</pre>
              </Alert>
            </Grid> : ''}
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
