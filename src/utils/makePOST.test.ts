import { UsageEntries } from '../interfaces';
import { makePOST } from './makePOST';

it('makes a POST request to the API', async () => {
  const mockJsonPromise = Promise.resolve('Hello!');
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    status: 200,
  });
  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  const result = await makePOST<UsageEntries>('https://test.test', 'apiKey', {
    some_value: 123,
    some_other_value: 'asd',
  });

  expect(result).toBe('Hello!');
});

it('throws error with status text for failed http requests', async () => {
  const mockFetchPromise = Promise.resolve({
    status: 401,
    statusText: 'Oopsie',
  });

  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let result;
  try {
    await makePOST('https://test.test', 'wrongApiKey', {
      some_value: 123,
      some_other_value: 'asd',
    });
  } catch (e) {
    result = e;
  }

  expect(result).toBe('Oopsie');
});
