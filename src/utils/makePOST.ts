import { buildRequestHeaders } from './makeGET';

export const makePOST = <ReturnType>(
  url: string,
  apiKey: string | undefined,
  body: Record<string, string | number>
): Promise<ReturnType> => {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      reject('No API key provided!');
    } else {
      fetch(url, {
        headers: buildRequestHeaders(apiKey),
        method: 'POST',
        body: JSON.stringify(body),
      }).then((response) => {
        if (response && response.status >= 200 && response.status < 300) {
          response
            .json()
            .then((data) => {
              resolve(data);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          reject(response.statusText);
        }
      });
    }
  });
};
