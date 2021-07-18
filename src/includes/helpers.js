const timeout = sec =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject(Error('Request timed out. Please try again later.')),
      sec * 1000
    )
  );

const getJSON = async url => {
  const res = await Promise.race([
    fetch(url),
    timeout(process.env.VUE_APP_REQUEST_TIMEOUT_SEC),
  ]);

  if (!res.ok)
    throw Error(
      'Unable to get requested data from the server. Please try again later.'
    );

  const data = await res.json();

  return data;
};

export default getJSON;
