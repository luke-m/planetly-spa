export const buildRequestHeaders = (apiKey: string) => {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
};

export const makeGET = <T>(url: string, apiKey: string | undefined): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      reject('No API key provided!');
    } else {
      fetch(url, {
        headers: buildRequestHeaders(apiKey),
      }).then((response) => {
        if (response && response.status === 200) {
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
