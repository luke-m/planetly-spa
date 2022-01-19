import { makeGET } from './makeGET';

it('makes a GET request to the API', async () => {
  const mockJsonPromise = Promise.resolve('Hello!');
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  const result = await makeGET('https://test.test', 'apiKey');

  expect(result).toBe('Hello!');
});

it('throws error with status text for failed http requests', async () => {
  const mockFetchPromise = Promise.resolve({
    status: 401,
    statusText: 'Oopsie'
  });

  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let result;
  try {
    await makeGET('https://test.test', 'wrongApiKey');
  } catch (e) {
    result = e;
  }

  expect(result).toBe('Oopsie');
});
